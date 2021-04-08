/* eslint-disable max-statements */
/* eslint-disable no-magic-numbers */
/* eslint-disable no-extra-parens */
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import SearchShowCard from '../search/SearchShowCard.jsx';
import dummySession from '../../../__mocks__/dummySession';
import { useSession } from 'next-auth/client';

jest.mock('next-auth/client');

describe('Testing UserShowCard', () => {

    // We should never get to see a search card without there being a session
    useSession.mockReturnValue([dummySession, false]);

    const defaultURL = 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png';
    const dummyURL = 'https://my-dummy-site.com/my-dummy-url.png';

    const dummyClickHandler = jest.fn();

    // Dummy card, user doesn't have, no imageUrl
    const dummyCard = (
        <SearchShowCard
            id="1"
            modalCloseHandler={dummyClickHandler}
            title="Dummy Show Title"
            userHas={false}
            userId="1"
        />
    );

    // Dummy card, user doesn't have, distinct imageUrl
    const dummyCard2 = (
        <SearchShowCard
            id="1"
            imageUrl={dummyURL}
            modalCloseHandler={dummyClickHandler}
            title="Dummy Show Title"
            userHas={false}
            userId="1"
        />
    );

    // Dummy card, user *does* have, no imageUrl
    const dummyCard3 = (
        <SearchShowCard
            id="1"
            modalCloseHandler={dummyClickHandler}
            title="Dummy Show Title"
            userHas
            userId="1"
        />
    );

    test('show.title passed to card', () => {
        const { getByText } = render(dummyCard);
        expect(getByText('Dummy Show Title')).toBeInTheDocument();
    });

    test('default image src used if no imageUrl', () => {
        render(dummyCard);
        const image = screen.getByRole('img');
        expect(image.src).toBe(defaultURL);
    });

    test('passed image src used if imageUrl', () => {
        render(dummyCard2);
        const image = screen.getByRole('img');
        expect(image.src).toBe(dummyURL);
    });

    test('button is disabled if userHas', () => {
        render(dummyCard3);
        const button = screen.getByRole('button');
        expect(button).toBeDisabled();
    });

    test('button is *not* disabled if userHas false', () => {
        render(dummyCard2);
        const button = screen.getByRole('button');
        expect(button).not.toBeDisabled();
    });

    // Integration testing at the Modal will check for interactions when clicked

});
