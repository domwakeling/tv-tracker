/* eslint-disable object-curly-newline */
/* eslint-disable no-underscore-dangle */
/* eslint-disable max-statements */
/* eslint-disable no-extra-parens */
import * as constants from '../lib/constants';
import { useEffect, useState } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import ContentLoading from './ContentLoading.jsx';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import PropTypes from 'prop-types';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';

const UserShowUpdate = ({ episodes, lastSeen }) => {
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
        <Card raised>
            <CardContent>
                { episodes.length === constants.ZERO && <ContentLoading />}
                { episodes.length > constants.ZERO &&
                    <>
                        <Typography>
                            Current Pick: S{currentPick.season} E{currentPick.episode}
                        </Typography>
                        <FormControl>
                            <InputLabel>Season</InputLabel>
                            <Select
                                id="demo-simple-select"
                                labelId="select-season"
                                onChange={handleSeasonPick}
                                value={currentPick.season}
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
                        </FormControl>
                        <FormControl>
                            <InputLabel>Episode</InputLabel>
                            <Select
                                id="demo-simple-select"
                                labelId="select-episode"
                                onChange={handleEpisodePick}
                                value={currentPick.episode}
                            >
                                { arrayOfEpisodes(currentPick.season).map((episode) => (
                                    <MenuItem
                                        key={`episode${episode}`}
                                        value={episode}
                                    >
                                        {episode}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </> }
            </CardContent>
        </Card>
    );
};

UserShowUpdate.propTypes = {
    episodes: PropTypes.arrayOf(PropTypes.number).isRequired,
    lastSeen: PropTypes.shape({
        episode: PropTypes.number,
        season: PropTypes.number
    }).isRequired
};

export default UserShowUpdate;
