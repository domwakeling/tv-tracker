/* eslint-disable no-extra-parens */
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
// import SearchShowCard from './SearchShowCard.jsx';

const UserShowList = (props) => {
    const { user } = props;

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
                    key={show.imdbID}
                    md={4}
                    sm={6}
                    xs={12}
                >
                    <div style= {{ height: "200", width: "200", backgroundColor: "red"}} />
                        {/* imageUrl={show.Poster === 'N/A'
                            ? null
                            : show.Poster}
                        title={show.Title}
                    /> */}
                </Grid>
            ))}
        </Grid>
    );
};

UserShowList.propTypes = {
    user: PropTypes.shape().isRequired
};

export default UserShowList;
