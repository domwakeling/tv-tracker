import * as constants from '../../../../lib/constants';
// import axios from 'axios';
// import dummySeasonInfo from '../../../../data/dummySeasonInfo';

// eslint-disable-next-line max-statements
// const handler = async (req, res) => {
const handler = (req, res) => {

    const { accesstoken } = req.query;
    // res.status(constants.RESPONSE_OK).json({ accesstoken });
    setTimeout(() => {
        res.status(constants.RESPONSE_OK).json({ accessToken: accesstoken, userId: 'ID not found yet' });
    }, 2000);

    //     try {
    
    //     } catch (err) {
    //         res.status(constants.REPONSE_ERROR).json({ message: err.message });
    //     }
    // }
};

export default handler;
