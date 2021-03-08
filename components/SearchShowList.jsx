/* eslint-disable no-extra-parens */
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import SearchShowCard from './SearchShowCard.jsx';

const SearchShowList = (props) => {
    const { shows } = props;

    return (
        <Grid
            alignItems="stretch"
            container
            spacing={2}
        >
            { shows && shows.Search && shows.Search.map((show) => (
                <Grid
                    display="flex"
                    item
                    key={show.imdbID}
                    md={4}
                    sm={6}
                    xs={12}
                >
                    <SearchShowCard
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

SearchShowList.propTypes = {
    shows: PropTypes.shape().isRequired
};

export default SearchShowList;
