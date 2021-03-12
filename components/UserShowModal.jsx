/* eslint-disable no-extra-parens */
/* eslint-disable no-underscore-dangle */
/* eslint-disable max-statements */
import * as constants from '../lib/constants';
import { useEffect, useState } from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import CancelIcon from '@material-ui/icons/Cancel';
import ContentLoading from '../components/ContentLoading.jsx';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Modal from '@material-ui/core/Modal';
import PropTypes from 'prop-types';
import Slide from '@material-ui/core/Slide';
import Typography from '@material-ui/core/Typography';
import UserShowEpisode from './UserShowEpisode.jsx';
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
        lastSeen.season === activeShow.episodes.length &&
        lastSeen.episode === activeShow.episodes[activeShow.episodes.length - constants.ONE]
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
        if (episode.season > activeShow.episodes.length) {
            return '';
        }
        if (episode.episode > activeShow.episodes[episode.season.length - constants.ONE]) {
            return '';
        }
        // Dealt with all edge cases, now get the title
        return activeShowDetail.
            seasonsInfo.
            filter((season) => parseInt(season.Season, constants.DEC) === episode.season)[constants.ZERO].
            Episodes.
            filter((ep) => parseInt(ep.Episode, constants.DEC) === episode.episode)[constants.ZERO].
            Title;
    };

    const nextEpisode = () => {
        if (noneWatched()) {
            return {
                episode: 1,
                season: 1
            };
        }

        if (!activeShow.episodes || allWatched()) {
            return {
                episode: 0,
                season: 0
            };
        }

        let nextEp = lastSeen.episode + constants.ONE;
        let nextSe = lastSeen.season;

        if (activeShow.episodes[nextSe - constants.ONE] === nextEp) {
            nextEp = constants.ONE;
            nextSe += constants.ONE;
        }

        return {
            episode: nextEp,
            season: nextSe
        };
    };

    return (
        <Modal
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500
            }}
            aria-describedby="add-show-modal"
            aria-labelledby="add-show"
            closeAfterTransition
            disableScrollLock
            onClose={modalCloseHandler}
            open={openState}
            // eslint-disable-next-line react/forbid-component-props
            style={{ overflowY: 'scroll' }}
        >
            <Slide
                in={openState}
                transition={750}
            >
                <div style={{
                    backgroundColor: 'white',
                    borderRadius: '0.5rem',
                    margin: '30px auto',
                    maxWidth: '800px',
                    outline: 0,
                    width: '80%'
                }}
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
                            {/* Grid container for the shows info list */}
                            <Grid
                                container
                                spacing={2}
                            >
                                <Grid item>
                                    <UserShowEpisode
                                        episode={lastSeen}
                                        title={showTitle(lastSeen)}
                                        unWatched={noneWatched()}
                                    />
                                </Grid>
                                <Grid item>
                                    <UserShowEpisode
                                        allSeen={allWatched()}
                                        episode={activeShow.episodes
                                            ? nextEpisode()
                                            : {}}
                                        title={showTitle(nextEpisode())}
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
                </div>
            </Slide>
        </Modal>
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
