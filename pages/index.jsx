import { providers, useSession } from 'next-auth/client';
import ContentLoading from '../components/ContentLoading.jsx';
import Head from 'next/head';
import Layout from '../components/Layout.jsx';
import PropTypes from 'prop-types';
import SignInNextAuth from '../components/SignInNextAuth.jsx';
import Typography from '@material-ui/core/Typography';

const Home = (props) => {
    const [session, loading] = useSession();
    const { providerList } = props;

    return (
        <Layout>
            <Head>
                <title>Create Next App</title>
            </Head>
            <>
                {/* If still loading, show a circular progress indicator */}
                { loading && <ContentLoading /> }
                <p>{loading}</p>
                {/* If loaded but no session, show sign-in */}
                { !loading && !session && <SignInNextAuth providerList={providerList} /> }
                {/* If loaded and a session, load interactive conent */}
                { !loading && session &&
                    <Typography
                        align="center"
                        content="h2"
                        variant="h4"
                    >
                        Interactive content needed here!
                    </Typography> }
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
