/* eslint-disable max-statements */
import * as constants from '../../../lib/constants';
import Backdrop from '@material-ui/core/Backdrop';
import Box from '@material-ui/core/Box';
import CancelIcon from '@material-ui/icons/Cancel';
import ContentLoading from '../../layout/ContentLoading.jsx';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Modal from '@material-ui/core/Modal';
import PropTypes from 'prop-types';
import SearchShowForm from './SearchShowForm.jsx';
import SearchShowList from './SearchShowList.jsx';
import Slide from '@material-ui/core/Slide';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import { useState } from 'react';

const SearchShowModal = ({ onCloseHandler, openState, userId, userShows }) => {
    const [shows, setShows] = useState({});
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);

    const submitSearch = async (ev) => {
        ev.preventDefault();
        if (searchTerm === '') {
            setShows({});
        } else {
            setLoading(true);
            try {
                const res = await axios(`/api/shows/search/${searchTerm}`);
                if (res.status === constants.RESPONSE_OK) {
                    setShows(res.data);
                    setLoading(false);
                } else {
                    setShows({ error: 'Search error' });
                    setLoading(false);
                }
            } catch (err) {
                setShows({ error: 'Search error' });
                setLoading(false);
            }
        }
    };

    const modalCloseHandler = (event) => {
        event.preventDefault();
        setShows({});
        setSearchTerm('');
        setLoading(false);
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
            style={{ overflow: 'scroll' }}
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
                    <Box
                        mx={2}
                        px={2}
                        py={2}
                    >
                        <Box display="flex">
                            <Typography
                                content="h1"
                                variant="h3"
                            >
                                Add Show
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
                        <br />
                        <Grid
                            container
                            spacing={2}
                        >
                            <SearchShowForm
                                handleFormSubmit={submitSearch}
                                searchTerm={searchTerm}
                                setSearchTerm={setSearchTerm}
                            />
                            <Grid
                                item
                                xs={12}
                            >
                                <Grid
                                    container
                                    wrap="wrap"
                                >
                                    {loading &&
                                        <Grid
                                            item
                                            xs={12}
                                        >
                                            <ContentLoading />
                                        </Grid>}
                                    {!loading &&
                                        <SearchShowList
                                            foundShows={shows}
                                            modalCloseHandler={modalCloseHandler}
                                            userId={userId}
                                            userShows={userShows}
                                        />}
                                </Grid>
                            </Grid>
                        </Grid>
                    </Box>
                </div>
            </Slide>
        </Modal>
    );
};

SearchShowModal.propTypes = {
    onCloseHandler: PropTypes.func.isRequired,
    openState: PropTypes.bool.isRequired,
    userId: PropTypes.string.isRequired,
    userShows: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default SearchShowModal;
