import * as constants from '../src/constants.js';
import Container from '@material-ui/core/Container';
import Head from 'next/head';
import SignInUp from '../components/SignInUp.jsx';
import Typography from '@material-ui/core/Typography';

// eslint-disable-next-line no-extra-parens
const SignUpPage = () => (
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
            <SignInUp mode={constants.MODE_SIGN_UP} />
        </Container>
    </div>
);

export default SignUpPage;
