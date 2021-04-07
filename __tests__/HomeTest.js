/* eslint-disable no-import-assign */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-magic-numbers */
import '@testing-library/jest-dom/extend-expect';
import { render, screen, waitFor } from '@testing-library/react';
import Home from '../pages/index.jsx';
import dummySession from '../__mocks__/dummySession';
import dummyShows from '../__mocks__/dummyShows';
import { useSession } from 'next-auth/client';
import useUser from '../lib/hooks/useUser';

jest.mock('../lib/hooks/useUser');
jest.mock('../lib/Link');
jest.mock('next-auth/client');

describe('Testing Home', () => {

    let useSessionCalls = 0;
    let useUserCalls = 0;

    const providerList = {
        github: {
            callbackUrl: 'http://localhost:3000/api/auth/callback/github',
            id: 'github',
            name: 'GitHub',
            signinUrl: 'http://localhost:3000/api/auth/signin/github',
            type: 'oauth'
        },
        twitter: {
            callbackUrl: 'http://localhost:3000/api/auth/callback/twitter',
            id: 'twitter',
            name: 'Twitter',
            signinUrl: 'http://localhost:3000/api/auth/signin/twitter',
            type: 'oauth'
        }
    };

    const showIds = dummyShows.map((show) => show._id);

    const dummyUser = {
        _id: '1',
        roles: {},
        showIds,
        shows: dummyShows
    };

    test('show a login screen when no session / not loading', async () => {
        useSession.mockReturnValue([null, false]);
        render(<Home providerList={providerList} />);
        useSessionCalls += 2;
        await waitFor(() => expect(useSession).toHaveBeenCalledTimes(useSessionCalls));
        // Expect to be presented with sign-in options matching providerList
        expect(screen.getAllByTestId('sign-in-button')).toHaveLength(Object.keys(providerList).length);
    });

    test('show a loading icon whilst loading', async () => {
        useSession.mockReturnValue([null, true]);
        render(<Home providerList={providerList} />);
        useSessionCalls += 2;
        await waitFor(() => expect(useSession).toHaveBeenCalledTimes(useSessionCalls));
        // Do NOT expect to be presented with sign-in options
        expect(screen.queryAllByTestId('sign-in-button')).toHaveLength(0);
        // DO expect to be presented with a CircularProgress
        expect(screen.getAllByTestId('content-loading')).toHaveLength(1);
    });

    test('load a portal if user', async () => {
        useSession.mockReturnValue([dummySession, false]);
        useUser.mockImplementation(() => ({
            isError: false,
            isLoading: false,
            user: dummyUser
        }));
        render(<Home providerList={providerList} />);
        useSessionCalls += 3;
        useUserCalls += 1;
        await waitFor(() => expect(useSession).toHaveBeenCalledTimes(useSessionCalls));
        await waitFor(() => expect(useUser).toHaveBeenCalledTimes(useUserCalls));
        // Do NOT expect to be presented with sign-in options
        expect(screen.queryAllByTestId('sign-in-button')).toHaveLength(0);
        // Do NOT expect to be presented with a CircularProgress
        expect(screen.queryAllByTestId('content-loading')).toHaveLength(0);
        expect(screen.getAllByTestId('user-card')).toHaveLength(dummyShows.length);
    });


});
