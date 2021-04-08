/* eslint-disable max-statements */
/* eslint-disable no-import-assign */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-magic-numbers */
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { signIn, useSession } from 'next-auth/client';
import Home from '../pages/index.jsx';
import Router from 'next/router';
import dummySession from '../__mocks__/dummySession';
import dummyShows from '../__mocks__/dummyShows';
import useUser from '../lib/hooks/useUser';

jest.mock('../lib/hooks/useUser');
jest.mock('../lib/Link');
jest.mock('next-auth/client');
jest.mock('next/router');

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
        roles: { admin: true },
        showIds,
        shows: dummyShows
    };

    const dummyUser2 = {
        _id: '1',
        roles: { admin: true },
        showIds: [],
        shows: []
    };

    test('show a login screen when no session / not loading', async () => {
        useSession.mockReturnValue([null, false]);
        render(<Home providerList={providerList} />);
        useSessionCalls += 2;
        await waitFor(() => expect(useSession).toHaveBeenCalledTimes(useSessionCalls));
        // Expect to be presented with sign-in options matching providerList
        expect(screen.getAllByTestId('sign-in-button')).toHaveLength(Object.keys(providerList).length);
    });

    test('call signIn when button clicked', async () => {
        useSession.mockReturnValue([null, false]);
        render(<Home providerList={providerList} />);
        useSessionCalls += 2;
        await waitFor(() => expect(useSession).toHaveBeenCalledTimes(useSessionCalls));
        // Expect to be presented with sign-in options matching providerList
        fireEvent.click(screen.getByText(/GitHub/u));
        await waitFor(() => expect(signIn).toHaveBeenLastCalledWith('github'));
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

    test('open a search modal if "add show" clicked, closes when "close" hit', async () => {
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
        // Clicking "add show" should open a modal => addl header element
        const numHeaders = screen.queryAllByRole('heading').length;
        fireEvent.click(screen.getByText('Add a show'));
        expect(screen.getAllByRole('heading')).toHaveLength(numHeaders + 1);
        // Clicking on the close button in the modal should remove that header again
        const modal = within(screen.getByTestId('add-show'));
        fireEvent.click(modal.getAllByRole('button')[0]);
        await waitFor(() => expect(screen.getAllByRole('heading')).toHaveLength(numHeaders));
    });

    test('sends to admin page', async () => {
        useSession.mockReturnValue([dummySession, false]);
        useUser.mockImplementation(() => ({
            isError: false,
            isLoading: false,
            user: dummyUser
        }));
        render(<Home providerList={providerList} />);
        useSessionCalls += 5;
        useUserCalls += 3;
        await waitFor(() => expect(useSession).toHaveBeenCalledTimes(useSessionCalls));
        await waitFor(() => expect(useUser).toHaveBeenCalledTimes(useUserCalls));
        // Click on the Admin Tools button
        fireEvent.click(screen.getByText('Admin tools'));
        await waitFor(() => expect(Router.push).toHaveBeenCalledTimes(1));
        expect(Router.push).toHaveBeenLastCalledWith('/admin');
    });

    test('user with no shows has "add a show" message', async () => {
        useSession.mockReturnValue([dummySession, false]);
        useUser.mockImplementation(() => ({
            isError: false,
            isLoading: false,
            user: dummyUser2
        }));
        render(<Home providerList={providerList} />);
        useSessionCalls += 3;
        useUserCalls += 1;
        await waitFor(() => expect(useSession).toHaveBeenCalledTimes(useSessionCalls));
        await waitFor(() => expect(useUser).toHaveBeenCalledTimes(useUserCalls));
        // Should have "add a show" message
        expect(screen.getByText('Add a show to get started ...'));
    });

});
