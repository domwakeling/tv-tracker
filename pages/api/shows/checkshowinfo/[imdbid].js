/* eslint-disable max-statements */
import * as constants from '../../../../lib/constants';
import { MongoClient } from 'mongodb';
import axios from 'axios';

const handler = async (req, res) => {

    const { imdbid } = req.query;
    const client = new MongoClient(process.env.SHOW_DB_URL, { useUnifiedTopology: true });

    try {
        await client.connect();

        // Retrieve show info from mongodb
        const db = client.db(process.env.SHOW_DB_NAME);
        const shows = db.collection(process.env.SHOWS_COLLECTION_NAME);
        const users = db.collection(process.env.USERS_COLLECTION_NAME);

        // Construct query
        let query = { _id: imdbid };

        // Construct options
        const options = {};

        // Get the show details as stored in Mongodb
        const currShowDetails = await shows.findOne(query, options);

        // Check it doesn't have the OPTIONAL flag (showOver?) => YES = we're done!
        if (currShowDetails.showOver) {
            res.status(constants.RESPONSE_OK).json({ message: 'Show marked as over, no change' });
        } else {
            // The show DOESN'T have the .showOver flag

            // Retrieve last known season from IMDB
            const lastMongoSeason = currShowDetails.seasonsInfo.length;
            const URL = process.env.OMDB_URL;
            const API_KEY = process.env.OMDB_KEY;

            const lastSeason = await axios.
                get(`${URL}?i=${imdbid}&apikey=${API_KEY}&season=${lastMongoSeason}`).
                then((result) => result.data);

            const lastOMDBSeason = parseInt(lastSeason.totalSeasons, constants.DEC);

            /*
             * Whatever happens, we're going to replace the last Mongodb season with the new OMDB
             * one ((this is because you might have additional shows, or show titles, for a
             * current/upcoming season))
             */
            const newSeasonsInfo = currShowDetails.seasonsInfo.
                filter((season) => parseInt(season.Season, constants.DEC) !== lastMongoSeason);
            newSeasonsInfo.push(lastSeason);

            // If # seasons matches ...
            if (lastMongoSeason !== lastOMDBSeason) {

                /*
                 * Mongodb's season count is incorrect; get further seasons back from OMDB and add
                 * them to newSeasonsInfo
                 */

                // Also check whether the show poster img has changed and if so update it

            }

            // Update show for (i) currShowDetails (which may not have changed) and (ii) 'updated'

            currShowDetails.seasonsInfo = newSeasonsInfo;
            currShowDetails.updated = new Date();

            // Change the IMDB to match new show details (which may not differ)
            await shows.replaceOne(query, currShowDetails, options);

            // Construct an episodes object
            const newEpisodes = newSeasonsInfo.
                sort((s1, s2) => parseInt(s1.Season, constants.DEC) - parseInt(s2.Season, constants.DEC)).
                map((season) => season.Episodes.length);

            // Go through the users, find those with this show, update the episodes ...

            // Construct a new query and update document ...
            query = {
                'shows._id': imdbid
            };

            const update = {
                $set: {
                    'shows.$.episodes': newEpisodes
                }
            };

            // Run the udpate
            await users.updateMany(query, update);

            // Send response
            res.status(constants.RESPONSE_OK).json({ message: 'Show updated' });

        }

    } catch (err) {
        res.status(constants.REPONSE_ERROR).json({ message: err.message });
    } finally {
        await client.close();
    }
};

export default handler;
