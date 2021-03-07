/* eslint-disable object-curly-newline */
/* eslint-disable max-statements */
import * as constants from '../../../../lib/constants';
import { MongoClient } from 'mongodb';

const handler = async (req, res) => {
    const { accesstoken } = req.query;
    const client = new MongoClient(process.env.AUTH_DB_URL, { useUnifiedTopology: true });

    try {
        await client.connect();

        // Get the database and collection
        const db = client.db(process.env.AUTH_DB_NAME);
        const sessions = db.collection(process.env.SESSIONS_COLLECTION_NAME);

        // Construct query
        const query = { accessToken: accesstoken };

        // Construct options
        const options = {};

        const session = await sessions.findOne(query, options);
        res.status(constants.RESPONSE_OK).
            json({
                accessToken: accesstoken,
                userId: session.userId
            });

    } catch (err) {
        res.status(constants.REPONSE_ERROR).json({ message: err.message });
    } finally {
        await client.close();
    }
};

export default handler;
