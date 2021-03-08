/* eslint-disable max-statements */
import * as constants from '../lib/constants';
import Box from '@material-ui/core/Box';
import ContentLoading from '../components/ContentLoading.jsx';
import Grid from '@material-ui/core/Grid';
import Modal from '@material-ui/core/Modal';
import PropTypes from 'prop-types';
import SearchShowForm from '../components/SearchShowForm.jsx';
import SearchShowList from '../components/SearchShowList.jsx';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import { useState } from 'react';

const SearchShowModal = ({ onCloseHandler, openState }) => {
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
            aria-describedby="add-show modal"
            aria-labelledby="add show"
            disableScrollLock
            onClose={modalCloseHandler}
            open={openState}
            // eslint-disable-next-line react/forbid-component-props
            style={{ overflow: 'scroll' }}
        >
            <div style={{
                backgroundColor: 'white',
                borderRadius: '0.5rem',
                margin: '30px auto',
                maxWidth: '90%',
                // eslint-disable-next-line no-dupe-keys
                maxWidth: '800px',
                outline: 0
            }}
            >
                <Box
                    mx={2}
                    px={2}
                    py={2}
                >
                    <Typography
                        content="h1"
                        variant="h3"
                    >
                        Add Show
                    </Typography>
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
                                    <SearchShowList shows={shows} />}
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </div>
        </Modal>
    );
};

SearchShowModal.propTypes = {
    onCloseHandler: PropTypes.func.isRequired,
    openState: PropTypes.bool.isRequired
};

export default SearchShowModal;
