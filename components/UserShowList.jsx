/* eslint-disable no-underscore-dangle */
/* eslint-disable no-extra-parens */
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import UserShowCard from './UserShowCard.jsx';
import UserShowModal from './UserShowModal.jsx';
import { useState } from 'react';

const UserShowList = (props) => {
    const { user } = props;
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
            { user && user.shows && user.shows.map((show) => (
                <Grid
                    display="flex"
                    item
                    key={show._id}
                    md={3}
                    sm={4}
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
                user={user}
            />
        </Grid>
    );
};

UserShowList.propTypes = {
    user: PropTypes.shape().isRequired
};

export default UserShowList;
