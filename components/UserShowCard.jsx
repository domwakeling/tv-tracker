/* eslint-disable no-underscore-dangle */
/* eslint-disable max-statements */
/* eslint-disable no-extra-parens */
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

const UserShowCard = ({ clickHandler, heightPref, show }) => {

    const cardClickHandler = (ev) => {
        clickHandler(ev, show._id);
    };

    return (
        <div style={{ cursor: 'pointer' }}>
            <Card
                onClick={cardClickHandler}
                raised
            >
                <CardMedia
                    component="img"
                    height={heightPref}
                    image={show.imageUrl || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'}
                    title={show.title}
                />
                <CardContent>
                    <Typography
                        color="textSecondary"
                        component="p"
                        noWrap
                        variant="subtitle1"
                    >
                        {show.title}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    );
};

UserShowCard.propTypes = {
    clickHandler: PropTypes.func.isRequired,
    heightPref: PropTypes.string.isRequired,
    show: PropTypes.shape().isRequired
};

export default UserShowCard;
