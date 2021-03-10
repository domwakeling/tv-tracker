/* eslint-disable no-underscore-dangle */
/* eslint-disable no-extra-parens */
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import UserShowCard from './UserShowCard.jsx';

const UserShowList = (props) => {
    const { user } = props;

    const clickHandler = (ev, showId) => {
        ev.preventDefault();
        console.log('clickHandler() in UserShowList was called for showId:', showId);
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
                        clickHandler={clickHandler}
                        show={show}
                    />
                </Grid>
            ))}
        </Grid>
    );
};

UserShowList.propTypes = {
    user: PropTypes.shape().isRequired
};

export default UserShowList;
