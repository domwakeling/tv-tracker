/* eslint-disable no-underscore-dangle */
/* eslint-disable max-statements */
/* eslint-disable no-extra-parens */
import * as constants from '../lib/constants';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

const UserShowEpisode = ({ allSeen, episode, title, unWatched }) => (
    <>
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
                Let{'\''}s get started
            </Typography> }
        <Typography
            color="textSecondary"
            component="p"
            noWrap
            variant="subtitle1"
        >
            {title}
        </Typography>
    </>
);

UserShowEpisode.propTypes = {
    allSeen: PropTypes.bool,
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
