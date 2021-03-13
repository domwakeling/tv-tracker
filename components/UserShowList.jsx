/* eslint-disable no-underscore-dangle */
/* eslint-disable no-extra-parens */
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import UserShowCard from './UserShowCard.jsx';
import UserShowModal from './UserShowModal.jsx';
import { useState } from 'react';

const UserShowList = ({ userId, userShows }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [modalShowId, setModalShowId] = useState(null);

    const handleModalOpen = () => {
        setModalOpen(true);
    };

    const handleModalClose = () => {
        setModalShowId(null);
        setModalOpen(false);
    };

    const showClickHandler = (ev, showId) => {
        ev.preventDefault();
        setModalShowId(showId);
        handleModalOpen();
    };

    return (
        <Grid
            alignItems="stretch"
            container
            spacing={2}
        >
            { userShows && userShows.
                sort((s1, s2) => new Date(s2.lastWatched) - new Date(s1.lastWatched)).
                map((show) => (
                    <Grid
                        display="flex"
                        item
                        key={show._id}
                        md={3}
                        xs={6}
                    >
                        <UserShowCard
                            clickHandler={showClickHandler}
                            show={show}
                        />
                    </Grid>
                ))}
            <UserShowModal
                modalShowId={modalShowId}
                onCloseHandler={handleModalClose}
                openState={modalOpen}
                userId={userId}
                userShows={userShows}
            />
        </Grid>
    );
};

UserShowList.propTypes = {
    userId: PropTypes.string.isRequired,
    userShows: PropTypes.arrayOf(PropTypes.shape()).isRequired
};

export default UserShowList;
