/* eslint-disable no-underscore-dangle */
/* eslint-disable object-curly-newline */
/* eslint-disable max-statements */
import * as constants from '../../../lib/constants';
import { MongoClient, ObjectId } from 'mongodb';

const handler = async (req, res) => {
    const { _id, show } = req.body;
    const client = new MongoClient(process.env.SHOW_DB_URL, { useUnifiedTopology: true });

    try {
        await client.connect();

        // Get the database and collection
        const db = client.db(process.env.SHOW_DB_NAME);
        const users = db.collection(process.env.USERS_COLLECTION_NAME);

        // Construct new document
        const newShow = {
            _id: show._id,
            imageUrl: show.showInfo.Poster,
            lastEpisode: {
                episode: constants.ZERO,
                season: constants.ZERO
            },
            lastWatched: new Date(),
            title: show.showInfo.Title
        };

        // Construct query
        const query = { _id: new ObjectId(_id) };

        // Construct update
        const updateDocument = {
            $addToSet: { shows: newShow }
        };

        // The UI is expected to prevent a show from being added twice ...

        // Add show to user
        await users.updateOne(query, updateDocument);
        res.status(constants.RESPONSE_OK).json({ message: 'success' });

    } catch (err) {
        res.status(constants.REPONSE_ERROR).json({ message: err.message });
    } finally {
        await client.close();
    }
};

export default handler;
