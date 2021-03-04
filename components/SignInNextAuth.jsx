/* eslint-disable no-extra-parens */
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import GitHubIcon from '@material-ui/icons/GitHub';
import PropTypes from 'prop-types';
import { signIn } from 'next-auth/client';

const SignInNextAuth = ({ providerList }) => (
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
);

SignInNextAuth.propTypes = {
    providerList: PropTypes.shape().isRequired
};

export default SignInNextAuth;
