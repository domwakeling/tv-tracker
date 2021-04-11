/* eslint-disable no-empty-function */
/* eslint-disable no-underscore-dangle */
/* eslint-disable complexity */
/* eslint-disable no-extra-parens */
import * as constants from '../../lib/constants';
import { useEffect, useState } from 'react';
import AdminShowCard from './AdminShowCard.jsx';
import Button from '@material-ui/core/Button';
import ContentLoading from '../layout/ContentLoading.jsx';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';

const AdminShowList = ({ snackbarHandler, title, url }) => {
    const [shows, setShows] = useState([]);
    const [firstLoad, setFirstLoad] = useState(false);
    const [allShows, setAllShows] = useState(false);

    // Get (up to) 12 more shows
    const getMoreShows = async () => {
        const res = await axios.post(
            url,
            {
                limit: constants.DODEC - (shows.length % constants.DODEC),
                skip: shows.length
            }
        );
        const showData = res.data;
        if (showData.length === constants.ZERO) {
            setAllShows(true);
        }
        const newShows = [...shows, ...showData];
        setShows(newShows);
        setFirstLoad(true);
    };

    // Reload the shows list *from scratch* to the same length as current
    const reloadShows = async () => {
        const res = await axios.post(
            url,
            {
                limit: shows.length,
                skip: 0
            }
        );
        const showData = res.data;
        if (showData.length === constants.ZERO) {
            setAllShows(false);
        }
        setShows(showData);
        setFirstLoad(true);
    };

    // Empty conditions array => only run when first mounted ...
    useEffect(() => {
        getMoreShows();
    }, []);

    const handleButtonClick = (ev) => {
        ev.preventDefault();
        getMoreShows();
    };

    return (
        <>
            <Typography
                gutterBottom
                variant="h5"
            >
                {title}
            </Typography>
            { !firstLoad && <ContentLoading /> }
            <Grid
                alignItems="stretch"
                container
                spacing={2}
            >
                {shows && shows.map((show) => (
                    <Grid
                        display="flex"
                        item
                        key={show._id}
                        lg={3}
                        md={4}
                        sm={6}
                        xs={12}
                    >
                        <AdminShowCard
                            key={show._id}
                            listUpdate={reloadShows}
                            show={show}
                            snackbarHandler={snackbarHandler}
                        />
                    </Grid>
                ))}
            </Grid>
            <br />
            <Button
                color="primary"
                disabled={allShows}
                onClick={handleButtonClick}
                variant="contained"
            >
                More
            </Button>
        </>
    );
};

AdminShowList.propTypes = {
    snackbarHandler: PropTypes.func,
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired
};

AdminShowList.defaultProps = {
    snackbarHandler: () => {}
};

export default AdminShowList;
