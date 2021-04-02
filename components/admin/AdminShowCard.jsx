/* eslint-disable no-underscore-dangle */
/* eslint-disable max-statements */
/* eslint-disable no-extra-parens */
import * as constants from '../../lib/constants';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

const AdminShowCard = ({ show }) => {

    const posterURL = show.showInfo.Poster ||
        'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png';

    const updated = show.updated
        ? new Date(show.updated)
        : null;

    const lastUpdate = updated
        ? `${updated.getDate()} ${constants.MONTHS[updated.getMonth()]} ${updated.getFullYear()}`
        : 'never';

    return (
        <div style={{ cursor: 'pointer' }}>
            <Card
                raised
            >
                <CardContent>
                    <img
                        src={posterURL}
                        style={{
                            borderRadius: '25%',
                            float: 'left',
                            height: '30px',
                            marginRight: '10px',
                            width: '30px'
                        }}
                    />
                    <Typography
                        color="textSecondary"
                        component="p"
                        noWrap
                        variant="subtitle1"
                    >
                        {show.showInfo.Title}
                    </Typography>
                    <div style={{
                        clear: 'both',
                        height: '10px'
                    }}
                    />
                    <Typography
                        color={updated
                            ? 'textPrimary'
                            : 'textSecondary'}
                        noWrap
                        variant="body1"
                    >
                        Last updated: {lastUpdate}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    );
};

AdminShowCard.propTypes = {
    show: PropTypes.shape().isRequired
};

export default AdminShowCard;
