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

        // Get the session, and the all-important userId
        const session = await sessions.findOne(query, options);

        // Get second database and collection
        const db2 = client.db(process.env.SHOW_DB_NAME);
        const users = db2.collection(process.env.USERS_COLLECTION_NAME);

        // Construct second query
        const query2 = { _id: session.userId };

        // Construct second options
        const options2 = {};

        // Try to retrieve information from database
        let user = await users.findOne(query2, options2);

        // If no information, new user => insert into database
        if (user === null) {
            user = {
                _id: session.userId,
                shows: []
            };
            await users.insertOne(user);
        }

        res.status(constants.RESPONSE_OK).json(user);

    } catch (err) {
        res.status(constants.REPONSE_ERROR).json({ message: err.message });
    } finally {
        await client.close();
    }
};

export default handler;
