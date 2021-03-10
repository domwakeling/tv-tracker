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
import axios from 'axios';

const UserShowModal = ({ modalShowId, onCloseHandler, openState, user }) => {
    const [watched, setWatched] = useState([]);

    useEffect(() => {
        // Update the document title using the browser API
        if (modalShowId) {
            setWatched(user.shows.filter((show) => show._id === modalShowId)[constants.ZERO].watched);
        } else {
            setWatched([]);
        }
    });

    const modalCloseHandler = (event) => {
        event.preventDefault();
        setWatched([]);
        onCloseHandler();
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
                    { (!user || !modalShowId) && <ContentLoading /> }
                    {/* Wrap the content to avoid errors with no user or show */}
                    {user && modalShowId &&
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
                                    {user.
                                        shows.
                                        filter((show) => (
                                            show._id === modalShowId))[constants.ZERO].title}
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
                            {/* Grid container for the outer shows list */}
                            <Grid
                                container
                                spacing={2}
                            >
                                {/* Grid item for season title  */}
                                <Grid
                                    item
                                    md={3}
                                >
                                    <Grid container>
                                        {watched.map((season, seasonIdx) => (
                                            <Grid
                                                item
                                                // eslint-disable-next-line react/no-array-index-key
                                                key={`S${seasonIdx}`}
                                                xs={12}
                                            >
                                                <Typography
                                                    gutterBottom
                                                    variant="subtitle1"
                                                >
                                                    SEASON {seasonIdx + constants.ONE}
                                                </Typography>
                                            </Grid>
                                        ))}
                                    </Grid>
                                </Grid>
                                {/* Grid item for season details  */}
                                <Grid
                                    item
                                    md={9}
                                >
                                    <Grid container>
                                        {watched.map((season, seasonIdx) => (
                                            <Grid
                                                item
                                                // eslint-disable-next-line react/no-array-index-key
                                                key={`SE${seasonIdx}`}
                                                xs={12}
                                            >
                                                <Typography
                                                    gutterBottom
                                                    variant="body"
                                                >
                                                    episodes for {seasonIdx + constants.ONE}
                                                </Typography>
                                            </Grid>
                                        ))}
                                    </Grid>
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
    modalShowId: PropTypes.string.isRequired,
    onCloseHandler: PropTypes.func.isRequired,
    openState: PropTypes.bool.isRequired,
    user: PropTypes.shape().isRequired
};

export default UserShowModal;
