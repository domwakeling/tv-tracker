/* eslint-disable no-empty-function */
/* eslint-disable no-underscore-dangle */
/* eslint-disable max-statements */
/* eslint-disable no-extra-parens */
import * as constants from '../../lib/constants';
import { useEffect, useState } from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import PropTypes from 'prop-types';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';

const AdminShowCard = ({ listUpdate, show, snackbarHandler }) => {

    const [checked, setChecked] = useState(true);

    useEffect(() => {
        if (show && show.showOver) {
            setChecked(false);
        }
    }, []);

    const setShowOver = async (showOver) => {
        const ret = await axios.post(`/api/shows/setshowover/${show._id}`, { showOver });
        if (ret.status === constants.RESPONSE_OK) {
            snackbarHandler({
                duration: constants.VERY_BRIEF,
                message: 'show updated',
                type: 'success'
            });
        } else {
            snackbarHandler({ message: 'update failed, please try again' });
        }
        return true;
    };

    const handleActiveSlider = async (ev) => {
        ev.preventDefault();
        const newChecked = !checked;
        setChecked(newChecked);
        await setShowOver(!newChecked);
        listUpdate();
    };

    const handleShowUpdate = async () => {
        const ret = await axios(`/api/shows/checkshowinfo/${show._id}`);
        if (ret.status === constants.RESPONSE_OK) {
            snackbarHandler({
                duration: constants.VERY_BRIEF,
                message: 'show updated',
                type: 'success'
            });
        } else {
            snackbarHandler({ message: 'update failed, please try again' });
        }
        listUpdate();
    };

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
                    <Box ml={0.5}>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={checked}
                                    color="primary"
                                    name="checkedA"
                                    onClick={handleActiveSlider}
                                    size="small"
                                />
                            }
                            label={checked
                                ? 'Show active'
                                : 'Show over'}
                        />
                    </Box>
                    <div style={{ float: 'right' }}>
                        <Button
                            color="primary"
                            disabled={!checked}
                            onClick={handleShowUpdate}
                            size="small"
                            variant="contained"
                        >
                            Update now
                        </Button>
                    </div>
                    <Typography
                        color={updated
                            ? 'textPrimary'
                            : 'textSecondary'}
                        noWrap
                        variant="body1"
                    >
                        Updated: {lastUpdate}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    );
};

AdminShowCard.propTypes = {
    listUpdate: PropTypes.func,
    show: PropTypes.shape().isRequired,
    snackbarHandler: PropTypes.func
};

AdminShowCard.defaultProps = {
    listUpdate: () => {},
    snackbarHandler: () => {}
};

export default AdminShowCard;
