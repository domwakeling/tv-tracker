/* eslint-disable no-extra-parens */
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import ShowCard from './ShowCard.jsx';

const ShowList = (props) => {
    const { shows } = props;

    return (
        <Grid
            alignItems="stretch"
            container
            spacing={2}
        >
            { shows && shows.Search && shows.Search.map((show) => (
                <Grid
                    item
                    key={show.imdbID}
                    md={4}
                    sm={6}
                    xs={12}
                >
                    <ShowCard
                        imageUrl={show.Poster === 'N/A'
                            ? null
                            : show.Poster}
                        title={show.Title}
                    />
                </Grid>
            ))}
        </Grid>
    );
};

ShowList.propTypes = {
    shows: PropTypes.shape().isRequired
};

export default ShowList;
