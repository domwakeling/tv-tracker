/* eslint-disable new-cap */
import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

export default NextAuth({
    // A database is optional, but required to persist accounts in a database
    database: process.env.AUTH_DB_URL,

    // Configure one or more authentication providers
    providers: [
        Providers.GitHub({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
        }),
        Providers.Twitter({
            clientId: process.env.TWITTER_ID,
            clientSecret: process.env.TWITTER_SECRET
        })
    ]
});
