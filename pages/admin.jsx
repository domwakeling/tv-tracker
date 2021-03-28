/* eslint-disable no-extra-parens */
import AdminPortal from '../components/AdminPortal.jsx';
import ContentLoading from '../components/ContentLoading.jsx';
import Head from 'next/head';
import Layout from '../components/Layout.jsx';
import Typography from '@material-ui/core/Typography';
import { useSession } from 'next-auth/client';

const Admin = () => {
    const [session, loading] = useSession();

    return (
        <Layout>
            <Head>
                <title>Admin - TV Tracker</title>
            </Head>
            <>
                <Typography
                    component="h1"
                    gutterBottom
                    variant="h4"
                >
                    Admin
                </Typography>
                {/* If still loading, show a circular progress indicator */}
                { loading && <ContentLoading /> }
                {/* If not loading and no session, request log-in */}
                { !loading && !session &&
                    <Typography variant="body1">
                        Please log in.
                    </Typography> }
                {/* If loaded and a session, load the user portal */}
                { !loading && session && <AdminPortal /> }
            </>
        </Layout>
    );
};

export default Admin;
