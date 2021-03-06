import * as constants from '../../src/constants';
import axios from 'axios';

const handler = async (req, res) => {
    const BASE_URL = 'https://epguides.frecar.no/show/';
    try {
        const results = await axios.get(`${BASE_URL}`);
        const shows = results.data;
        res.status(constants.RESPONSE_OK).json(shows);
    } catch (err) {
        res.status(constants.REPONSE_ERROR).json({ message: err.message });
    }
};

export default handler;
