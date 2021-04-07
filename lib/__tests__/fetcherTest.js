/* eslint-disable no-magic-numbers */
/* eslint-disable no-underscore-dangle */
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import fetcher from '../fetcher';

jest.mock('axios');

describe('Testing fetcher', () => {

    const dummyData = {
        _id: '1',
        roles: {}
    };

    test('fetcher retrieves data', () => {
        axios.get.mockImplementation(() => Promise.resolve({ data: dummyData }));
        return fetcher('http://localhost:3000/anyurlyouwant').then((data) => {
            expect(data._id).toBe('1');
            expect(data.roles).toStrictEqual({});
        });
    });
});
