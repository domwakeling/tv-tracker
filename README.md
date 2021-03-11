# TV Tracker

![Vercel](http://therealsujitk-vercel-badge.vercel.app/?app=tv-tracker-app)

A personal project using Next.js and Material-UI.

## User 'auth' with NextAuth.js

Using the excellent [NextAuth.js](https://next-auth.js.org/) package which provides for non-password
sign-ins; set up to use GitHub and Twitter at present, although nothing to prevent adding other
providers. Documentation is good and (after kicking the wheels a bit) easy to understand.

To use: 

1. Install packages (need `mongodb` if using database to backend anything).

```
npm install --save next-auth mongodb
```

2. Add environment variables as necessary - see [the `next-auth`
example `.env.local` file](https://github.com/nextauthjs/next-auth-example/blob/main/.env.local.example).

3. Add an api route at `api/auth/[...nextauth].js` - which sets out the providers you are using.

4. If you want bespoke styling, you can either provide your own sign-in, sign-out and error pages,
or write a component - I've taken the latter approach, see `/components/SignInNextAuth.jsx`.

> Had intermittent issues with auth failing and a console log referring to MongoDB not
> being listed as an optional dependency. Following advice on the NextAuth GitHub page, have added a
> new `OptionalPeerDependcies` section in `package.json`, which *appears* to have fixed the issue.

## Persisting, and collating, user data on the client

Using [SWR](https://swr.vercel.app) (from Vercel, who also develop Next.js) to create a React Hook
to persist user data. SWR also provides a `mutate` function which essentially forces a call to the
Mongodb database to refresh user info.

In particular have followed the examples for [creating a custom React
hook](https://swr.vercel.app/getting-started#make-it-reusable), which is in `lib/hooks/useUser.js`.

## API for TV shows

Using the [Open Movie Database](http://www.omdbapi.com/) API &mdash; which appears to hold similar 
data to IMDb, but is available open source. I'm presently using the *absolutely free* version, which 
is rate-limited to 1,000 queries per day, but the developer uses Patreon and opens up much larger
rate limits (100,000 queries per day at £1/month, for instance).

Documentation is s touch sparse (for instance the main docs don't mention that there's a query
parameter `&season=<num>` to get a complete episode list for a given season of a given show) but
between the documents and the changelog there's enough there to work it out.

## Database structures

Data for the 'tv shows' side of the app is stored in a database called 'Shows'. This has two
collections, 'shows' and 'users'.

Structure for the users collection is:

```
_id: ObjectId,          // assigned in NextAuth and replicated in the shows db
shows: [                // array of objects representing each show the user has selected
  {
    _id: string,        // the imdbId for the show
    imageUrl: string,   // url for a poster, or N/A
    title: string,
    watched: [          // includes an array for each season ...
      [bools]           // ... which contain sub-arrays of true/false bools, one for each episode
    ]
  }
]
```

The high-level structure for the shows collection is:

```
_id: string,            // assigned in NextAuth and replicated in the shows db
seasonsInfo: {
  ...                   // information on each season, with full episode details
},
showInfo: {
  ...                   // information on the overall show
}
```

See `/data/dummySeasonInfo.js` for an example of the data that is held within the `seasonsInfo`  and
`shownfo` dictionaries.

## Summary of API routes

| Route  | Comment |
|--------|---------|
| `api/auth/` | |
| ` .../[...nextauth]` | Used by `nextauth.js` package |
| `api/shows/` | |
| ` .../getshowfromdb/[imdbid]` | Retrieves show info from Mongodb<sup>1</sup> |
| ` .../getshowinfo/[imdbid]` | Retrieves show info from OMDB<sup>2</sup> |
| ` .../saveshowtodb` | Save a show into Mongodb Shows database |
| ` ...search/[searchterm]` | Retrieves a search from OMDB<sup>3</sup> |
| `api/user/` | |
| ` .../accesstoken/[accesstoken]` | Uses session `accessToken` to get the user from Mongodb<sup>4</sup> |
| ` .../addshow` | Adds a show to a user in Mongodb Shows database |

**Footnotes**
1. In the form `{ show: {show-object} }`, or `{ show: null }` if not in the Mongodb
2. See `data/dummyShowInfo.js` for an example
3. Limited to ten results, see `data/dummsySearchinfo.js` from an example
4. Looks up `accessToken` in the Auth database, gets user _id, looks that up in the Shows database