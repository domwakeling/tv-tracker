/* eslint-disable no-extra-parens */
import { providers, useSession } from 'next-auth/client';
import ContentLoading from '../components/ContentLoading.jsx';
import Head from 'next/head';
import Layout from '../components/Layout.jsx';
import PropTypes from 'prop-types';
import SignInNextAuth from '../components/SignInNextAuth.jsx';
import UserPortal from '../components/UserPortal.jsx';
import useUser from '../lib/hooks/useUser';

const Home = (props) => {
    const [session, loading] = useSession();
    const { user, isLoading, isError } = useUser((session && session.accessToken) || null);
    const { providerList } = props;

    return (
        <Layout user={user}>
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
                    <UserPortal
                        isErro={isError}
                        isLoading={isLoading}
                        user={user}
                    /> }
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
