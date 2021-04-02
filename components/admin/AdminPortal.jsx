/* eslint-disable no-underscore-dangle */
/* eslint-disable complexity */
/* eslint-disable no-extra-parens */
import AdminShowList from './AdminShowList.jsx';
import ContentLoading from '../layout/ContentLoading.jsx';
import Typography from '@material-ui/core/Typography';
import { useSession } from 'next-auth/client';
import useUser from '../../lib/hooks/useUser';

const AdminPortal = () => {
    const [session] = useSession();
    const { user, isLoading, isError } = useUser((session && session.accessToken) || null);
    // C const [modalOpen, setModalOpen] = useState(false);

    /*
     * C const handleModalOpen = () => {
     *     setModalOpen(true);
     * };
     */

    /*
     * C const handleModalClose = () => {
     *     setModalOpen(false);
     * };
     */

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
                <AdminShowList
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
