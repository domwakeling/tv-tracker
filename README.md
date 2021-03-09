# TV Tracker

![Vercel](http://therealsujitk-vercel-badge.vercel.app/?app=tv-tracker-app)

A personal project using Next.js and Material-UI.

## Adding next-auth

Install packages (need `mongodb` if using database to backend anything).

```
npm install --save next-auth mongodb
```

Add environment variables as necessary - see [the `next-auth`
example](https://github.com/nextauthjs/next-auth-example/blob/main/.env.local.example).

Add an api route at `api/auth/[...nextauth].js` - which sets out the providers you are using.

For this site I have written a custom sign-in form component, `SignInNextAuth.jsx`. Have **not**
(so far) written custom sign-in, sign-out or error pages (which are available, see documentation).

**NOTE** Have had intermittent issues with auth failing and a console log referring to MongoDB not
being listed as an optional dependency. Following advice on the NextAuth GitHub page, have added a
new `OptionalPeerDependcies` section in `package.json`, which *appears* to have fixed the issue.

## Persisting, and collating, user data on the client

Using SWR (from Vercel, who also develop Next.js) to create a React Hook for the user. Data is held
in the 'shows' database, structure is:

```
_id: ObjectId (assigned in NextAuth and replicated in the shows db),
shows: [
  {
    _id: Object Id (assigned using the show's imdbId),
  }
]
```
## Summary of API routes

| Route  | Comment |
|--------|---------|
| `api/auth/` | |
| ` .../[...nextauth]` | Used by `nextauth.js` package |
| `api/shows/` | |
| ` .../getshowfromdb/[imdbid]` | Retrieves show info from Mongodb<sup>1</sup> |
| ` .../getshowinfo/[imdbid]` | Retrieves show info from OMDB<sup>2</sup> |
| ` ...search/[searchterm]` | Retrieves a search from OMDB<sup>3</sup> |
| `api/user/` | |
| ` .../accesstoken/[accesstoken]` | Uses session `accessToken` to get the user from Mongodb<sup>4</sup> |

**Footnotes**
1. In the form `{ show: {show-object} }`, or `{ show: null }` if not in the Mongodb
2. See `data/dummyShowInfo.js` for an example
3. Limited to ten results, see `data/dummsySearchinfo.js` from an example
4. Looks up `accessToken` in the Auth database, gets user _id, looks that up in the Shows database