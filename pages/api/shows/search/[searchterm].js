import * as constants from '../../../../src/constants';
import axios from 'axios';
import dummySearchInfo from '../../../../src/dummySearchInfo';

const handler = async (req, res) => {
    if (process.env.USE_DUMMY_DATA && process.env.USE_DUMMY_DATA === 'yes') {
        res.status(constants.RESPONSE_OK).json(dummySearchInfo);
    } else {
        const URL = process.env.OMDB_URL;
        const API_KEY = process.env.OMDB_KEY;
        const { searchterm } = req.query;
        try {
            const results = await axios.get(`${URL}?s=${searchterm}&apikey=${API_KEY}&type=series`);
            const shows = results.data;
            res.status(constants.RESPONSE_OK).json(shows);
        } catch (err) {
            res.status(constants.REPONSE_ERROR).json({ message: err.message });
        }
    }
};

export default handler;
