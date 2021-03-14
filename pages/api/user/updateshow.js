/* eslint-disable no-underscore-dangle */
/* eslint-disable object-curly-newline */
/* eslint-disable max-statements */
import * as constants from '../../../lib/constants';
import { MongoClient, ObjectId } from 'mongodb';

const handler = async (req, res) => {
    const { lastSeen, showId, userId } = req.body;
    const client = new MongoClient(process.env.SHOW_DB_URL, { useUnifiedTopology: true });

    try {
        await client.connect();

        // Get the database and collection
        const db = client.db(process.env.SHOW_DB_NAME);
        const users = db.collection(process.env.USERS_COLLECTION_NAME);

        // Construct query
        const query = {
            _id: new ObjectId(userId),
            'shows._id': showId
        };

        // Construct update
        const updateDocument = {
            $set: {
                'shows.$.lastEpisode': lastSeen,
                'shows.$.lastWatched': new Date()
            }
        };

        // Update show info ...
        const ret = await users.updateOne(query, updateDocument);
        if (ret.modifiedCount === constants.ONE) {
            res.status(constants.RESPONSE_OK).json({ message: 'success' });
        } else {
            res.status(constants.REPONSE_ERROR).json({ message: 'Document not updated' });
        }

    } catch (err) {
        res.status(constants.REPONSE_ERROR).json({ message: err.message });
    } finally {
        await client.close();
    }
};

export default handler;
