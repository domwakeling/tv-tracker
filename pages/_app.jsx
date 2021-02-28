/* eslint-disable react/jsx-props-no-spreading */
import '../styles/globals.scss';
import PropTypes from 'prop-types';

// eslint-disable-next-line no-extra-parens
const MyApp = ({ Component, pageProps }) => (
    <Component {...pageProps} />
);

MyApp.propTypes = {
    Component: PropTypes.func.isRequired,
    pageProps: PropTypes.shape().isRequired
};

export default MyApp;
