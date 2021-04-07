/* eslint-disable max-statements */
/* eslint-disable no-extra-parens */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-magic-numbers */
/* eslint-disable no-import-assign */
import '@testing-library/jest-dom/extend-expect';
import { render, screen, waitFor } from '@testing-library/react';
import SWRTestUser from '../../components/testing/SWRTest.jsx';
import dummySession from '../../__mocks__/dummySession';
import dummyShows from '../../__mocks__/dummyShows';
import useSWR from 'swr';
import { useSession } from 'next-auth/client';

jest.mock('next-auth/client');
jest.mock('swr');

/*
 * This file uses SWRTest as a proxy to complete the useUser tests (since we need a component in
 * order to be able to test React hooks)
 */

describe('Testing useUser', () => {

    let useSWRCount = 0;

    const showIds = dummyShows.map((show) => show._id);

    const dummyUser = {
        _id: '1',
        roles: { admin: 'true' },
        showIds,
        shows: dummyShows
    };

    const DummyElement = (<SWRTestUser />);

    test('reports if no session', async () => {
        useSWR.mockImplementation(() => ({
            data: {},
            error: false
        }));
        useSession.mockReturnValue([null, true]);
        render(DummyElement);
        await waitFor(() => expect(useSWR).toHaveBeenCalledTimes(useSWRCount));
        // Should show access token and dummy name
        expect(screen.getAllByText(/No session/u));
    });

    test('returns correctly with the user', async () => {
        useSWR.mockReturnValue({
            data: dummyUser,
            error: false
        });
        useSession.mockReturnValue([dummySession, false]);
        render(DummyElement);
        useSWRCount += 1;
        await waitFor(() => expect(useSWR).toHaveBeenCalledTimes(useSWRCount));
        // Should show access token and dummy name
        expect(screen.getAllByText(/anaccesstoken/u));
        expect(screen.getAllByText(/Dummy User Name/u));
    });

    test('reports if an error session', async () => {
        useSWR.mockImplementation(() => ({
            data: {},
            error: true
        }));
        useSession.mockReturnValue([dummySession, true]);
        render(DummyElement);
        useSWRCount += 1;
        await waitFor(() => expect(useSWR).toHaveBeenCalledTimes(useSWRCount));
        // Should show access token and dummy name
        expect(screen.getAllByText(/ERROR in SWR/u));
    });


});
