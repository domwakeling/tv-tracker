/* eslint-disable max-statements */
/* eslint-disable no-magic-numbers */
/* eslint-disable no-extra-parens */
/* eslint-disable no-empty-function */
/* eslint-disable function-paren-newline */
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render, screen } from '@testing-library/react';
import UserShowCard from '../portal/UserShowCard.jsx';

describe('Testing UserShowCard', () => {

    const defaultURL = 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png';
    const dummyURL = 'https://my-dummy-siite.com/my-dummy-url.png';

    const dummyClickHandler = jest.fn();

    const dummyCard = (
        <UserShowCard
            clickHandler={dummyClickHandler}
            heightPref="250px"
            show={{
                _id: 1,
                title: 'Dummy title'
            }}
        />
    );

    const dummyCard2 = (
        <UserShowCard
            clickHandler={dummyClickHandler}
            heightPref="350px"
            show={{
                _id: 2,
                imageUrl: dummyURL,
                title: 'Dummy title'
            }}
        />
    );

    test('show.title passed to card', () => {
        const { getByText } = render(dummyCard);
        expect(getByText('Dummy title')).toBeInTheDocument();
    });

    test('default image src used if no show.imageUrl', () => {
        render(dummyCard);
        const image = screen.getByRole('img');
        expect(image.src).toBe(defaultURL);
    });

    test('passed image src used if show.imageUrl', () => {
        render(dummyCard2);
        const image = screen.getByRole('img');
        expect(image.src).toBe(dummyURL);
    });

    test('passed height used, 250px', () => {
        render(dummyCard);
        const image = screen.getByRole('img');
        expect(image).toHaveAttribute('height', '250px');
    });

    test('passed height used, 350px', () => {
        render(dummyCard2);
        const image = screen.getByRole('img');
        expect(image).toHaveAttribute('height', '350px');
    });

    test('clicking a card triggers the handler', () => {
        render(dummyCard);
        fireEvent(
            screen.getByRole('img'),
            new MouseEvent('click', {
                bubbles: true,
                cancelable: true
            })
        );
        expect(dummyClickHandler.mock.calls.length).toBe(1);
    });

    test('clicking another card triggers the same handler', () => {
        render(dummyCard2);
        fireEvent(
            screen.getByRole('img'),
            new MouseEvent('click', {
                bubbles: true,
                cancelable: true
            })
        );
        expect(dummyClickHandler.mock.calls.length).toBe(2);
    });

    test('handler should have been sent the show._ids', () => {
        expect(dummyClickHandler.mock.calls[0][1]).toBe(1);
        expect(dummyClickHandler.mock.calls[1][1]).toBe(2);
    });
});
