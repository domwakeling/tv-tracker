/* eslint-disable no-underscore-dangle */
/* eslint-disable max-statements */
/* eslint-disable no-magic-numbers */
/* eslint-disable no-extra-parens */
/* eslint-disable no-empty-function */
import '@testing-library/jest-dom/extend-expect';
import * as constants from '../../../lib/constants';
import * as swr from 'swr';
import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import UserShowList from '../portal/UserShowList.jsx';
import axios from 'axios';
import mediaQuery from 'css-mediaquery';

jest.mock('axios');
// eslint-disable-next-line no-import-assign
swr.mutate = jest.fn();

/*
 * Tests for the UserShowList component also provide integration tests to ensure that the 'update'
 * modal is shown when a UserShowCard is clicked
 */

describe('Testing UserShowList', () => {

    let axiosCount = 0;
    let axiosPostCount = 0;
    let swrMutateCount = 0;

    const dummyList = (
        <UserShowList
            accessToken="accessToken"
            userId="1"
            userShows={[]}
        />
    );

    const shows = [
        {
            _id: '1',
            episodes: [5, 5],
            lastEpisode: {
                episode: 0,
                season: 0
            },
            lastWatched: 0,
            title: 'Show 1'
        },
        {
            _id: '2',
            episodes: [5, 5, 5],
            lastEpisode: {
                episode: 5,
                season: 3
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
            lastWatched: 2,
            title: 'Show 3'
        }
    ];

    const dummyList2 = (
        <UserShowList
            accessToken="accessToken2"
            userId="2"
            userShows={shows}
        />
    );

    // Check it renders

    test('an empty shows list renders', () => {
        render(dummyList);
    });

    test('a non-empty shows list renders', () => {
        render(dummyList2);
    });

    // Check that cards are being generated

    test('a list of three shows drives three cards (images)', () => {
        render(dummyList2);
        const images = screen.getAllByRole('img');
        expect(screen.getAllByText('Show 1')).toHaveLength(1);
        expect(screen.getAllByText('Show 2')).toHaveLength(1);
        expect(screen.getAllByText('Show 3')).toHaveLength(1);
        expect(images.length).toBe(3);
        // At this point there shouldn't be a header; use query (not get) to avoid error
        expect(screen.queryAllByRole('header')).toHaveLength(0);
    });

    // Test that the modal shows / doesn't show

    test('clicking on a card opens a modal', () => {
        render(dummyList2);
        expect(screen.queryAllByRole('heading')).toHaveLength(0);
        axiosCount += 1;
        fireEvent(
            screen.getAllByRole('img')[0],
            new MouseEvent('click', {
                bubbles: true,
                cancelable: true
            })
        );
        expect(screen.getAllByRole('heading')).toHaveLength(1);
    });

    test('clicking elsewhere closes the modal again', () => {
        render(dummyList2);
        axiosCount += 1;
        fireEvent(
            screen.getAllByRole('img')[0],
            new MouseEvent('click', {
                bubbles: true,
                cancelable: true
            })
        );
        fireEvent(
            screen.getByLabelText('close modal'),
            new MouseEvent('click', {
                bubbles: true,
                cancelable: true
            })
        );
        expect(screen.queryAllByRole('heading')).toHaveLength(0);
    });

    // Prep for screen-width tests
    const createMatchMedia = (width) => (query) => ({
        addListener: () => { },
        matches: mediaQuery.match(query, {
            width
        }),
        removeListener: () => { }
    });

    // Check that heightPref is being passed to UserShowCard's and is implementing
    test('very small screen (<= 600px) gets 250px image on card', () => {
        window.matchMedia = createMatchMedia(600);
        render(dummyList2);
        expect(screen.getAllByRole('img')[0]).toHaveAttribute('height', '250px');
    });
    test('small/NOT phone (600 < x < 760) gets 350px image on card', () => {
        window.matchMedia = createMatchMedia(700);
        render(dummyList2);
        expect(screen.getAllByRole('img')[0]).toHaveAttribute('height', '350px');
    });
    test('middling (760 < x < 1280) gets 400px image on card', () => {
        window.matchMedia = createMatchMedia(800);
        render(dummyList2);
        expect(screen.getAllByRole('img')[0]).toHaveAttribute('height', '400px');
    });
    test('large (>=1280) gets 280px image on card', () => {
        window.matchMedia = createMatchMedia(1280);
        render(dummyList2);
        expect(screen.getAllByRole('img')[0]).toHaveAttribute('height', '280px');
    });
    // Presently no way to test for pixel ratio so can't test for iPhone options

    // Check that modal updates for shows and is removed when "Update" is clicked
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

    test('open update modal, change the last seen show and update', async () => {
        const resp = dummyShowInfo('3');
        axios.mockImplementationOnce(() => Promise.resolve({ data: { show: resp } }));
        render(dummyList2);
        // Trigger the modal
        axiosCount += 1;
        fireEvent.click(screen.getAllByRole('img')[0]);
        await waitFor(() => expect(axios).toHaveBeenCalledTimes(axiosCount));
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
        expect(screen.getByText('S3 E1'));
        expect(screen.getByText('S3 E2'));
        // Trigger the update button
        axios.post.mockImplementationOnce(() => Promise.resolve({ status: constants.RESPONSE_OK }));
        axiosPostCount += 1;
        swrMutateCount += 1;
        fireEvent.click(buttons[3]);
        // Wait for the close handler to have called mutate
        await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(axiosPostCount));
        await waitFor(() => expect(swr.mutate).toHaveBeenCalledTimes(swrMutateCount));
        // Modal should be off-screen so no text 'update'
        expect(screen.queryAllByText('Update')).toHaveLength(0);
    });

    test('open update modal, show dialog and cancel', async () => {
        const resp = dummyShowInfo('3');
        axios.mockImplementationOnce(() => Promise.resolve({ data: { show: resp } }));
        render(dummyList2);
        // Trigger the modal
        axiosCount += 1;
        fireEvent.click(screen.getAllByRole('img')[0]);
        await waitFor(() => expect(axios).toHaveBeenCalledTimes(axiosCount));
        // Get buttons
        const buttons = screen.getAllByRole('button');
        // Should be no dialog yet
        expect(screen.queryAllByTestId('delete-dialog')).toHaveLength(0);
        // Trigger the update button
        fireEvent.click(buttons[4]);
        // Dialog should have shown up
        expect(screen.queryAllByTestId('delete-dialog')).toHaveLength(1);
        // Click on cancel button
        const deleteDialog = within(screen.getByTestId('delete-dialog'));
        fireEvent.click(deleteDialog.getAllByRole('button')[0]);
        // Expect no further calls (struggling to test that there's no dialog)
        await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(axiosPostCount));
        await waitFor(() => expect(swr.mutate).toHaveBeenCalledTimes(swrMutateCount));
    });

    test('open update modal, show dialog and cancel', async () => {
        const resp = dummyShowInfo('3');
        axios.mockImplementationOnce(() => Promise.resolve({ data: { show: resp } }));
        render(dummyList2);
        // Trigger the modal
        axiosCount += 1;
        fireEvent.click(screen.getAllByRole('img')[0]);
        await waitFor(() => expect(axios).toHaveBeenCalledTimes(axiosCount));
        // Get buttons
        const buttons = screen.getAllByRole('button');
        // Should be no dialog yet
        expect(screen.queryAllByTestId('delete-dialog')).toHaveLength(0);
        // Trigger the update button
        fireEvent.click(buttons[4]);
        // Dialog should have shown up
        expect(screen.queryAllByTestId('delete-dialog')).toHaveLength(1);
        // Click on cancel button
        axios.post.mockImplementationOnce(() => Promise.resolve({ status: constants.RESPONSE_OK }));
        const deleteDialog = within(screen.getByTestId('delete-dialog'));
        fireEvent.click(deleteDialog.getAllByRole('button')[1]);
        // Expect there to be both an axios.post and swr.mutate
        axiosPostCount += 1;
        swrMutateCount += 1;
        await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(axiosPostCount));
        await waitFor(() => expect(swr.mutate).toHaveBeenCalledTimes(swrMutateCount));
        // Delete dialog should have gone again
        expect(screen.queryAllByTestId('delete-dialog')).toHaveLength(0);
        // Expect modal to have gone
        expect(screen.queryAllByRole('heading')).toHaveLength(0);
    });

});
