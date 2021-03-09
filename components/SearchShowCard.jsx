import * as constants from '../lib/constants';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const SearchShowCard = (props) => {
    const { id, imageUrl, title, user } = props;
    const matches = useMediaQuery('(max-width:959px)');

    return (
        <Card raised>
            <CardMedia
                component="img"
                height={matches
                    ? '450'
                    : '350'}
                image={imageUrl || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'}
                title={title}
            />
            <Box minHeight="96px">
                <CardContent>
                    <Typography
                        color="textSecondary"
                        component="p"
                        variant="subtitle1"
                    >
                        {title}
                    </Typography>
                </CardContent>
            </Box>
            <CardActions>
                { user.showIds.indexOf(id) < constants.ZERO
                    ? <Button color="secondary">Add to my shows</Button>
                    : <Button color="primary">Remove</Button> }
            </CardActions>
        </Card>
    );
};

SearchShowCard.propTypes = {
    id: PropTypes.string.isRequired,
    imageUrl: PropTypes.string,
    title: PropTypes.string.isRequired,
    user: PropTypes.shape().isRequired
};

SearchShowCard.defaultProps = {
    imageUrl: null
};

export default SearchShowCard;
