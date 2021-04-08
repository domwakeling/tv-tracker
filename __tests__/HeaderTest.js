/* eslint-disable no-import-assign */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-magic-numbers */
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { signOut, useSession } from 'next-auth/client';
import Header from '../components/layout/Header.jsx';
import Router from 'next/router';
import dummySession from '../__mocks__/dummySession';

jest.mock('../lib/Link');
jest.mock('next-auth/client');
jest.mock('next/router');

describe('Testing Header', () => {

    let useSessionCalls = 0;

    test('renders when no session', async () => {
        useSession.mockReturnValue([null, false]);
        render(<Header />);
        useSessionCalls += 1;
        await waitFor(() => expect(useSession).toHaveBeenCalledTimes(useSessionCalls));
        // Expect to be presented with sign-in options matching providerList
        expect(screen.queryAllByTestId('user-icon')).toHaveLength(0);
    });

    test('renders when there is a session', async () => {
        useSession.mockReturnValue([dummySession, false]);
        render(<Header />);
        useSessionCalls += 1;
        await waitFor(() => expect(useSession).toHaveBeenCalledTimes(useSessionCalls));
        // Expect to be presented with sign-in options matching providerList
        expect(screen.queryAllByTestId('user-icon')).toHaveLength(1);
    });

    test('username visible when hovering', async () => {
        useSession.mockReturnValue([dummySession, false]);
        render(<Header />);
        useSessionCalls += 1;
        await waitFor(() => expect(useSession).toHaveBeenCalledTimes(useSessionCalls));
        // Expect to be presented with sign-in options matching providerList
        expect(screen.queryAllByText(/Dummy User Name/u)).toHaveLength(0);
        fireEvent.mouseEnter(screen.getByTestId('user-icon'));
        // Need to await because the tooltip doesn't appear instantaneously
        await waitFor(() => expect(screen.queryAllByText(/Dummy User Name/u)).toHaveLength(1));
    });

    test('menu appears on click', async () => {
        useSession.mockReturnValue([dummySession, false]);
        render(<Header />);
        useSessionCalls += 1;
        await waitFor(() => expect(useSession).toHaveBeenCalledTimes(useSessionCalls));
        // Sign Out is always rendered in the DOM, but shouldn't be visible yet
        expect(screen.getByText(/Sign Out/u)).not.toBeVisible();
        // Click on the icon and it should be visible
        fireEvent.click(screen.getByTestId('user-icon'));
        expect(screen.getByText(/Sign Out/u)).toBeVisible();

        // Haven't figured out yet how to make it disappear again
    });

    test('calls sign-out when "Sign Out" clicked', async () => {
        useSession.mockReturnValue([dummySession, false]);
        render(<Header />);
        useSessionCalls += 2;
        await waitFor(() => expect(useSession).toHaveBeenCalledTimes(useSessionCalls));
        // Sign Out is always rendered in the DOM, but shouldn't be visible yet
        expect(screen.getByText(/Sign Out/u)).not.toBeVisible();
        // Click on the icon and it should be visible
        fireEvent.click(screen.getByTestId('user-icon'));
        expect(screen.getByText(/Sign Out/u)).toBeVisible();
        fireEvent.click(screen.getByText(/Sign Out/u));
        await waitFor(() => expect(signOut).toHaveBeenCalledTimes(1));
    });

    test('triggers Router with "about" when button clicked', async () => {
        useSession.mockReturnValue([dummySession, false]);
        render(<Header />);
        useSessionCalls += 2;
        await waitFor(() => expect(useSession).toHaveBeenCalledTimes(useSessionCalls));
        // Click on the About button
        fireEvent.click(screen.getByText('About'));
        await waitFor(() => expect(Router.push).toHaveBeenCalledTimes(1));
        expect(Router.push).toHaveBeenLastCalledWith('/about');
    });

});
