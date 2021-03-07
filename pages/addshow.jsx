/* eslint-disable max-statements */
import * as constants from '../src/constants';
import ContentLoading from '../components/ContentLoading.jsx';
import Grid from '@material-ui/core/Grid';
import Head from 'next/head';
import Layout from '../components/Layout.jsx';
import ShowList from '../components/ShowList.jsx';
import ShowSearchForm from '../components/ShowSearchForm.jsx';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import { useState } from 'react';

const AddShow = () => {
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

    return (
        <Layout>
            <Head>
                <title>Add A New Show - TV Tracker</title>
            </Head>
            <>
                <Typography
                    content="h1"
                    variant="h3"
                >
                    Add Show
                </Typography>
                <br />
                <Grid
                    container
                    spacing={4}
                >
                    <ShowSearchForm
                        handleFormSubmit={submitSearch}
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                    />
                    <Grid
                        item
                        lg={8}
                        xs={12}
                    >
                        <Grid
                            container
                            spacing={2}
                            wrap="wrap"
                        >
                            { loading &&
                                <Grid
                                    item
                                    xs={12}
                                >
                                    <ContentLoading />
                                </Grid> }
                            { !loading &&
                                <ShowList shows={shows} /> }
                        </Grid>
                    </Grid>
                </Grid>
            </>
        </Layout>
    );
};

export default AddShow;
