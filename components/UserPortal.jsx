/* eslint-disable no-underscore-dangle */
/* eslint-disable complexity */
/* eslint-disable no-extra-parens */
import Button from '@material-ui/core/Button';
import ContentLoading from './ContentLoading.jsx';
import SearchShowModal from '../components/SearchShowModal.jsx';
import Typography from '@material-ui/core/Typography';
import UserShowList from './UserShowList.jsx';
import { useSession } from 'next-auth/client';
import { useState } from 'react';
import useUser from '../lib/hooks/useUser';

const UserPortal = () => {
    const [session] = useSession();
    const { user, isLoading, isError } = useUser((session && session.accessToken) || null);
    const [modalOpen, setModalOpen] = useState(false);

    const handleModalOpen = () => {
        setModalOpen(true);
    };

    const handleModalClose = () => {
        setModalOpen(false);
    };

    return (
        <>
            {/* If the SWR is loading, show it */}
            { isLoading && <ContentLoading />}
            {/* Otherwise ... */}
            { !isLoading &&
                <>
                    <Typography
                        component="h1"
                        variant="h4"
                    >
                        Your Shows
                    </Typography>
                    <Button
                        color="primary"
                        onClick={handleModalOpen}
                    >
                        Add a show
                    </Button>
                    <SearchShowModal
                        onCloseHandler={handleModalClose}
                        openState={modalOpen}
                        user={user}
                    />
                    <UserShowList user={user} />
                </> }
            {/* If there's an error, show it */}
            { session && isError &&
                <Typography gutterBottom>ERROR in SWR (with session)</Typography> }
        </>
    );
};

export default UserPortal;
