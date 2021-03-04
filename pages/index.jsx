import { providers, signOut, useSession } from 'next-auth/client';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import ContentLoading from '../components/ContentLoading.jsx';
import Head from 'next/head';
import Header from '../components/Header.jsx';
import PropTypes from 'prop-types';
import SignInNextAuth from '../components/SignInNextAuth.jsx';
import Typography from '@material-ui/core/Typography';

const Home = (props) => {
    const [session, loading] = useSession();
    const { providerList } = props;

    return (
        <div>
            <Head>
                <title>Create Next App</title>
                <link
                    href="/favicon.ico"
                    rel="icon"
                />
            </Head>
            <Header />
            <Container>
                <Box mt={2}>
                    {/* If still loading, show a circular progress indicator */}
                    { loading && <ContentLoading /> }
                    <p>{loading}</p>
                    {/* If loaded but no session, show sign-in */}
                    { !loading && !session && <SignInNextAuth providerList={providerList} /> }
                    { !loading && session &&
                        <>
                            Signed in as {session.user.name} <br />
                            <button
                                onClick={() => signOut()}
                                type="button"
                            >
                                Sign out
                            </button>
                        </>}
                    {/* { !loading && <SignInUp mode={constants.MODE_SIGN_IN} /> } */}
                </Box>
            </Container>
        </div>
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
