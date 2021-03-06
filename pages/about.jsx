/* eslint-disable no-extra-parens */
import Head from 'next/head';
import Layout from '../components/Layout.jsx';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

const About = () => (
    <Layout>
        <Head>
            <title>Create Next App</title>
        </Head>
        <>
            <Typography
                content="h1"
                variant="h3"
            >
                About <b>TV Tracker</b>
            </Typography>
            <br />
            <Typography
                content="h2"
                gutterBottom
                variant="h5"
            >
                Personal information
            </Typography>
            <Typography
                gutterBottom
                variant="body1"
            >
                This site uses “sign in with” from other providers (GitHub at present, and Twitter
                hopefully to follow) rather than user accounts and passwords.
            </Typography>
            <Typography
                gutterBottom
                variant="body1"
            >
                The account name and your “real” name (as provided to the third-party provider) and
                held by TV Tracker. This is the minimum information required to make a user account.
            </Typography>
            <Typography
                gutterBottom
                variant="body1"
            >
                The site will not use your personal information for any reason other than user
                account; it will not pass that information for any other party or service; and it
                will not use any account “privileges” beyond those needed for user accounts.
            </Typography>
            <Typography
                gutterBottom
                variant="body2"
            >
                Dependent on the service, some other privileges  may be <b>allowed</b> (you should
                be shown a list by the third party provider when you are asked for permission in the
                first sign-in). Be assured that TV Tracker will not <b>use</b> any such privileges.
            </Typography>
            <br />
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
                Example project built using
                {' '}
                <Link href="https://nextjs.org/">
                    Next.js
                </Link>
                {' '} with {' '}
                <Link href="https://material-ui.com/">
                    Material UI
                </Link>
                &nbsp;components.
            </Typography>
            <Typography
                gutterBottom
                variant="body1"
            >
                Accounts/user &apos;auth&apos; based on
                {' '}
                <Link href="https://next-auth.js.org/">
                    NextAuth.js
                </Link>.
            </Typography>
            <Typography
                gutterBottom
                variant="body1"
            >
                Backed by a
                {' '}
                <Link href="https://www.mongodb.com/cloud/atlas">
                    MongoDB Cloud Atlas
                </Link>
                &nbsp;database.
            </Typography>
            <Typography
                gutterBottom
                variant="body1"
            >
                Data provided through
                {' '}
                <Link href="http://www.omdbapi.com/">
                    The Open Movie Database
                </Link>
                &nbsp;API.
            </Typography>
        </>
    </Layout>
);

export default About;
