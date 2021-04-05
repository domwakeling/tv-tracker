/* eslint-disable max-statements */
/* eslint-disable no-magic-numbers */
/* eslint-disable no-extra-parens */
/* eslint-disable no-empty-function */
/* eslint-disable function-paren-newline */
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render, screen } from '@testing-library/react';
import UserShowList from '../portal/UserShowList.jsx';
import mediaQuery from 'css-mediaquery';

describe('Testing UserShowList', () => {

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
            lastEpisode: {
                episode: 1,
                season: 1
            },
            lastWatched: 0,
            title: 'Show 1'
        },
        {
            _id: '2',
            lastEpisode: {
                episode: 2,
                season: 1
            },
            lastWatched: 1,
            title: 'Show 2'
        }
    ];

    const dummyList2 = (
        <UserShowList
            accessToken="accessToken2"
            userId="2"
            userShows={shows}
        />
    );

    test('an empty shows list renders', () => {
        render(dummyList);
    });

    test('a non-empty shows list renders', () => {
        render(dummyList2);
    });

    test('a list of two shows drives two cards (images)', () => {
        render(dummyList2);
        const images = screen.getAllByRole('img');
        expect(screen.getAllByText('Show 1')).toHaveLength(1);
        expect(screen.getAllByText('Show 2')).toHaveLength(1);
        expect(images.length).toBe(2);
        // At this point there shouldn't be a header; use query (not get) to avoid error
        expect(screen.queryAllByRole('header')).toHaveLength(0);
    });

    test('clicking on a card opens a modal', () => {
        render(dummyList2);
        fireEvent(
            screen.getAllByRole('img')[0],
            new MouseEvent('click', {
                bubbles: true,
                cancelable: true
            })
        );
        expect(screen.getAllByRole('heading')).toHaveLength(1);
    });

    // Prep for screen-width tests
    const createMatchMedia = (width) => (query) => ({
        addListener: () => { },
        matches: mediaQuery.match(query, {
            width
        }),
        removeListener: () => { }
    });

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

});
