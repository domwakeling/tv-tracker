import * as constants from '../../../../src/constants';
import axios from 'axios';
import dummy from '../../../../src/dummy_search';

// Set DUMMY_SEARCH true to use a local set of data (prevents excessive API calls in testing)
const DUMMY_SEARCH = true;

const handler = async (req, res) => {
    if (DUMMY_SEARCH) {
        res.status(constants.RESPONSE_OK).json(dummy);
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
