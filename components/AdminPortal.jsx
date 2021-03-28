/* eslint-disable no-underscore-dangle */
/* eslint-disable complexity */
/* eslint-disable no-extra-parens */
// import * as constants from '../lib/constants';
// import Box from '@material-ui/core/Box';
// import Button from '@material-ui/core/Button';
import ContentLoading from './ContentLoading.jsx';
// import SearchShowModal from '../components/SearchShowModal.jsx';
import Typography from '@material-ui/core/Typography';
// import UserShowList from './UserShowList.jsx';
import { useSession } from 'next-auth/client';
// import { useState } from 'react';
import useUser from '../lib/hooks/useUser';

const UserPortal = () => {
    const [session] = useSession();
    const { user, isLoading, isError } = useUser((session && session.accessToken) || null);
    // const [modalOpen, setModalOpen] = useState(false);

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
                        variant="body1"
                    >
                        Admin page text ho hum.
                    </Typography>
                    <Typography
                        gutterBottom
                        variant="body1"
                    >
                        Admin page text ho hum.
                    </Typography>
                </> }
            {/* If there's an error, show it */}
            { session && isError &&
                <Typography gutterBottom>ERROR in SWR (with session)</Typography>}
        </>
    );
};

export default UserPortal;
