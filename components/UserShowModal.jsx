/* eslint-disable no-extra-parens */
/* eslint-disable no-underscore-dangle */
/* eslint-disable max-statements */
import * as constants from '../lib/constants';
import { useEffect, useState } from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import CancelIcon from '@material-ui/icons/Cancel';
import ContentLoading from '../components/ContentLoading.jsx';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import MyModal from './MyModal.jsx';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import UserShowEpisode from './UserShowEpisode.jsx';
import UserShowUpdate from './UserShowUpdate.jsx';
import axios from 'axios';

const UserShowModal = ({ modalShowId, onCloseHandler, openState, userId, userShows }) => {
    const [lastSeen, setLastSeen] = useState({});
    const [activeShow, setActiveShow] = useState({});
    const [activeShowDetail, setActiveShowDetail] = useState({});

    const getActiveShowDetail = async () => {
        const res = await axios(`/api/shows/getshowfromdb/${modalShowId}`);
        const { show } = res.data;
        setActiveShowDetail(show);
    };

    useEffect(() => {
        if (modalShowId) {
            setLastSeen(userShows.
                filter((show) => show._id === modalShowId)[constants.ZERO].lastEpisode);
            setActiveShow(userShows.filter((show) => show._id === modalShowId)[constants.ZERO]);
            getActiveShowDetail();
        } else {
            setLastSeen({});
            setActiveShow({});
            setActiveShowDetail({});
        }
    }, [modalShowId]);

    const modalCloseHandler = (event) => {
        event.preventDefault();
        setLastSeen({});
        onCloseHandler();
    };

    const noneWatched = () => (
        lastSeen.season === constants.ZERO && lastSeen.episode === constants.ZERO
    );

    const allWatched = () => (
        activeShow.episodes &&
        lastSeen.season >= activeShow.episodes.length &&
        lastSeen.episode >= activeShow.episodes[activeShow.episodes.length - constants.ONE]
    );

    const showTitle = (episode) => {
        if (!episode || !episode.season || !episode.episode) {
            return '';
        }
        if (episode.season === constants.ZERO || episode.episode === constants.ZERO) {
            return '';
        }
        if (!activeShowDetail || !activeShowDetail.seasonsInfo) {
            return '...';
        }
        if (allWatched()) {
            return '';
        }
        // Dealt with all edge cases (almost: wont catch error of episode > season length and NOT last season), now get the title
        return activeShowDetail.
            seasonsInfo.
            filter((season) => parseInt(season.Season, constants.DEC) === episode.season)[constants.ZERO].
            Episodes.
            filter((ep) => parseInt(ep.Episode, constants.DEC) === episode.episode)[constants.ZERO].
            Title;
    };

    const nextEpisode = () => {
        if (!activeShow.episodes || allWatched()) {
            return {
                episode: 0,
                season: 0
            };
        }
        // Get "next episode" from "at least season one" => generates 1, 1 from 0, 0
        const nextEp = {
            episode: lastSeen.episode + constants.ONE,
            season: Math.max(lastSeen.season, constants.ONE)
        };
        if (noneWatched()) {
            return nextEp;
        }
        // Dealt with edge cases, now make "next episode" and check that's not a new season
        if (activeShow.episodes[nextEp.season - constants.ONE] === nextEp.episode) {
            nextEp.episode = constants.ONE;
            nextEp.season += constants.ONE;
        }
        return nextEp;
    };

    return (
        <MyModal
            ariaD="add-show-modal"
            ariaL="add-show"
            modalCloseHandler={modalCloseHandler}
            openState={openState}
        >
            {/* Show a loading circle if no user or showId */}
            { (!userId || !modalShowId) && <ContentLoading /> }
            {/* Wrap the content to avoid errors with no user or show */}
            { modalShowId &&
                <Box
                    mx={2}
                    px={2}
                    py={2}
                >
                    <Box display="flex">
                        <Typography
                            content="h1"
                            variant="h4"
                        >
                            {activeShow.title}
                        </Typography>
                        <Box flexGrow="1" />
                        <IconButton
                            aria-label="close modal"
                            color="primary"
                            onClick={modalCloseHandler}
                        >
                            <CancelIcon color="secondary" />
                        </IconButton>
                    </Box>
                    <hr />
                    {/* Grid container */}
                    <Grid
                        container
                        spacing={2}
                    >
                        <Grid
                            item
                            sm={4}
                        >
                            <UserShowEpisode
                                episode={lastSeen}
                                title={showTitle(lastSeen)}
                                unWatched={noneWatched()}
                            />
                        </Grid>
                        <Grid
                            item
                            sm={4}
                        >
                            <UserShowEpisode
                                allSeen={allWatched()}
                                episode={activeShow.episodes
                                    ? nextEpisode()
                                    : {}}
                                title={showTitle(nextEpisode())}
                            />
                        </Grid>
                        <Grid
                            item
                            sm={4}
                        >
                            <UserShowUpdate
                                episodes={activeShow.episodes || []}
                                lastSeen={lastSeen}
                            />
                        </Grid>
                    </Grid>
                    <Box
                        display="flex"
                        pt={2}
                    >
                        <Button
                            color="secondary"
                            variant="contained"
                        >
                            Udpate
                        </Button>
                        <Box flexGrow="1" />
                        <Button
                            color="primary"
                            variant="contained"
                        >
                            Remove from my shows
                        </Button>
                    </Box>
                </Box> }
        </MyModal>
    );
};

UserShowModal.propTypes = {
    modalShowId: PropTypes.string,
    onCloseHandler: PropTypes.func.isRequired,
    openState: PropTypes.bool.isRequired,
    userId: PropTypes.string.isRequired,
    userShows: PropTypes.arrayOf(PropTypes.shape()).isRequired
};

UserShowModal.defaultProps = {
    modalShowId: null
};

export default UserShowModal;
