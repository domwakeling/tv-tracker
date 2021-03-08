import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const SearchShowCard = (props) => {
    const { imageUrl, title } = props;
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
            {/* <CardActions className={classes.cardActions}>
                <Button size="small" color="primary" onClick={() => dispatch(likePost(post._id))}><ThumbUpAltIcon fontSize="small" /> Like {post.likeCount} </Button>
                <Button size="small" color="primary" onClick={() => dispatch(deletePost(post._id))}><DeleteIcon fontSize="small" /> Delete</Button>
            </CardActions> */}
        </Card>
    );
};

SearchShowCard.propTypes = {
    imageUrl: PropTypes.string,
    title: PropTypes.string.isRequired
};

SearchShowCard.defaultProps = {
    imageUrl: null
};

export default SearchShowCard;
