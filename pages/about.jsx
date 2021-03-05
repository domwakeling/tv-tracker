/* eslint-disable no-extra-parens */
import Head from 'next/head';
import Layout from '../components/Layout.jsx';
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
                content="p"
                variant="h6"
            >
                Please sign in to continue
            </Typography>
            <Typography
                content="h2"
                variant="h4"
            >
                Interactive content needed here!
            </Typography>
        </>
    </Layout>
);

export default About;
