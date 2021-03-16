/* eslint-disable object-curly-newline */
/* eslint-disable no-underscore-dangle */
/* eslint-disable max-statements */
/* eslint-disable no-extra-parens */
import * as constants from '../lib/constants';
import { useEffect, useState } from 'react';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import ContentLoading from './ContentLoading.jsx';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import PropTypes from 'prop-types';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';

const UserShowUpdate = ({ episodes, lastSeen, setLastSeen }) => {
    const [currentPick, setCurrentPick] = useState({
        episode: 0,
        season: 0
    });

    useEffect(() => {
        setCurrentPick({
            episode: lastSeen.episode,
            season: lastSeen.season
        });
    }, [lastSeen]);

    const handleSeasonPick = (ev) => {
        ev.preventDefault();
        setCurrentPick({
            episode: 0,
            season: ev.target.value });
    };

    const handleEpisodePick = (ev) => {
        ev.preventDefault();
        setCurrentPick({
            episode: ev.target.value,
            season: currentPick.season
        });
        setLastSeen({
            episode: ev.target.value,
            season: currentPick.season
        });
    };

    // Get list of episodes numbers in an array - USES ONE-BASED SEASON NUMBERING
    const arrayOfEpisodes = (season) => {
        const ret = [];
        for (let idx = 1; idx <= episodes[season - constants.ONE]; idx += constants.ONE) {
            ret.push(idx);
        }
        return ret;
    };

    return (
        <Grid
            item
            md={4}
            xs={12}
        >
            <Card raised>
                <Box minHeight="130px">
                    <CardContent>
                        { episodes.length === constants.ZERO && <ContentLoading />}
                        { episodes.length > constants.ZERO &&
                            <>
                                <Typography
                                    component="p"
                                    variant="h6"
                                >
                                    Update Last Watched
                                </Typography>
                                <Box
                                    display="flex"
                                    mt={1}
                                >
                                    <FormControl color="secondary">
                                        <div style={{ width: '80px' }}>
                                            <InputLabel>Season</InputLabel>
                                            <Select
                                                fullWidth
                                                id="demo-simple-select"
                                                labelId="select-season"
                                                onChange={handleSeasonPick}
                                                value={currentPick.season === constants.ZERO
                                                    ? ''
                                                    : currentPick.season}
                                                width="10rem"
                                            >
                                                { episodes.map((season, idx) => (
                                                    <MenuItem
                                                        // eslint-disable-next-line react/no-array-index-key
                                                        key={`season${idx}`}
                                                        value={idx + constants.ONE}
                                                    >
                                                        {idx + constants.ONE}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </div>
                                    </FormControl>
                                    <div style={{ width: '15px' }} />
                                    <FormControl color="secondary">
                                        <div style={{ width: '80px' }}>
                                            <InputLabel>Episode</InputLabel>
                                            <Select
                                                disabled={currentPick.season === constants.ZERO}
                                                fullWidth
                                                id="demo-simple-select"
                                                labelId="select-episode"
                                                onChange={handleEpisodePick}
                                                value={currentPick.episode === constants.ZERO
                                                    ? ''
                                                    : currentPick.episode}
                                            >
                                                { arrayOfEpisodes(currentPick.season).
                                                    map((episode) => (
                                                        <MenuItem
                                                            key={`episode${episode}`}
                                                            value={episode}
                                                        >
                                                            {episode}
                                                        </MenuItem>
                                                    ))}
                                            </Select>
                                        </div>
                                    </FormControl>
                                </Box>
                            </> }
                    </CardContent>
                </Box>
            </Card>
        </Grid>
    );
};

UserShowUpdate.propTypes = {
    episodes: PropTypes.arrayOf(PropTypes.number).isRequired,
    lastSeen: PropTypes.shape({
        episode: PropTypes.number,
        season: PropTypes.number
    }).isRequired,
    setLastSeen: PropTypes.func.isRequired
};

export default UserShowUpdate;
