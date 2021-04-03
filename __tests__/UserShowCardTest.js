/* eslint-disable no-magic-numbers */
/* eslint-disable no-extra-parens */
/* eslint-disable no-empty-function */
/* eslint-disable function-paren-newline */
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import UserShowCard from '../components/user/portal/UserShowCard.jsx';

describe('Testing UserShowCard', () => {

    const defaultURL = 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png';
    const dummyURL = 'https://my-dummy-siite.com/my-dummy-url.png';

    const getPropsKey = (obj) => Object.keys(obj).filter((item) => item.match('Props'))[0];

    const dummyCard = (
        <UserShowCard
            clickHandler={() => { }}
            heightPref="250px"
            show={{
                _id: 1,
                title: 'Dummy title'
            }}
        />
    );

    const dummyCard2 = (
        <UserShowCard
            clickHandler={() => { }}
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

    test('default image src used', () => {
        render(dummyCard);
        const image = screen.getByRole('img');
        expect(image.src).toBe(defaultURL);
    });

    test('passed image src used', () => {
        render(dummyCard2);
        const image = screen.getByRole('img');
        expect(image.src).toBe(dummyURL);
    });

    test('passed height, 250px', () => {
        render(dummyCard);
        const image = screen.getByRole('img');
        const key = getPropsKey(image);
        expect(image[key].height).toBe('250px');
    });

    test('passed height, 350px', () => {
        render(dummyCard2);
        const image = screen.getByRole('img');
        const key = getPropsKey(image);
        expect(image[key].height).toBe('350px');
    });
});
