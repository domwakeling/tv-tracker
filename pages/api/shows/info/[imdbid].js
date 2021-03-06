import * as constants from '../../../../src/constants';
import axios from 'axios';
import dummySeasonInfo from '../../../../src/dummySeasonInfo';

// eslint-disable-next-line max-statements
const handler = async (req, res) => {
    const { imdbid } = req.query;
    const URL = process.env.OMDB_URL;
    const API_KEY = process.env.OMDB_KEY;

    if (process.env.USE_DUMMY_DATA && process.env.USE_DUMMY_DATA === 'yes') {
        res.status(constants.RESPONSE_OK).json(dummySeasonInfo);
    } else {
        try {
            // First find out how many seasons there are ...
            const results = await axios.get(`${URL}?i=${imdbid}&apikey=${API_KEY}`);
            const showInfo = results.data;
            const seasonsCount = showInfo.totalSeasons;

            // Array of season numbers
            const arr = Array.from({ length: seasonsCount }, (__, idx) => idx + constants.ONE);

            // Map to seasons
            const seasonsInfo = arr.map((season) => axios.
                get(`${URL}?i=${imdbid}&apikey=${API_KEY}&season=${season}`).
                then((result) => result.data).
                catch(() => ({})));

            // Deal with the promises
            Promise.
                all(seasonsInfo).
                then((allResults) => {
                    res.status(constants.RESPONSE_OK).json({
                        seasonsInfo: allResults,
                        showInfo
                    });
                });
        } catch (err) {
            res.status(constants.REPONSE_ERROR).json({ message: err.message });
        }
    }
};

export default handler;
