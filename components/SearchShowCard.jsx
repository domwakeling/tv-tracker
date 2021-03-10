/* eslint-disable no-underscore-dangle */
/* eslint-disable max-statements */
/* eslint-disable no-extra-parens */
import * as constants from '../lib/constants';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import { mutate } from 'swr';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useSession } from 'next-auth/client';

const SearchShowCard = (props) => {
    const { id, imageUrl, title, user } = props;
    const [session] = useSession();
    const matches = useMediaQuery('(max-width:959px)');

    const addShow = async () => {
        try {
            // Get show (or null) from Mongodb
            let res = await axios(`/api/shows/getshowfromdb/${id}`);
            let { show } = res.data;

            if (show === null) {
                // Show isn't already stored, so get details from OMDB
                res = await axios(`api/shows/getshowinfo/${id}`);
                // eslint-disable-next-line prefer-destructuring
                show = res.data;

                // Store data in Mongodb
                res = await axios.post('api/shows/saveshowtodb', { show });
                show = res.data;
            }

            // Send the user's _id and show details to 'addshow'
            res = await axios.post('api/user/addshow', {
                _id: user._id,
                show
            });

            mutate(`api/user/accesstoken/${session.accessToken}`);

        } catch (err) {
            // eslint-disable-next-line no-console
            console.log('err: ', err.message);
        }
    };

    return (
        <Card raised>
            <CardMedia
                component="img"
                height={matches
                    ? '450'
                    : '350'}
                image={imageUrl || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'}
                title={title}
            />
            <Box minHeight="96px">
                <CardContent>
                    <Typography
                        color="textSecondary"
                        component="p"
                        variant="subtitle1"
                    >
                        {title}
                    </Typography>
                </CardContent>
            </Box>
            <CardActions>
                { user.showIds.indexOf(id) < constants.ZERO
                    ? (
                        <Button
                            color="secondary"
                            onClick={addShow}
                        >
                            Add to my shows
                        </Button>)
                    : (
                        <Button
                            color="primary"
                        >
                            Remove
                        </Button>) }
            </CardActions>
        </Card>
    );
};

SearchShowCard.propTypes = {
    id: PropTypes.string.isRequired,
    imageUrl: PropTypes.string,
    title: PropTypes.string.isRequired,
    user: PropTypes.shape().isRequired
};

SearchShowCard.defaultProps = {
    imageUrl: null
};

export default SearchShowCard;
