/* eslint-disable no-underscore-dangle */
/* eslint-disable no-extra-parens */
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const UserShowList = (props) => {
    const { user } = props;
    const matches = useMediaQuery('(max-width:959px)');

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
                    <Card raised>
                        <CardMedia
                            component="img"
                            height={matches
                                ? '450'
                                : '350'}
                            image={show.imageUrl || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'}
                            title={show.title}
                        />
                        <Box minHeight="96px">
                            <CardContent>
                                <Typography
                                    color="textSecondary"
                                    component="p"
                                    variant="subtitle1"
                                >
                                    {show.title}
                                </Typography>
                            </CardContent>
                        </Box>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};

UserShowList.propTypes = {
    user: PropTypes.shape().isRequired
};

export default UserShowList;
