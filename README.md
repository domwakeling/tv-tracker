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

### Users

Structure for the users collection is:

```
_id: ObjectId,          // assigned in NextAuth and replicated in the shows db
roles: {                // object of key-value pairs ...
  [rolename]: bool      // ... being "rolename" and boolean
},
shows: [                // array of objects representing each show the user has selected
  {
    _id: string,        // the imdbId for the show
    imageUrl: string,   // url for a poster, or N/A (replicates Shows collection data)
    title: string,      // show title (replicates Shows collection data),
    episodes: [int],    // array of season-lengths
    lastEpisode: {
      season: int,      // season, as 1-based
      episode: int      // episode, as 1-based
    },
    lastWatched: date   // date of the last time the show object was updated
  }
]
```

When a user is retrieved from the database (using `api/user/accesstoken/[accesstoken]`), the object
that is retrieved includes another key, `showIds`, which is an unsorted array of the individual
`_id`s for all shows within the user's `shows` array. This is computed to avoid wasted storage or
potential data inconsistencies.

### Shows

The high-level structure for the shows collection is:

```
_id: string,            // assigned in NextAuth and replicated in the shows db
seasonsInfo: {
  ...                   // information on each season, with full episode details
},
showInfo: {
  ...                   // information on the overall show
},
showOver: boolean,      // optional; if set to true, app will never check for updates
updated: date           // optional* (but generally used), last time show info was checked/updated
```

See `/data/dummySeasonInfo.js` for an example of the data that is held within the `seasonsInfo`  and
`showInfo` dictionaries.

\* The `updated` field is now added by default, but may not exist on a db that has older records.

## Admin Tools

Admin tools are at `[home_url]/admin`.

