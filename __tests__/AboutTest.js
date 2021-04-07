/* eslint-disable no-magic-numbers */
import '@testing-library/jest-dom/extend-expect';
import { render, waitFor } from '@testing-library/react';
import About from '../pages/about.jsx';
import { useSession } from 'next-auth/client';

jest.mock('../lib/Link');
jest.mock('next-auth/client');

describe('Testing About', () => {

    let useSessionCalls = 0;

    const dummySession = {
        accessToken: 'anaccesstoken',
        expires: '1',
        user: {
            image: 'http://asite.com/animageurl.jpg',
            name: 'User'
        }
    };

    test('render when no session and not loading', async () => {
        useSession.mockReturnValue([null, false]);
        render(<About />);
        // Only called in Header, so 1 call/render
        useSessionCalls += 1;
        await waitFor(() => expect(useSession).toHaveBeenCalledTimes(useSessionCalls));
    });

    test('render when no session and loading', async () => {
        useSession.mockReturnValue([null, true]);
        render(<About />);
        // Only called in Header, so 1 call/render
        useSessionCalls += 1;
        await waitFor(() => expect(useSession).toHaveBeenCalledTimes(useSessionCalls));
    });

    test('render when session', async () => {
        useSession.mockReturnValue([dummySession, false]);
        render(<About />);
        // Only called in Header, so 1 call/render
        useSessionCalls += 1;
        await waitFor(() => expect(useSession).toHaveBeenCalledTimes(useSessionCalls));
    });

});
