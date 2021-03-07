/* eslint-disable complexity */
/* eslint-disable no-extra-parens */
import ContentLoading from '../components/ContentLoading.jsx';
import Typography from '@material-ui/core/Typography';
import { useSession } from 'next-auth/client';
import useUser from '../lib/hooks/useUser';

const SWRTest = () => {
    const [session] = useSession();
    // eslint-disable-next-line no-underscore-dangle
    const { user, isLoading, isError } = useUser((session && session.accessToken) || null);

    return (
        <>
            <br />
            <hr />
            <Typography
                gutterBottom
                variant="h4"
            >
                SWR Testing
            </Typography>
            {/* If there's an error, show it */}
            { session && isError &&
                <Typography gutterBottom>ERROR in SWR (with session)</Typography> }
            {/* If there's no session, say so */}
            { !session &&
                <Typography gutterBottom>No session</Typography> }
            {/* If there's a session, show all the information */}
            { session &&
                <Typography
                    gutterBottom
                    variant="h6"
                >
                    From the useUser SWR hook
                </Typography> }
            {/* If the SWR is loading, show it */}
            { isLoading && <ContentLoading />}
            { session && <Typography>user: {'\u007B'}</Typography>}
            { session && user && <Typography>&nbsp;&nbsp;userId: {user.userId},</Typography> }
            { session && user &&
                <Typography>&nbsp;&nbsp;accessToken: {user.accessToken},</Typography> }
            { session && <Typography gutterBottom>{'\u007D'}</Typography> }
            { session &&
                <Typography
                    gutterBottom
                    variant="h6"
                >
                    From the nextauth session
                </Typography> }
            { session && <Typography gutterBottom>session: {'\u007B'}</Typography>}
            { session &&
                <Typography
                    gutterBottom
                >
                    &nbsp;&nbsp;accessToken: {session.accessToken},
                </Typography> }
            { session && <Typography>&nbsp;&nbsp;user: {'\u007B'}</Typography> }
            { session && Object.keys(session.user).map((key) => (
                <Typography
                    key={key}
                >
                    &nbsp;&nbsp;&nbsp;&nbsp;{key} : {session.user[key]},
                </Typography>
            )) }
            { session && <Typography gutterBottom>&nbsp;&nbsp;{'\u007D'}</Typography> }
            { session && <Typography gutterBottom>{'\u007D'}</Typography> }
        </>
    );
};

export default SWRTest;
