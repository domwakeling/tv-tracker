/* eslint-disable no-import-assign */
/* eslint-disable max-statements */
/* eslint-disable no-magic-numbers */
/* eslint-disable no-extra-parens */
import '@testing-library/jest-dom/extend-expect';
import * as constants from '../../../lib/constants';
import * as swr from 'swr';
import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import SearchShowModal from '../search/SearchShowModal.jsx';
import axios from 'axios';
import dummySession from '../../../__mocks__/dummySession';
import dummyShowSearch from '../../../__mocks__/dummySearchInfo';
import { useSession } from 'next-auth/client';

jest.mock('next-auth/client');
jest.mock('axios');
swr.mutate = jest.fn();

describe('Testing UserShowCard', () => {

    // We should never get to see a search list without there being a session, so return dummySession
    useSession.mockReturnValue([dummySession, false]);

    const axiosCalled = {
        axios: 0,
        get: 0,
        post: 0
    };

    let mutateCount = 0;
    let closeCount = 0;

    const dummyClickHandler = jest.fn();

    const dummyShowIntoDB = {
        seasonsInfo: [],
        showInfo: dummyShowSearch.Search[1],
        showOver: true,
        updated: new Date()
    };

    // Dummy search modal, no shows (NB: userShows is a list of *ID*s)
    const dummyModal = (
        <SearchShowModal
            onCloseHandler={dummyClickHandler}
            openState
            userId="1"
            userShows={[]}
        />
    );

    test('search modal renders', () => {
        render(dummyModal);
    });

    test('search function works', async () => {
        axios.mockReturnValueOnce({
            data: dummyShowSearch,
            status: constants.RESPONSE_OK
        });
        render(dummyModal);
        // Submitting the term "Batman" should call axios with the correct route
        fireEvent.change(screen.getByRole('searchbox'), { target: { value: 'Batman' } });
        fireEvent.click(screen.getByText('Submit'));
        axiosCalled.axios += 1;
        await waitFor(() => expect(axios).toHaveBeenCalledTimes(axiosCalled.axios));
        expect(axios).toHaveBeenLastCalledWith('/api/shows/search/Batman');
        // We should now have shows ...
        expect(screen.getAllByTestId('search-show-card')).toHaveLength(dummyShowSearch.Search.length);
    });

    test('search function reacts correctly when the response status is an error', async () => {
        axios.mockReturnValueOnce({
            status: constants.REPONSE_ERROR
        });
        render(dummyModal);
        fireEvent.change(screen.getByRole('searchbox'), { target: { value: 'Batman' } });
        fireEvent.click(screen.getByText('Submit'));
        axiosCalled.axios += 1;
        await waitFor(() => expect(axios).toHaveBeenCalledTimes(axiosCalled.axios));
        expect(axios).toHaveBeenLastCalledWith('/api/shows/search/Batman');
        // The error is passed to SearchShowList component, but not demonstrated to end user
        expect(screen.queryAllByTestId('search-show-card')).toHaveLength(0);
    });

    test('search function reacts correctly when axios throws an error', async () => {
        axios.mockImplementationOnce(() => {
            throw new Error();
        });
        render(dummyModal);
        fireEvent.change(screen.getByRole('searchbox'), { target: { value: 'Batman' } });
        fireEvent.click(screen.getByText('Submit'));
        axiosCalled.axios += 1;
        await waitFor(() => expect(axios).toHaveBeenCalledTimes(axiosCalled.axios));
        expect(axios).toHaveBeenLastCalledWith('/api/shows/search/Batman');
        // The error is passed to SearchShowList component, but not demonstrated to end user
        expect(screen.queryAllByTestId('search-show-card')).toHaveLength(0);
    });

    test('search => add show, show NOT in MongoDB', async () => {
        axios.mockReturnValueOnce({
            data: dummyShowSearch,
            status: constants.RESPONSE_OK
        });
        render(dummyModal);
        fireEvent.change(screen.getByRole('searchbox'), { target: { value: 'Batman' } });
        fireEvent.click(screen.getByText('Submit'));
        axiosCalled.axios += 1;
        await waitFor(() => expect(axios).toHaveBeenCalledTimes(axiosCalled.axios));
        // At this point we have search info in cards on screen, index:1 is Batman Beyond
        const bbCard = within(screen.getAllByTestId('search-show-card')[1]);
        axios.
            // First call is whether the show is in the db; return data empty => not found
            mockReturnValueOnce({
                data: {
                    show: null
                },
                status: constants.RESPONSE_OK
            }).
            // Next call is to OMDB to get the info
            mockReturnValueOnce({
                data: dummyShowIntoDB,
                status: constants.RESPONSE_OK
            });
        axios.post.
            // Next is a POST into the MongoDB Shows, returning the show
            mockReturnValueOnce({
                data: dummyShowIntoDB
            }).
            // And finally is a POST to MongoB Users, returning message
            mockReturnValueOnce({
                message: 'success'
            });
        axiosCalled.axios += 2;
        axiosCalled.post += 2;
        mutateCount += 1;
        fireEvent.click(bbCard.getByText('Add show'));
        await waitFor(() => expect(axios).toHaveBeenCalledTimes(axiosCalled.axios));
        await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(axiosCalled.post));
        await waitFor(() => expect(swr.mutate).toHaveBeenCalledTimes(mutateCount));
        expect(axios.mock.calls[axiosCalled.axios - 2][0]).toBe('/api/shows/getshowfromdb/tt0147746');
        expect(axios.mock.calls[axiosCalled.axios - 1][0]).toBe('/api/shows/getshowinfo/tt0147746');
        expect(axios.post.mock.calls[axiosCalled.post - 2][0]).toBe('/api/shows/saveshowtodb');
        expect(axios.post.mock.calls[axiosCalled.post - 2][1]).toStrictEqual({ show: dummyShowIntoDB });
        expect(axios.post.mock.calls[axiosCalled.post - 1][0]).toBe('/api/user/addshow');
        closeCount += 1;
        await waitFor(() => expect(dummyClickHandler).toHaveBeenCalledTimes(closeCount));
    });

    test('search => add show, show IS in MongoDB', async () => {
        axios.mockReturnValueOnce({
            data: dummyShowSearch,
            status: constants.RESPONSE_OK
        });
        render(dummyModal);
        fireEvent.change(screen.getByRole('searchbox'), { target: { value: 'Batman' } });
        fireEvent.click(screen.getByText('Submit'));
        axiosCalled.axios += 1;
        await waitFor(() => expect(axios).toHaveBeenCalledTimes(axiosCalled.axios));
        // At this point we have search info in cards on screen, index:1 is Batman Beyond
        const bbCard = within(screen.getAllByTestId('search-show-card')[1]);
        axios.
            // First call is whether the show is in the db; return show
            mockReturnValueOnce({
                data: {
                    show: dummyShowIntoDB
                },
                status: constants.RESPONSE_OK
            });
        axios.post.
            // And finally is a POST to MongoB Users, returning message
            mockReturnValueOnce({
                message: 'success'
            });
        axiosCalled.axios += 1;
        axiosCalled.post += 1;
        mutateCount += 1;
        fireEvent.click(bbCard.getByText('Add show'));
        await waitFor(() => expect(axios).toHaveBeenCalledTimes(axiosCalled.axios));
        await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(axiosCalled.post));
        await waitFor(() => expect(swr.mutate).toHaveBeenCalledTimes(mutateCount));
        expect(axios.mock.calls[axiosCalled.axios - 1][0]).toBe('/api/shows/getshowfromdb/tt0147746');
        expect(axios.post.mock.calls[axiosCalled.post - 1][0]).toBe('/api/user/addshow');
        closeCount += 1;
        await waitFor(() => expect(dummyClickHandler).toHaveBeenCalledTimes(closeCount));
    });

});
