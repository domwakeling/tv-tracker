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
                        color="textSecondary"
                        component="p"
                        noWrap
                        variant="subtitle1"
                    >
                        S{episode.season} E{episode.episode}
                    </Typography> }
                { allSeen &&
                    <Typography
                        color="textSecondary"
                        component="p"
                        noWrap
                        variant="subtitle1"
                    >
                        No more episodes
                    </Typography> }
                { unWatched &&
                    <Typography
                        color="textSecondary"
                        component="p"
                        noWrap
                        variant="subtitle1"
                    >
                        Let{'\''}s get started!
                    </Typography> }
                <Typography
                    color="textSecondary"
                    component="p"
                    noWrap
                    variant="subtitle1"
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
