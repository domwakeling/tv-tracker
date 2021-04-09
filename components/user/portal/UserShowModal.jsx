/* eslint-disable multiline-comment-style */
/* eslint-disable no-empty-function */
/* eslint-disable no-extra-parens */
/* eslint-disable no-underscore-dangle */
/* eslint-disable max-statements */
import * as constants from '../../../lib/constants';
import { useEffect, useState } from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import CancelIcon from '@material-ui/icons/Cancel';
import ContentLoading from '../../layout/ContentLoading.jsx';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import MyModal from '../../layout/MyModal.jsx';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import UserShowEpisode from './UserShowEpisode.jsx';
import UserShowRemoveDialog from './UserShowRemoveDialog.jsx';
import UserShowUpdate from './UserShowUpdate.jsx';
import axios from 'axios';
import { mutate } from 'swr';

const UserShowModal = ({ accessToken, episodeHeightPref, modalShowId, onCloseHandler, openState, snackbarHandler, userId, userShows }) => {
    const [lastSeen, setLastSeen] = useState({});
    const [activeShow, setActiveShow] = useState({});
    const [activeShowDetail, setActiveShowDetail] = useState({});
    const [dialogOpen, setDialogOpen] = useState(false);
    const [spinning, setSpinning] = useState(false);

    const getActiveShowDetail = async () => {
        // Tests throw an error without a try/catch on this element (unhandled promise)
        try {
            const res = await axios(`/api/shows/getshowfromdb/${modalShowId}`);
            const { show } = res.data;
            setActiveShowDetail(show);
        // eslint-disable-next-line no-empty
        } catch {}
    };

    useEffect(() => {
        if (modalShowId) {
            setLastSeen(userShows.
                filter((show) => show._id === modalShowId)[constants.ZERO].lastEpisode);
            setActiveShow(userShows.filter((show) => show._id === modalShowId)[constants.ZERO]);
            getActiveShowDetail();
            setSpinning(false);
        } else {
            setLastSeen({});
            setActiveShow({});
            setActiveShowDetail({});
        }
    }, [modalShowId]);

    const modalCloseHandler = (event) => {
        event.preventDefault();
        onCloseHandler();
    };

    const dialogCloseHandler = (event) => {
        event.preventDefault();
        setDialogOpen(false);
    };

    const dialogConfirmHandler = async (ev) => {
        ev.preventDefault();
        const updateBody = {
            showId: modalShowId,
            userId
        };
        const res = await axios.post('/api/user/removeshow/', updateBody);
        if (res.status === constants.RESPONSE_OK) {
            mutate(`/api/user/accesstoken/${accessToken}`);
            snackbarHandler({
                duration: constants.BRIEF,
                message: 'show removed',
                type: 'success'
            });
        } else {
            snackbarHandler({
                message: 'unable to remove show'
            });
        }
        dialogCloseHandler({ preventDefault: () => { } });
        modalCloseHandler({ preventDefault: () => { } });
    };

    const dialogOpenHandler = () => {
        setDialogOpen(true);
    };

    const noneWatched = () => (
        lastSeen.season === constants.ZERO && lastSeen.episode === constants.ZERO
    );

    const allWatched = () => (
        activeShow.episodes && (
            lastSeen.season > activeShow.episodes.length || (
                lastSeen.season === activeShow.episodes.length &&
                lastSeen.episode >= activeShow.episodes[activeShow.episodes.length - constants.ONE]
            )
        )
    );

    const showTitle = (episode) => {
        if (!episode || !episode.season || !episode.episode) {
            return '';
        }
        if (!activeShowDetail || !activeShowDetail.seasonsInfo) {
            return '...';
        }
        try {
            return activeShowDetail.
                seasonsInfo.
                filter((season) => parseInt(season.Season, constants.DEC) === episode.season)[constants.ZERO].
                Episodes.
                filter((ep) => parseInt(ep.Episode, constants.DEC) === episode.episode)[constants.ZERO].
                Title;
        } catch {
            return '...';
        }
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
        if (activeShow.episodes[nextEp.season - constants.ONE] < nextEp.episode) {
            nextEp.episode = constants.ONE;
            nextEp.season += constants.ONE;
        }
        return nextEp;
    };

    const updateHandler = async (ev) => {
        ev.preventDefault();
        setSpinning(true);
        const updateBody = {
            lastSeen,
            showId: modalShowId,
            userId
        };
        const res = await axios.post('/api/user/updateshow/', updateBody);
        if (res.status === constants.RESPONSE_OK) {
            mutate(`/api/user/accesstoken/${accessToken}`);
            snackbarHandler({
                duration: constants.BRIEF,
                message: 'show updated',
                type: 'success'
            });
        } else {
            snackbarHandler({ message: 'unable to update show' });
        }
        setSpinning(false);
        modalCloseHandler({ preventDefault: () => {} });
    };

    return (
        <MyModal
            ariaD="user-show-modal"
            ariaL="user-show-modal"
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
                        <UserShowEpisode
                            cardTitle="Last Watched"
                            data-testid="last-watched-show"
                            episode={lastSeen}
                            heightPref={episodeHeightPref}
                            title={showTitle(lastSeen)}
                            unWatched={noneWatched()}
                        />
                        <UserShowEpisode
                            allSeen={allWatched()}
                            cardTitle="Up Next"
                            data-testid="next-up-show"
                            episode={activeShow.episodes
                                ? nextEpisode()
                                : {}}
                            heightPref={episodeHeightPref}
                            title={showTitle(nextEpisode())}
                        />
                        <UserShowUpdate
                            episodes={activeShow.episodes || []}
                            lastSeen={lastSeen}
                            setLastSeen={setLastSeen}
                        />
                    </Grid>
                    <Box
                        display="flex"
                        pt={2}
                    >
                        <Box pb={1}>
                            <Button
                                color="secondary"
                                onClick={updateHandler}
                                variant="contained"
                            >
                                Udpate
                            </Button>
                        </Box>
                        { spinning &&
                            <Box ml={1}>
                                <ContentLoading />
                            </Box> }
                        <Box flexGrow="1" />
                        <Box pb={1}>
                            <Button
                                color="primary"
                                onClick={dialogOpenHandler}
                                variant="contained"
                            >
                                Remove
                            </Button>
                        </Box>
                    </Box>
                    <UserShowRemoveDialog
                        dialogCloseHandler={dialogCloseHandler}
                        dialogConfirmHandler={dialogConfirmHandler}
                        dialogOpen={dialogOpen}
                    />
                </Box> }
        </MyModal>
    );
};

UserShowModal.propTypes = {
    accessToken: PropTypes.string.isRequired,
    episodeHeightPref: PropTypes.string.isRequired,
    modalShowId: PropTypes.string,
    onCloseHandler: PropTypes.func.isRequired,
    openState: PropTypes.bool.isRequired,
    snackbarHandler: PropTypes.func,
    userId: PropTypes.string.isRequired,
    userShows: PropTypes.arrayOf(PropTypes.shape()).isRequired
};

UserShowModal.defaultProps = {
    modalShowId: null,
    snackbarHandler: () => {}
};

export default UserShowModal;
