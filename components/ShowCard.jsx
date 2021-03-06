import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const ShowCard = (props) => {
    const { imageUrl, title } = props;
    const matches = useMediaQuery('(min-width:600px) and (max-width:959px)');

    return (
        <Card>
            <CardMedia
                component="img"
                height={matches
                    ? '300'
                    : '400'}
                image={imageUrl || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'}
                title={title}
            />
            <CardContent>
                <Typography
                    color="textSecondary"
                    component="p"
                    variant="subtitle1"
                >
                    {title}
                </Typography>
            </CardContent>
            {/* <CardActions className={classes.cardActions}>
                <Button size="small" color="primary" onClick={() => dispatch(likePost(post._id))}><ThumbUpAltIcon fontSize="small" /> Like {post.likeCount} </Button>
                <Button size="small" color="primary" onClick={() => dispatch(deletePost(post._id))}><DeleteIcon fontSize="small" /> Delete</Button>
            </CardActions> */}
        </Card>
    );
};

ShowCard.propTypes = {
    imageUrl: PropTypes.string,
    title: PropTypes.string.isRequired
};

ShowCard.defaultProps = {
    imageUrl: null
};

export default ShowCard;