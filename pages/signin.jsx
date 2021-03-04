import Container from '@material-ui/core/Container';
import Head from 'next/head';
import PropTypes from 'prop-types';
import SignInNextAuth from '../components/SignInNextAuth.jsx';
import Typography from '@material-ui/core/Typography';
import { providers } from 'next-auth/client';

// eslint-disable-next-line no-extra-parens
const SignInPage = ({ providerList }) => (
    <div>
        <Head>
            <title>Create Next App</title>
            <link
                href="/favicon.ico"
                rel="icon"
            />
        </Head>
        <Container>
            <Typography
                component="h1"
                gutterBottom
                variant="h3"
            >
                Temporary Header
            </Typography>
            <SignInNextAuth providerList={providerList} />
        </Container>
    </div>
);

SignInPage.getInitialProps = async () => ({
    providerList: await providers()
});

SignInPage.propTypes = {
    providerList: PropTypes.shape()
};

SignInPage.defaultProps = {
    providerList: {}
};

export default SignInPage;
