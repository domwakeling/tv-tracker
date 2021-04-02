/* eslint-disable no-extra-parens */
import * as constants from '../../../lib/constants';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import SearchShowCard from './SearchShowCard.jsx';

const SearchShowList = (props) => {
    const { foundShows, modalCloseHandler, userId, userShows } = props;

    return (
        <Grid
            alignItems="stretch"
            container
            spacing={2}
        >
            { foundShows && foundShows.Search && foundShows.Search.map((show) => (
                <Grid
                    display="flex"
                    item
                    key={show.imdbID}
                    md={4}
                    sm={6}
                    xs={12}
                >
                    <SearchShowCard
                        id={show.imdbID}
                        imageUrl={show.Poster === 'N/A'
                            ? null
                            : show.Poster}
                        modalCloseHandler={modalCloseHandler}
                        title={show.Title}
                        userHas={userShows.indexOf(show.imdbID) >= constants.ZERO}
                        userId={userId}
                    />
                </Grid>
            ))}
        </Grid>
    );
};

SearchShowList.propTypes = {
    foundShows: PropTypes.shape().isRequired,
    modalCloseHandler: PropTypes.func.isRequired,
    userId: PropTypes.string.isRequired,
    userShows: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default SearchShowList;
