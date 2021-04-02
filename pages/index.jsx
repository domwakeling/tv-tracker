import { providers, useSession } from 'next-auth/client';
import ContentLoading from '../components/layout/ContentLoading.jsx';
import Head from 'next/head';
import Layout from '../components/layout/Layout.jsx';
import PropTypes from 'prop-types';
import SignInNextAuth from '../components/user/SignInNextAuth.jsx';
import UserPortal from '../components/user/portal/UserPortal.jsx';

const Home = (props) => {
    const [session, loading] = useSession();
    const { providerList } = props;

    return (
        <Layout>
            <Head>
                <title>Home - TV Tracker</title>
            </Head>
            <>
                {/* If still loading, show a circular progress indicator */}
                { loading && <ContentLoading /> }
                <p>{loading}</p>
                {/* If loaded but no session, show sign-in */}
                { !loading && !session && <SignInNextAuth providerList={providerList} /> }
                {/* If loaded and a session, load the user portal */}
                { !loading && session &&
                    <UserPortal /> }
            </>
        </Layout>
    );
};

Home.getInitialProps = async () => ({
    providerList: await providers()
});

Home.propTypes = {
    providerList: PropTypes.shape()
};

Home.defaultProps = {
    providerList: {}
};

export default Home;
