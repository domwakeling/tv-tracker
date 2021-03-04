/* eslint-disable no-extra-parens */
/* eslint-disable react/require-default-props */
import { providers, signIn } from 'next-auth/client';
import PropTypes from 'prop-types';

// eslint-disable-next-line no-shadow
const SignInNextAuth = ({ providers }) => (
    <>
        {Object.values(providers).map((provider) => (
            <div key={provider.name}>
                <button
                    onClick={() => signIn(provider.id)}
                    type="button"
                >
                    Sign in with {provider.name}
                </button>
            </div>
        ))}
    </>
);

SignInNextAuth.getInitialProps = async () => ({
    providers: await providers()
});

SignInNextAuth.propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    providers: PropTypes.object
};

export default SignInNextAuth;
