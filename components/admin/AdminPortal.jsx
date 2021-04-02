/* eslint-disable no-underscore-dangle */
/* eslint-disable complexity */
/* eslint-disable no-extra-parens */
import * as constants from '../../lib/constants';
import AdminShowCard from './AdminShowCard.jsx';
import Button from '@material-ui/core/Button';
import ContentLoading from '../layout/ContentLoading.jsx';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import { useSession } from 'next-auth/client';
import { useState } from 'react';
import useUser from '../../lib/hooks/useUser';

const UserPortal = () => {
    const [session] = useSession();
    const { user, isLoading, isError } = useUser((session && session.accessToken) || null);
    const [shows, setShows] = useState([]);
    const [allShows, setAllShows] = useState(false);
    // const [modalOpen, setModalOpen] = useState(false);

    const getMoreShows = async () => {
        const res = await axios.post(
            '/api/shows/getallshowsfromdb',
            {
                limit: constants.DODEC - (shows.length % constants.DODEC),
                page: Math.floor(shows.length / constants.DODEC) + constants.ONE
            }
        );
        const showData = res.data;
        if ((shows.length + showData.length) % constants.DODEC !== constants.ZERO) {
            setAllShows(true);
        }
        const newShows = [...shows, ...showData];
        setShows(newShows);
    };

    const handleButtonClick = (ev) => {
        ev.preventDefault();
        getMoreShows();
    };
    
    // const handleModalOpen = () => {
    //     setModalOpen(true);
    // };

    // const handleModalClose = () => {
    //     setModalOpen(false);
    // };

    return (
        <>
            {/* If the SWR is loading, show it */}
            { isLoading && <ContentLoading /> }
            {/* If it's loaded and we haven't evaluated the user yet */}
            { !isLoading && user && !user.roles && <ContentLoading /> }
            {/* If it's loaded and user doesn't have the admin role */}
            { !isLoading && user && user.roles && !user.roles.admin &&
                <Typography
                    variant="body1"
                >
                    You do not have authority to access the admin tools.
                </Typography> }
            {/* Otherwise ... */}
            { !isLoading && user && user.roles && user.roles.admin &&
                <>
                    <Typography
                        gutterBottom
                        variant="h5"
                    >
                        Shows List
                    </Typography>
                    <Grid
                        alignItems="stretch"
                        container
                        spacing={2}
                    >
                        { shows && shows.map((show) => (
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
                                    show={show}
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
                        Add More Shows
                    </Button>
                </> }
            {/* If there's an error, show it */}
            { session && isError &&
                <Typography gutterBottom>ERROR in SWR (with session)</Typography>}
        </>
    );
};

export default UserPortal;
