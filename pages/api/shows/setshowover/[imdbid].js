/* eslint-disable max-statements */
import * as constants from '../../../../lib/constants';
import { MongoClient } from 'mongodb';

const handler = async (req, res) => {

    const { imdbid } = req.query;
    const { showOver } = req.body;
    const client = new MongoClient(process.env.SHOW_DB_URL, { useUnifiedTopology: true });

    try {
        await client.connect();

        // Get the database and collection
        const db = client.db(process.env.SHOW_DB_NAME);
        const shows = db.collection(process.env.SHOWS_COLLECTION_NAME);

        // Construct query
        const query = {
            _id: imdbid
        };

        const update = {
            $set: { showOver }
        };

        const check = await shows.updateOne(query, update);

        res.status(constants.RESPONSE_OK).json(check);

    } catch (err) {
        res.status(constants.REPONSE_ERROR).json({ message: err.message });
    } finally {
        await client.close();
    }
};

export default handler;
