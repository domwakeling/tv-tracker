/* eslint-disable no-empty-function */
/* eslint-disable no-underscore-dangle */
/* eslint-disable max-statements */
/* eslint-disable no-extra-parens */
import * as constants from '../../../lib/constants';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import ContentLoading from '../../layout/ContentLoading.jsx';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import { mutate } from 'swr';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useSession } from 'next-auth/client';
import { useState } from 'react';

const SearchShowCard = (props) => {
    const { id, imageUrl, modalCloseHandler, snackbarHandler, title, userHas, userId } = props;
    const [session] = useSession();
    const [updating, setUpdating] = useState(false);
    const matches = useMediaQuery('(max-width:959px)');

    const addShow = async () => {
        setUpdating(true);
        try {
            // Get show (or null) from Mongodb
            let res = await axios(`/api/shows/getshowfromdb/${id}`);
            let { show } = res.data;

            if (show === null) {
                // Show isn't already stored, so get details from OMDB
                res = await axios(`/api/shows/getshowinfo/${id}`);
                // eslint-disable-next-line prefer-destructuring
                show = res.data;

                // Store data in Mongodb
                res = await axios.post('/api/shows/saveshowtodb', { show });
                show = res.data;
            }

            // Send the user's _id and show details to 'addshow'
            res = await axios.post('/api/user/addshow', {
                _id: userId,
                show
            });

            mutate(`/api/user/accesstoken/${session.accessToken}`);
            setUpdating(false);
            snackbarHandler({
                duration: constants.BRIEF,
                message: 'show added',
                type: 'success'
            });
            modalCloseHandler({ preventDefault: () => {} });

        } catch (err) {
            // eslint-disable-next-line no-console
            console.log('err: ', err.message);
            setUpdating(false);
            snackbarHandler({ message: 'failed to add show, please try again' });
        }
    };

    return (
        <Card
            data-testid="search-show-card"
            raised
        >
            <CardMedia
                component="img"
                height={matches
                    ? '450'
                    : '350'}
                image={imageUrl || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'}
                title={title}
            />
            <CardContent>
                <Typography
                    color="textSecondary"
                    component="p"
                    noWrap
                    variant="subtitle1"
                >
                    {title}
                </Typography>
            </CardContent>
            <CardActions>
                <Button
                    color="secondary"
                    disabled={userHas}
                    onClick={addShow}
                    variant="contained"
                >
                    Add show
                </Button>
                <Box flexGrow="1" />
                {updating && <ContentLoading /> }
            </CardActions>
        </Card>
    );
};

SearchShowCard.propTypes = {
    id: PropTypes.string.isRequired,
    imageUrl: PropTypes.string,
    modalCloseHandler: PropTypes.func.isRequired,
    snackbarHandler: PropTypes.func,
    title: PropTypes.string.isRequired,
    userHas: PropTypes.bool.isRequired,
    userId: PropTypes.string.isRequired
};

SearchShowCard.defaultProps = {
    imageUrl: null,
    snackbarHandler: () => {}
};

export default SearchShowCard;
