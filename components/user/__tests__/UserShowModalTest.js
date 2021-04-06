/* eslint-disable no-underscore-dangle */
/* eslint-disable max-statements */
/* eslint-disable no-magic-numbers */
/* eslint-disable no-extra-parens */
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import UserShowModal from '../portal/UserShowModal.jsx';
import axios from 'axios';

jest.mock('axios');
// eslint-disable-next-line no-import-assign

describe('Testing UserShowModal', () => {

    const onCloseHandler = jest.fn();
    let axiosCount = 0;

    const shows = [
        {
            _id: '1',
            episodes: [3],
            lastEpisode: {
                episode: 0,
                season: 0
            },
            lastWatched: 0,
            title: 'Show 1'
        },
        {
            _id: '2',
            episodes: [3, 3],
            lastEpisode: {
                episode: 3,
                season: 2
            },
            lastWatched: 1,
            title: 'Show 2'
        },
        {
            _id: '3',
            episodes: [3, 3, 3],
            lastEpisode: {
                episode: 3,
                season: 2
            },
            lastWatched: 1,
            title: 'Show 3'
        }
    ];

    const dummyShowInfo = (showId) => {
        // eslint-disable-next-line prefer-destructuring
        const show = shows.filter((item) => item._id === showId)[0];
        const dummyShow = {
            seasonsInfo: [],
            showInfo: {
                Title: show.title,
                totalSeasons: `${show.episodes.length}`
            }
        };
        // Build each season out
        // eslint-disable-next-line no-plusplus
        for (let season = 1; season <= show.episodes.length; season++) {
            // Main season info + empty episodes
            const tempSeason = {
                Episodes: [],
                Season: `${season}`,
                Title: show.title,
                totalSeasons: `${show.episodes.length}`
            };
            // Populate episodes
            // eslint-disable-next-line no-plusplus
            for (let episode = 1; episode <= show.episodes[season - 1]; episode++) {
                const tempEp = {
                    Episode: `${episode}`,
                    Title: `#${season}.${episode}`
                };
                tempSeason.Episodes.push(tempEp);
            }
            // Add season to dummyShow
            dummyShow.seasonsInfo.push(tempSeason);
        }
        return dummyShow;
    };

    const dummyModal = (
        <UserShowModal
            accessToken="1"
            episodeHeightPref="250px"
            modalShowId={null}
            onCloseHandler={onCloseHandler}
            openState={false}
            userId="1"
            userShows={shows}
        />
    );

    const dummyModal2 = (
        <UserShowModal
            accessToken="1"
            episodeHeightPref="250px"
            modalShowId="1"
            onCloseHandler={onCloseHandler}
            openState
            userId="1"
            userShows={shows}
        />
    );

    const dummyModal3 = (
        <UserShowModal
            accessToken="1"
            episodeHeightPref="250px"
            modalShowId="2"
            onCloseHandler={onCloseHandler}
            openState
            userId="1"
            userShows={shows}
        />
    );

    const dummyModal4 = (
        <UserShowModal
            accessToken="1"
            episodeHeightPref="250px"
            modalShowId="3"
            onCloseHandler={onCloseHandler}
            openState
            userId="1"
            userShows={shows}
        />
    );

    test('modal not visible when openState is false', () => {
        render(dummyModal);
        expect(screen.queryAllByTestId('user-show-modal')).toHaveLength(0);
    });

    test('modal visible when openState is true, show name showing', () => {
        render(dummyModal2);
        axiosCount += 1;
        expect(screen.queryAllByTestId('user-show-modal')).toHaveLength(1);
        expect(screen.getByText('Show 1'));
    });

    test('correct message when no previous episode', () => {
        render(dummyModal2);
        axiosCount += 1;
        expect(screen.getByText('Let\'s get started!'));
    });

    test('correct message when all watched', () => {
        render(dummyModal3);
        axiosCount += 1;
        expect(screen.getByText('No more episodes'));
    });

    test('correct message when mid-watching', () => {
        render(dummyModal4);
        axiosCount += 1;
        expect(screen.getByText('S2 E3'));
        expect(screen.getByText('S3 E1'));
    });

    test('correct "Up Next" label and episode', async () => {
        const resp = dummyShowInfo('1');
        axios.mockImplementationOnce(() => Promise.resolve({ data: { show: resp } }));
        render(dummyModal2);
        axiosCount += 1;
        expect(screen.getByText('S1 E1'));
        await waitFor(() => expect(axios).toHaveBeenCalledTimes(axiosCount));
        expect(screen.getByText('#1.1'));
    });

    test('correct "Previous" label and episode', async () => {
        const resp = dummyShowInfo('2');
        axios.mockImplementationOnce(() => Promise.resolve({ data: { show: resp } }));
        render(dummyModal3);
        axiosCount += 1;
        expect(screen.getByText('S2 E3'));
        await waitFor(() => expect(axios).toHaveBeenCalledTimes(axiosCount));
        expect(screen.getByText('#2.3'));
    });

    test('change the last seen show', async () => {
        const resp = dummyShowInfo('3');
        axios.mockImplementationOnce(() => Promise.resolve({ data: { show: resp } }));
        render(dummyModal4);
        axiosCount += 1;
        // Get buttons, trigger season selection and select "3"
        const buttons = screen.getAllByRole('button');
        fireEvent.mouseDown(buttons[1]);
        const seasonList = within(screen.getByRole('listbox'));
        fireEvent.click(seasonList.getByText('3'));
        // Trigger episode selection and select "1"
        fireEvent.mouseDown(buttons[2]);
        const episodeList = within(screen.getByRole('listbox'));
        fireEvent.click(episodeList.getByText('1'));
        // Should now be on last S3E1 and next S3E2
        await waitFor(() => expect(axios).toHaveBeenCalledTimes(axiosCount));
        expect(screen.getByText('S3 E1'));
        expect(screen.getByText('#3.1'));
        expect(screen.getByText('S3 E2'));
        expect(screen.getByText('#3.2'));
    });

});
