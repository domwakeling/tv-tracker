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
                Technical Stack
            </Typography>
            <Typography variant="body1">
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
            <Typography variant="body1">
                Accounts/user &apos;auth&apos; based on
                {' '}
                <Link href="https://next-auth.js.org/">
                    NextAuth.js
                </Link>.
            </Typography>
            <Typography variant="body1">
                Backed by a
                {' '}
                <Link href="https://www.mongodb.com/cloud/atlas">
                    MongoDB Cloud Atlas
                </Link>
                &nbsp;database.
            </Typography>
            <Typography variant="body1">
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
