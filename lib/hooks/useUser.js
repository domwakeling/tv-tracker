import fetcher from '../fetcher';
import useSWR from 'swr';

const useUser = (accessToken) => {

    if (!accessToken) {
        return {
            isError: true,
            isLoading: false,
            user: {}
        };
    }

    const { data, error } = useSWR(`/api/user/accesstoken/${accessToken}`, fetcher);

    return {
        isError: error,
        isLoading: !error && !data,
        user: data
    };
};

export default useUser;
