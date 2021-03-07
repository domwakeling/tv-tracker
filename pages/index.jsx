/* eslint-disable complexity */
/* eslint-disable no-extra-parens */
import { providers, useSession } from 'next-auth/client';
import ContentLoading from '../components/ContentLoading.jsx';
import Head from 'next/head';
import Layout from '../components/Layout.jsx';
import PropTypes from 'prop-types';
import SignInNextAuth from '../components/SignInNextAuth.jsx';
import Typography from '@material-ui/core/Typography';
import useUser from '../lib/hooks/useUser';

const Home = (props) => {
    const [session, loading] = useSession();
    const { providerList } = props;

    // eslint-disable-next-line no-underscore-dangle
    const { user, isLoading, isError } = useUser((session && session.accessToken) || null);

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
                {/* If loaded and a session, load interactive conent */}
                { !loading && session &&
                    <Typography
                        align="center"
                        content="h2"
                        variant="h4"
                    >
                        Interactive content needed here! {session.userId}
                    </Typography> }
                <br />
                <hr />
                <Typography
                    gutterBottom
                    variant="h4"
                >
                    SWR Testing
                    {/* If the SWR is loading, show it */}
                    { isLoading && <ContentLoading />}
                    {/* If there's an error, show it */}
                    { session && isError && <Typography gutterBottom>ERROR in SWR (with session)</Typography> }
                    {/* If there's no session, say so */}
                    { !session && <Typography gutterBottom>No session</Typography> }
                    {/* If there's a user, show it */}
                    { session && <Typography gutterBottom variant="h6">From the useUser SWR hook</Typography>}
                    { session && <Typography>user: {'\u007B'}</Typography>}
                    { session && user && <Typography>&nbsp;&nbsp;userId: {user.userId},</Typography> }
                    { session && user && <Typography>&nbsp;&nbsp;accessToken: {user.accessToken},</Typography>}
                    { session && <Typography gutterBottom>{'\u007D'}</Typography> }
                    {session && <Typography gutterBottom variant="h6">From the nextauth session</Typography>}
                    { session && <Typography gutterBottom>session.accessToken: {session.accessToken},</Typography> }
                    { session && <Typography>session.user: {'\u007B'}</Typography> }
                    { session && Object.keys(session.user).map((key) => (
                        <Typography key={key}>&nbsp;&nbsp;{key} : {session.user[key]},</Typography>
                    )) }
                    { session && <Typography gutterBottom>{'\u007D'}</Typography> }
                </Typography>
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
