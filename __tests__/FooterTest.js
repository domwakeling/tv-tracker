/* eslint-disable no-magic-numbers */
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import Footer from '../components/layout/Footer.jsx';

describe('Testing Footer', () => {

    const today = new Date();

    if (today.getFullYear() !== 2021) {
        today.setFullYear(2021);
    }

    test('should show &copy;2021 if year is 2021', () => {
        jest.spyOn(global, 'Date').
            mockImplementationOnce(() => today);
        render(<Footer />);
        expect(screen.getAllByText('\u00a92021'));
    });

    test('should show &copy;2021-2022 if year is 2022', () => {
        today.setFullYear(2022);
        jest.spyOn(global, 'Date').
            mockImplementationOnce(() => today);
        render(<Footer />);
        expect(screen.getAllByText('\u00a92021-2022'));
    });

});
