/* eslint-disable no-extra-parens */
import Head from 'next/head';
import Layout from '../components/Layout.jsx';
import Link from '@material-ui/core/Link';
import SWRTest from '../components/SWRTest.jsx';
import Typography from '@material-ui/core/Typography';

const About = () => (
    <Layout>
        <Head>
            <title>About - TV Tracker</title>
        </Head>
        <>
            <Typography
                content="h1"
                gutterBottom
                variant="h3"
            >
                About <b>TV Tracker</b>
            </Typography>
            <Typography
                gutterBottom
                variant="subtitle1"
            >
                TV Tracker lets you find TV shows, add them to a watchlist, and track which
                episodes you have viewed. It is principally a test project to experiment and
                learn some new things, but is available to use for free.
            </Typography>
            <Typography
                gutterBottom
                variant="body1"
            >
                For the technically minded, the code behind the site is available on
                {' '}
                <Link href="https://nextjs.org/">
                    <b>GitHub</b>
                </Link>) &mdash; please feel free engage on GitHub to improve the project! (If you
                deploy your own copy of the site, I would appreciate an attribution and link back
                to the original repository)
            </Typography>
            <Typography
                gutterBottom
                variant="body1"
            >
                Please be aware that, whilst I <b>have no plans</b> to take down the service, I
                reserve the right to do so without warning and accept no liability for the loss of
                any information.
            </Typography>
            <br />
            <hr />
            <Typography
                content="h2"
                gutterBottom
                variant="h5"
            >
                Your personal information
            </Typography>
            <Typography
                gutterBottom
                variant="body1"
            >
                This site uses “sign in with” from other providers (GitHub and Twitter at present)
                rather than user accounts and passwords.
            </Typography>
            <Typography
                gutterBottom
                variant="body1"
            >
                The account name and your “real” name (as provided to the third-party provider) are
                held and stored by TV Tracker. This is the minimum information required to make
                user accounts work.
            </Typography>
            <Typography
                gutterBottom
                variant="body1"
            >
                The site will <b>not</b> use your personal information for any reason other than
                user account/signing in; it will <b>not</b> pass that information to any other party
                or service; and it will <b>not</b> use any account “privileges” on the third-party
                service beyond those needed for user accounts.
            </Typography>
            <Typography
                gutterBottom
                variant="body1"
            >
                Dependent on the service, some other privileges  may be <b>allowed</b> (you should
                see  a list provided by the third party provider when you are asked for permission
                the first time you sign-in). Be assured that TV Tracker will not <b>use</b> any such
                privileges, other than those listed above, without explicit permission.
            </Typography>
            <br />
            <hr />
            <Typography
                content="h2"
                gutterBottom
                variant="h5"
            >
                Technical Stack
            </Typography>
            <Typography
                gutterBottom
                variant="body1"
            >
                Built using
                {' '}
                <Link href="https://nextjs.org/">
                    <b>Next.js</b>
                </Link>
                {' '} with {' '}
                <Link href="https://material-ui.com/">
                    <b>Material UI</b>
                </Link> components.
            </Typography>
            <Typography
                gutterBottom
                variant="body1"
            >
                Accounts/user &apos;auth&apos; based on
                {' '}
                <Link href="https://next-auth.js.org/">
                    <b>NextAuth.js</b>
                </Link>.
            </Typography>
            <Typography
                gutterBottom
                variant="body1"
            >
                Backed by a
                {' '}
                <Link href="https://www.mongodb.com/cloud/atlas">
                    <b>MongoDB Cloud Atlas</b>
                </Link> database.
            </Typography>
            <Typography
                gutterBottom
                variant="body1"
            >
                Data provided through
                {' '}
                <Link href="http://www.omdbapi.com/">
                    <b>The Open Movie Database</b>
                </Link> API.
            </Typography>
            <SWRTest />
        </>
    </Layout>
);

export default About;
