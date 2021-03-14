/* eslint-disable no-underscore-dangle */
/* eslint-disable complexity */
/* eslint-disable no-extra-parens */
import * as constants from '../lib/constants';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import ContentLoading from './ContentLoading.jsx';
import SearchShowModal from '../components/SearchShowModal.jsx';
import Typography from '@material-ui/core/Typography';
import UserShowList from './UserShowList.jsx';
import { useSession } from 'next-auth/client';
import { useState } from 'react';
import useUser from '../lib/hooks/useUser';

const UserPortal = () => {
    const [session] = useSession();
    const { user, isLoading, isError } = useUser((session && session.accessToken) || null);
    const [modalOpen, setModalOpen] = useState(false);

    const handleModalOpen = () => {
        setModalOpen(true);
    };

    const handleModalClose = () => {
        setModalOpen(false);
    };

    return (
        <>
            {/* If the SWR is loading, show it */}
            { isLoading && <ContentLoading />}
            {/* Otherwise ... */}
            { !isLoading &&
                <>
                    <Typography
                        component="h1"
                        gutterBottom
                        variant="h4"
                    >
                        Your Shows
                    </Typography>
                    <Box mb={2}>
                        <Button
                            color="primary"
                            onClick={handleModalOpen}
                            variant="contained"
                        >
                            Add a show
                        </Button>
                    </Box>
                    <hr />
                    { user.shows.length === constants.ZERO &&
                        <Typography
                            color="primary"
                            component="h2"
                            variant="h5"
                        >
                            Add a show to get started ...
                        </Typography> }
                    <SearchShowModal
                        onCloseHandler={handleModalClose}
                        openState={modalOpen}
                        userId={user._id}
                        userShows={user.showIds}
                    />
                    <UserShowList
                        accessToken={session.accessToken}
                        userId={user._id}
                        userShows={user.shows}
                    />
                </> }
            {/* If there's an error, show it */}
            { session && isError &&
                <Typography gutterBottom>ERROR in SWR (with session)</Typography> }
        </>
    );
};

export default UserPortal;