To access the user tools a user must have an `admin: true` key-value pair in their `roles` (within
the `Shows` db and `users` collection, **not** the `UserAuth` db.

At present all users are assigned a "roles" value upon sign-up but this is left empty - to set up
the first `admin` user it is necessary to access the database and manually add the `admin: true`
key-value paid to a user.

At present the user-facing element of the site surfaces the `admin` page through a button at the
head of the `<UserPortal />` component. This would ideally sit in the `<Header />` component but
this led to issues when using a React hook and is currently abandoned (issue being that the
link/button should only be visible for those users **with** admin rights).

## Summary of API routes

| Route  | Method | Comment |
|--------|--------|---------|
| `api/auth/` | | |
| ` .../[...nextauth]` | | Used by `nextauth.js` package |
| `api/shows/` | | |
| ` .../checkshowinfo/[imdbid]` | `GET` | Checks Mongodb matches show info from OMDB <sup>1</sup>|
| ` .../getallshowsfromdb` | `POST` | Retrieves all shows from Mongodb (with pagination) |
| ` .../getshowfromdb/[imdbid]` | `GET` | Retrieves show info from Mongodb<sup>2</sup> |
| ` .../getshowinfo/[imdbid]` | `GET` | Retrieves show info from OMDB<sup>3</sup> |
| ` .../saveshowtodb` | `POST` | Save a show into Mongodb Shows database |
| ` ...search/[searchterm]` | `GET` | Retrieves a search from OMDB<sup>4</sup> |
| ` .../setshowover/[imdbid]` | `POST` | Sets show over (true/false passed in body) |
| `api/user/` | |
| ` .../accesstoken/[accesstoken]` | `GET` | Uses session `accessToken` to get the user from Mongodb<sup>5</sup> |
| ` .../addshow` | `POST` | Adds a show to a user in Mongodb Shows database |
| ` .../removeshow` | `POST` | Removes show from a user in Mongodb Shows database |
| ` .../updateshow` | `POST` | Updates show for a user in Mongodb Shows database |

**Footnotes**
1. If Mongodb doesn't match OMDB, (i) updates Mongodb's **shows** collection and then updates all
matching items in **users** collection &mdash; this is effectively to deal with new seasons
2. In the form `{ show: {show-object} }`, or `{ show: null }` if not in the Mongodb
3. See `data/dummyShowInfo.js` for an example
4. Limited to ten results, see `data/dummsySearchinfo.js` from an example
5. Looks up `accessToken` in the Auth database, gets user _id, looks that up in the Shows database

## Testing

The project uses [Jest](https://jestjs.io) and [React Testing Library](https://testing-library.com)
for tests.

At present tests **partly** cover the `components/user/portal` folder, with circa 80% coverage *for
files that are being tested* - but only circa 50% coverage of all 'business logic' and UI. The aim
is to expand this such that the `components` folder and (ideally) the `pages/api` folder are fully
covered, although the latter is dependent on working out how to properly mock a MongoDB back end.

Specifically (expanded as appropriate):

File                           | % Stmts | % Branch | % Funcs | % Lines 
-------------------------------|---------|----------|---------|---------
 `components/admin`            |       0 |        0 |       0 |       0 
 `components/layout`           |   80.77 |       75 |   55.56 |   80.77
 `...ContentLoading.jsx`       |     100 |      100 |     100 |     100
 `...Footer.jsx`               |     100 |       50 |     100 |     100
 `...Header.jsx`               |   58.33 |      100 |      20 |   58.33
 `...Layout.jsx`               |     100 |      100 |     100 |     100
 `...MyModal.jsx`              |     100 |      100 |     100 |     100
 `components/testing`          |     100 |    98.46 |     100 |     100
 `...SWRTest.jsx`              |     100 |    98.46 |     100 |     100
 `components/user`             |   83.33 |    83.33 |   66.67 |   83.33
 `...SignInNextAuth.jsx`       |   83.33 |    83.33 |   66.67 |   83.33
 `components/user/portal`      |   97.18 |     91.4 |   92.86 |   97.14
 `...UserPortal.jsx`           |   71.43 |    77.27 |      50 |   71.43
 `...UserShowCard.jsx`         |     100 |      100 |     100 |     100
 `...UserShowEpisode.jsx`      |     100 |      100 |     100 |     100
 `...UserShowList.jsx`         |     100 |      100 |     100 |     100
 `...UserShowModal.jsx`        |     100 |       95 |     100 |     100
 `...UserShowRemoveDialog.jsx` |     100 |      100 |     100 |     100
 `...UserShowUpdate.jsx`       |     100 |     87.5 |     100 |     100
 `components/user/search`      |      25 |    14.29 |      10 |      25
 `...SearchShowCard.jsx`       |    12.5 |        0 |       0 |    12.5
 `...SearchShowForm.jsx`       |      40 |      100 |       0 |      40
 `...SearchShowList.jsx`       |      40 |        0 |       0 |      40
 `...SearchShowModal.jsx`      |   30.77 |     37.5 |   33.33 |   30.77
 `lib`                         |     100 |      100 |     100 |     100
 `...constants.js`             |     100 |      100 |     100 |     100
 `...fetcher.js`               |     100 |      100 |     100 |     100
 `lib/hooks`                   |     100 |      100 |     100 |     100
 `...useUser.js`               |     100 |      100 |     100 |     100
 `pages`                       |      90 |      100 |   66.67 |     100
 `...about.jsx`                |     100 |      100 |     100 |     100
 `...index.jsx`                |    87.5 |      100 |      50 |     100
`pages/api`                    |       0 |        0 |       0 |       0 

## To Do

1. Complete the `checkshowinfo` end point - at present it does not know how to deal with additional
   seasons
1. Admin portal - list of shows, last updated
1. Admin portal - ability to update show, mark show as over (no further seasons)
1. `checkshowinfo` should also see whether there's a new show poster and if so change it?
1. Consider whether it's preferable/advisable to have a list of user `_id`s within each show so that
   we don't have to search for users who contain that show? Upside is making it easier to update
   info for those users, downside is that it introduces two sets of data and potential for clashes
1. Add pagination of shows (which could be a very long list) for the Admin portal, and consider
   doing the same for the User portal - at the moment its fine but what happens when you have 200
   shows in your list?
1. Also consider whether to have a 'recently watched' section (full size images) and then 'current'
   and 'watched' with ever-reducing card sizes?