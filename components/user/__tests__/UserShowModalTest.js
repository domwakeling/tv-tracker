/* eslint-disable max-statements */
/* eslint-disable no-magic-numbers */
/* eslint-disable no-extra-parens */
/* eslint-disable no-empty-function */
/* eslint-disable function-paren-newline */
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render, screen } from '@testing-library/react';
import UserShowModal from '../portal/UserShowModal.jsx';

describe('Testing UserShowModal', () => {

    const onCloseHandler = jest.fn();

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
        }
    ];

    let openState = false;

    const dummyModal = (
        <UserShowModal
            accessToken="1"
            episodeHeightPref="250px"
            modalShowId={null}
            onCloseHandler={onCloseHandler}
            openState={openState}
            userId="1"
            userShows={shows}
        />
    );

    openState = true;

    const dummyModal2 = (
        <UserShowModal
            accessToken="1"
            episodeHeightPref="250px"
            modalShowId="1"
            onCloseHandler={onCloseHandler}
            openState={openState}
            userId="1"
            userShows={shows}
        />
    );

    test('modal not visible when openState is false', () => {
        render(dummyModal);
        expect(screen.queryAllByTestId('user-show-modal')).toHaveLength(0);
    });

    test('modal visible when openState is true', () => {
        render(dummyModal2);
        expect(screen.queryAllByTestId('user-show-modal')).toHaveLength(1);
    });

});
