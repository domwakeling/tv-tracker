/* eslint-disable no-extra-parens */
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import GitHubIcon from '@material-ui/icons/GitHub';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { signIn } from 'next-auth/client';

const ONE = 1;

const SignInNextAuth = ({ providerList }) => (
    <>
        <Typography
            align="center"
            content="h1"
            variant="h3"
        >
            Welcome to <b>TV Tracker</b>
        </Typography>
        <br />
        <Typography
            align="center"
            content="p"
            variant="h6"
        >
            Please sign in to continue
        </Typography>
        <Box
            display="flex"
            justifyContent="center"
            py="30px"
        >
            {Object.values(providerList).map((provider) => (
                <Box
                    key={provider.name}
                    my={1}
                >
                    <Button
                        color="secondary"
                        onClick={() => signIn(provider.id)}
                        type="button"
                        variant="contained"
                    >
                        <GitHubIcon />
                        &nbsp;
                        Sign in with {provider.name}
                    </Button>
                </Box>
            ))}
        </Box>
        <Typography
            align="center"
            variant="body1"
        >
            First time here? Sign in
            { Object.values(providerList).length > ONE
                ? ' using one of the options above'
                : ' ' }
            to get started!
        </Typography>
        { Object.values(providerList).length > ONE &&
            <Box mt={2}>
                <Typography
                    align="center"
                    variant="body2"
                >
                    (your account will be tied to the service you use for signing in)
                </Typography>
            </Box> }
    </>
);

SignInNextAuth.propTypes = {
    providerList: PropTypes.shape().isRequired
};

export default SignInNextAuth;
