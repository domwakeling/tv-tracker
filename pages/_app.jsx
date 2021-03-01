/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/jsx-props-no-spreading */

import '../styles/globals.scss';
import CssBaseline from '@material-ui/core/CssBaseline';
import Head from 'next/head';
import PropTypes from 'prop-types';
import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from '../src/theme';

const MyApp = (props) => {
    const { Component, pageProps } = props;

    React.useEffect(() => {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentElement.removeChild(jssStyles);
        }
    }, []);

    return (
        <>
            <Head>
                <title>My page</title>
                <meta
                    content="minimum-scale=1, initial-scale=1, width=device-width"
                    name="viewport"
                />
            </Head>
            <ThemeProvider theme={theme}>
                {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                <CssBaseline />
                <Component {...pageProps} />
            </ThemeProvider>
        </>
    );
};

MyApp.propTypes = {
    Component: PropTypes.elementType.isRequired,
    pageProps: PropTypes.object.isRequired
};

export default MyApp;
