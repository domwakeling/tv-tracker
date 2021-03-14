/* eslint-disable no-underscore-dangle */
/* eslint-disable max-statements */
/* eslint-disable no-extra-parens */
import * as constants from '../lib/constants';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

const UserShowEpisode = ({ allSeen, cardTitle, episode, title, unWatched }) => (
    <Card raised>
        <Box minHeight="130px">
            <CardContent>
                <Typography
                    component="p"
                    variant="h6"
                >
                    {cardTitle}
                </Typography>
                { episode.episode !== constants.ZERO && !allSeen && !unWatched &&
                    <Typography
                        noWrap
                        variant="body1"
                    >
                        S{episode.season} E{episode.episode}
                    </Typography> }
                { allSeen &&
                    <>
                        <Typography
                            color="textSecondary"
                            noWrap
                            variant="body1"
                        >
                            No more episodes
                        </Typography>
                        <Typography
                            variant="body2"
                        >
                            &nbsp;
                        </Typography>
                    </> }
                { unWatched &&
                    <>
                        <Typography
                            noWrap
                            variant="body1"
                        >
                            Let{'\''}s get started!
                        </Typography>
                        <Typography
                            noWrap
                            variant="body2"
                        >
                            &nbsp;
                        </Typography>
                    </> }
                <Typography
                    noWrap
                    variant="body2"
                >
                    {title}
                </Typography>
            </CardContent>
        </Box>
    </Card>
);

UserShowEpisode.propTypes = {
    allSeen: PropTypes.bool,
    cardTitle: PropTypes.string.isRequired,
    episode: PropTypes.shape({
        episode: PropTypes.number,
        season: PropTypes.number
    }),
    title: PropTypes.string,
    unWatched: PropTypes.bool
};

UserShowEpisode.defaultProps = {
    allSeen: false,
    episode: {
        episode: 0,
        season: 0
    },
    title: ' ',
    unWatched: false
};

export default UserShowEpisode;
