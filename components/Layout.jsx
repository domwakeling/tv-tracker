/* eslint-disable no-extra-parens */
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Header from '../components/Header.jsx';
import PropTypes from 'prop-types';

const Layout = ({ children }) => (
    <>
        <Header />
        <Container>
            <Box mt={3}>
                <main>{children}</main>
            </Box>
        </Container>
    </>
);

Layout.propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    children: PropTypes.array.isRequired
};

export default Layout;