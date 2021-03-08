import { providers, useSession } from 'next-auth/client';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import ContentLoading from '../components/ContentLoading.jsx';
import Head from 'next/head';
import IconButton from '@material-ui/core/IconButton';
import Layout from '../components/Layout.jsx';
import PropTypes from 'prop-types';
import SWRTest from '../components/SWRTest.jsx';
import SearchShowModal from '../components/SearchShowModal.jsx';
import SignInNextAuth from '../components/SignInNextAuth.jsx';
import { useState } from 'react';

const Home = (props) => {
    const [session, loading] = useSession();
    const [modalOpen, setModalOpen] = useState(false);
    const { providerList } = props;

    const handleModalOpen = () => {
        setModalOpen(true);
    };

    const handleModalClose = () => {
        setModalOpen(false);
    };

    return (
        <Layout>
            <Head>
                <title>Home - TV Tracker</title>
            </Head>
            <>
                {/* If still loading, show a circular progress indicator */}
                { loading && <ContentLoading /> }
                <p>{loading}</p>
                {/* If loaded but no session, show sign-in */}
                { !loading && !session && <SignInNextAuth providerList={providerList} /> }
                {/* If loaded and a session, load interactive conent */}
                { !loading && session &&
                    <>
                        <IconButton
                            aria-label="addshow"
                            color="primary"
                            onClick={handleModalOpen}
                        >
                            <AddCircleIcon />
                        </IconButton>
                        <SearchShowModal
                            onCloseHandler={handleModalClose}
                            openState={modalOpen}
                        />
                    </> }
                <SWRTest />
            </>
        </Layout>
    );
};

Home.getInitialProps = async () => ({
    providerList: await providers()
});

Home.propTypes = {
    providerList: PropTypes.shape()
};

Home.defaultProps = {
    providerList: {}
};

export default Home;
