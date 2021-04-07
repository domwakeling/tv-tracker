/* eslint-disable max-statements */
/* eslint-disable no-extra-parens */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-magic-numbers */
/* eslint-disable no-import-assign */
import '@testing-library/jest-dom/extend-expect';
import useUser from '../hooks/useUser';

jest.mock('next-auth/client');

describe('Testing useUser', () => {

    test('no accessToken gives isError only', () => {
        const ret = useUser();
        expect(ret.isError).toBeTruthy();
        expect(ret.isLoading).toBeFalsy();
        expect(ret.user).toStrictEqual({});
    });

    // Testing for a valid response is donw in SWRTestTester
});
