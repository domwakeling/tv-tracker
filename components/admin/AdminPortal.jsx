/* eslint-disable no-underscore-dangle */
/* eslint-disable complexity */
/* eslint-disable no-extra-parens */
import * as constants from '../../lib/constants';
import AdminShowList from './AdminShowList.jsx';
import ContentLoading from '../layout/ContentLoading.jsx';
import MySnackbar from '../layout/MySnackbar.jsx';
import Typography from '@material-ui/core/Typography';
import { useSession } from 'next-auth/client';
import { useState } from 'react';
import useUser from '../../lib/hooks/useUser';

const AdminPortal = () => {
    const [session] = useSession();
    const { user, isLoading, isError } = useUser((session && session.accessToken) || null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('default message');
    const [snackbarType, setSnackbarType] = useState('error');
    const [snackbarDuration, setSnackbarDuration] = useState(constants.DURATION);

    const showSnackbar = (settings) => {
        setSnackbarMessage(settings.message || 'this is my message');
        setSnackbarOpen(true);
        setSnackbarType((settings.type) || 'error');
        setSnackbarDuration(settings.duration || constants.DURATION);
    };

    return (
        <>
            <MySnackbar
                duration={snackbarDuration}
                message={snackbarMessage}
                openState={snackbarOpen}
                setOpenState={setSnackbarOpen}
                type={snackbarType}
            />
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
                <AdminShowList
                    snackbarHandler={showSnackbar}
                    title="Show List"
                    url="/api/shows/getallshowsfromdb"
                />}
            {/* If there's an error, show it */}
            { session && isError &&
                <Typography gutterBottom>ERROR in SWR (with session)</Typography>}
        </>
    );
};

export default AdminPortal;
