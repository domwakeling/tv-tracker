/* eslint-disable no-nested-ternary */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-extra-parens */
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import UserShowCard from './UserShowCard.jsx';
import UserShowModal from './UserShowModal.jsx';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useState } from 'react';

const UserShowList = ({ accessToken, userId, userShows }) => {
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

    const matches = useMediaQuery('(max-width:760px)');
    const matchesLarge = useMediaQuery('(min-width:1280px)');

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
                        lg={2}
                        md={3}
                        sm={4}
                        xs={6}
                    >
                        <UserShowCard
                            clickHandler={showClickHandler}
                            heightPref={
                                matchesLarge
                                    ? '280px'
                                    : (
                                        matches
                                            ? '350px'
                                            : '400px'
                                    )
                            }
                            show={show}
                        />
                    </Grid>
                ))}
            <UserShowModal
                accessToken={accessToken}
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
    accessToken: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    userShows: PropTypes.arrayOf(PropTypes.shape()).isRequired
};

export default UserShowList;
