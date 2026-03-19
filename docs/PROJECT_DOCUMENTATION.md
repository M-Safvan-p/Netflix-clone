# Netflix Clone Project Documentation

## 1. Project Overview

This project is a Netflix-style frontend built with React and Vite. It combines:

- Public marketing pages that imitate Netflix's landing experience
- Firebase Authentication for signup, login, logout, and session persistence
- TMDB (The Movie Database) as the movie content source
- Firestore as a per-user watchlist store
- Tailwind CSS plus a small amount of custom CSS for layout and effects

The application is structured as a client-side SPA. Routing is handled in the browser, API access is performed directly from the frontend, and authenticated users are redirected into a protected `/home` area that shows a hero banner, movie rows, modal details, trailer playback, and watchlist access.

At a high level, the system has 3 feature zones:

1. Public landing experience
2. Authentication flow
3. Logged-in browsing experience

## 2. Technology Stack

### Core runtime

- React 19
- React DOM 19
- Vite 7

React is used for UI composition and state management with hooks. Vite provides the dev server, build pipeline, ESM-based development flow, and fast refresh.

### Routing

- `react-router-dom` 7

Used for:

- Route definitions in `src/App.jsx`
- Protected navigation via `ProtectedRoute`
- Nested auth routes with `<Outlet />`
- Programmatic navigation using `useNavigate`
- Query-string prefill in signup using `useSearchParams`

### Styling

- Tailwind CSS 4
- `@tailwindcss/vite`
- Custom CSS files for highly specific UI pieces

Tailwind is used directly through utility classes. Only a few custom CSS files exist:

- `src/style/trending.css`
- `src/style/movieRows.css`
- `src/style/loading.css`

### Backend services used from the client

- Firebase App SDK
- Firebase Authentication
- Firebase Firestore
- TMDB REST API via Axios

Firebase provides identity and persistence. TMDB provides dynamic movie metadata, posters, backdrops, recommendations, and trailers.

### Icons

- `lucide-react`

Used for buttons, badges, and modal actions such as close, plus, thumbs-up, search, bell, and back navigation.

### Tooling

- ESLint 9 flat config

Linting is configured in `eslint.config.js`.

## 3. Build and Setup Architecture

### Vite configuration

File: `vite.config.js`

The app uses:

- React plugin for JSX and fast refresh
- Tailwind Vite plugin

This keeps the frontend setup minimal and standard for a Vite React project.

### Tailwind configuration

File: `tailwind.config.js`

The theme extends spacing with project-specific sizes:

- `65` => `16.25rem`
- `90` => `22.5rem`
- `160` => `40rem`
- `350` => `87.5rem`

These custom values support classes such as:

- `min-h-65`
- `h-90`
- `w-160`
- `max-w-350`

### Global CSS entry

File: `src/index.css`

The file only imports Tailwind:

```css
@import "tailwindcss";
```

This means most styling is pushed into component-level utility classes rather than a large global stylesheet.

## 4. Environment Variables

The application depends on the following Vite environment variables:

- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`
- `VITE_TMDB_API_KEY`

### Important note

The current workspace contains a committed `.env` file with real-looking service credentials. For a production-grade project, `.env` should not be committed. Instead:

- keep `.env` local
- commit `.env.example`
- rotate exposed credentials if they were published

This is a security and operations concern, not only a style issue.

## 5. Folder Structure and Responsibilities

### Root-level files

- `package.json`: dependencies and scripts
- `vite.config.js`: build tooling
- `tailwind.config.js`: Tailwind customization
- `eslint.config.js`: lint rules
- `.env`: runtime configuration

### `src/`

- `main.jsx`: application bootstrap
- `App.jsx`: route map
- `index.css`: Tailwind import

### `src/components/`

- `Auth/`: login/signup/protected-route logic
- `Common/`: shared UI primitives like `Input` and `Loader`
- `Home/`: authenticated browsing UI, rows, hero, details, watchlist
- `Landing/`: public marketing section components
- `layout/`: headers and footers
- `Movie/Trending/`: landing-page trending carousel and modal

### `src/context/`

- `AuthContext.js`: auth context object and hook
- `AuthProvider.jsx`: Firebase auth state bridge
- `watchContext.js`: playback visibility context
- `watchProvider.jsx`: provider for watch state

### `src/firebase/`

- `firebase.js`: Firebase app initialization
- `auth.js`: Firebase Auth instance
- `firestore.js`: Firestore instance

### `src/services/`

- `auth.service.js`: authentication actions
- `tmdb.service.js`: movie-fetching functions
- `db.service.js`: Firestore watchlist CRUD

### `src/pages/`

- `Home/Landing.jsx`: public homepage
- `Home/Home.jsx`: authenticated home page
- `Auth/Auth.jsx`: auth layout with nested outlet
- `watch/Watch.jsx`: fullscreen trailer player
- `watch/TrailerNotAvailable.jsx`: fallback when trailer is missing

### `src/utils/`

- `validateCredential.js`: email/password validation
- `FAQs.JS`: landing page FAQ content

## 6. Application Bootstrap Flow

File: `src/main.jsx`

The runtime initialization flow is:

1. Import global Tailwind CSS
2. Create React root with `createRoot`
3. Wrap app in `StrictMode`
4. Wrap app in `BrowserRouter`
5. Wrap app in `AuthProvider`
6. Render `App`

This means routing and authentication state are available throughout the tree.

### Missing wrapper in current branch

Several authenticated components use `useWatch()` from `watchContext`, but `main.jsx` does not wrap the app in `WatchProvider`. That means any rendered component calling `useWatch()` will read only the default context value rather than real shared state.

In practical terms, the current code intends to coordinate header visibility while a trailer is playing, but that coordination is not actually provider-backed in the current bootstrap.

## 7. Route Architecture

File: `src/App.jsx`

Defined routes:

- `/` => `Landing`
- `/auth` => `Auth`
- `/auth/login` => `Login`
- `/auth/signup` => `Signup`
- `/home` => `ProtectedRoute(Home)`

### Observations

- The app uses nested auth routing correctly.
- The authenticated browsing area currently exposes only one protected route: `/home`.
- There is no dedicated route for watchlist or trailer playback; those are modal/overlay driven.

## 8. Authentication System

### Firebase setup

Files:

- `src/firebase/firebase.js`
- `src/firebase/auth.js`

`initializeApp(firebaseConfig)` creates a Firebase app from environment variables. `getAuth(firebaseApp)` builds the Auth client used across the app.

### Auth service layer

File: `src/services/auth.service.js`

This file is a thin wrapper over Firebase Auth methods:

- `LoginService(email, password)`
- `SignUpService(email, password)`
- `LogoutService()`

The wrappers add almost no business logic; they mainly centralize SDK calls.

### Auth context

Files:

- `src/context/AuthContext.js`
- `src/context/AuthProvider.jsx`

`AuthProvider` is the real auth state coordinator:

- subscribes to `onAuthStateChanged`
- stores a lightweight `user` object containing `uid` and `email`
- stores `isLoading` while the auth observer resolves initial session state
- exposes `login`, `signup`, and `logout`

This is the key reason route protection can work without checking Firebase directly inside every page.

### Credential validation

File: `src/utils/validateCredential.js`

The helper validates:

- required email and password
- presence of `@` in the email
- minimum password length of 6
- trims and lowercases email

It throws a custom `AuthError` with a code.

### Login flow

File: `src/components/Auth/Login.jsx`

Flow:

1. User enters email and password
2. Local form validation runs
3. `login(email, password)` from auth context is called
4. `AuthProvider` forwards to Firebase service
5. On success, component navigates to `/home`
6. On failure, component maps Firebase-like error text into user-friendly messages

Notable detail:

- local password validation allows 4 to 60 characters
- shared credential validator requires at least 6

So the form and service-layer rules are inconsistent. A 4 or 5 character password can pass local UI validation but still fail in the provider.

### Signup flow

File: `src/components/Auth/SignUp.jsx`

Flow:

1. Optional email is prefilled from query params
2. User enters email, password, confirm password
3. Local validation checks password length and confirmation match
4. `signup(email, password)` is called
5. Firebase account is created
6. User is redirected to `/`

Observation:

- After signup, the app navigates back to the landing page instead of `/home`
- This is a UX choice, but many apps would redirect authenticated users directly to protected content

### Protected route behavior

File: `src/components/Auth/ProtectedRoute.jsx`

Logic:

- while auth is loading, show fullscreen loader
- if no user exists, redirect to `/auth/login`
- otherwise render children

This is the main access-control boundary in the SPA.

## 9. Public Landing Experience

### Landing page composition

File: `src/pages/Home/Landing.jsx`

The landing page is a vertically stacked marketing page with:

- fullscreen hero section
- public header
- CTA hero copy with email capture
- trending movie carousel
- reasons-to-join cards
- FAQ accordion
- footer

### Header switching design

File: `src/components/layout/Header.jsx`

This file appears intended to switch between public and protected headers based on auth state. However, the current implementation hardcodes:

```js
const user = false;
```

So it always renders `PublicHeader`.

This means the abstraction exists, but it is not connected to live auth context.

### Public header

File: `src/components/layout/PublicHeader.jsx`

Contains:

- Netflix logo
- language select UI
- sign-in button that navigates to `/auth/login`

The language selector is currently presentational only.

### Landing CTA hero

File: `src/components/Landing/HeroContent.jsx`

Behavior:

- stores email input locally
- validates email format
- redirects to `/auth/signup?email=...`

This is a classic funnel pattern:

- landing page captures intent
- signup form is prefilled

### Trending carousel

Files:

- `src/components/Movie/Trending/TrendingCarousel.jsx`
- `src/components/Movie/Trending/TrendingCard.jsx`
- `src/components/Movie/Trending/TrendingModal.jsx`

Flow:

1. `TrendingCarousel` fetches trending movies from TMDB service
2. Results are rendered as large poster cards
3. Clicking a card opens a modal
4. Modal shows poster/backdrop, year, rating, overview, and signup CTA

This is a public-content teaser, not an authenticated playback flow.

### Reasons and FAQ sections

Files:

- `src/components/Landing/ReasonCardSet.jsx`
- `src/components/Landing/ReasonCard.jsx`
- `src/components/Landing/FAQAccordion.jsx`
- `src/utils/FAQs.JS`

These are static content modules. They do not fetch data, and they exist to match the feel of Netflix's marketing site.

## 10. Authenticated Home Experience

### Page composition

File: `src/pages/Home/Home.jsx`

The home page contains:

- `HeroBanner`
- `MovieList`
- footer

This is the main logged-in browsing surface.

### Hero banner

File: `src/components/Home/HeroBanner.jsx`

Responsibilities:

- fetch one random movie via `getRandomMovie()`
- set fullscreen background from TMDB backdrop
- render `ProtectedHeader`
- render hero text/actions
- open details modal
- launch trailer player

State used:

- `movie`: featured hero movie
- `selectedMovie`: movie being shown in the detail modal
- `watchMovieId`: TMDB ID being played
- `isLoading`: hero fetch status

### Hero content

File: `src/components/Home/HeroContent.jsx`

Displays:

- title
- year
- vote average
- truncated overview
- `Play` button
- `More Info` button

This component is intentionally dumb: parent owns the state and passes button handlers down.

### Movie rows

Files:

- `src/components/Home/MovieList.jsx`
- `src/components/Home/MovieRow.jsx`
- `src/components/Home/MovieRowCard.jsx`

Flow:

1. `MovieList` fetches row data using `getAllMovieRows()`
2. Each row renders a title plus horizontally scrollable posters
3. Clicking a poster opens `MovieDetailModal`
4. Clicking play inside the modal opens the `Watch` overlay

This creates a Netflix-like browsing pattern with row-based discovery.

## 11. Movie Data Integration with TMDB

### Axios instance

File: `src/api/tmdb.js`

Centralizes:

- base URL: `https://api.themoviedb.org/3`
- API key from Vite env
- default language: `en-US`

This is the foundation of all TMDB access in the project.

### Service functions

File: `src/services/tmdb.service.js`

#### `getRandomMovie()`

- calls `/discover/movie`
- filters by original language `ml`
- randomizes page from 1 to 50
- keeps only movies with both poster and backdrop
- returns one random movie

This is used for the authenticated hero banner.

#### `getTrendingMovies(page = 2)`

- calls `/discover/movie`
- filters by original language `ml`
- sorts by popularity descending
- returns only movies with poster and backdrop

Important detail:

- despite the name, this is not TMDB's `/trending` endpoint
- it is closer to "popular Malayalam discovery results"

So the UI label "Trending Now" is not strictly identical to TMDB trending semantics.

#### `getRelatedMovies(movieId, page = 1)`

- calls `/movie/{id}/recommendations`
- filters missing posters/backdrops
- returns related movie array

This powers the "More Like This" section in the movie detail modal.

#### `getMovieVideos(movieId)`

- calls `/movie/{id}/videos`
- returns raw data

The watch page later filters this for official YouTube trailers.

#### `getAllMovieRows()`

Aggregates several requests:

- "New on Netflix" via `discover/movie`
- "Today's Top" via `/trending/movie/day`
- "Top Rated" via `/movie/top_rated`
- "Action" via `discover/movie` with genre 28
- "Popular" via `/movie/popular`

Each request is wrapped in its own `try/catch`, so partial failure does not kill the entire page.

This is a useful resilience pattern: rows can degrade independently.

### Regional and content strategy

Several queries intentionally target:

- Malayalam-language content via `with_original_language: "ml"`
- Indian watch region via `watch_region: "IN"`
- provider 8 in one query

This gives the app a region-specific catalog flavor rather than generic global TMDB results.

## 12. Movie Detail Modal System

File: `src/components/Home/MovieDetailModal.jsx`

This is one of the central interaction components in the authenticated area.

### Responsibilities

- show the selected movie
- load related movies dynamically
- load watchlist membership state
- allow playback launch
- allow adding to watchlist
- allow switching active movie from related results

### Internal state

- `activeMovie`
- `relatedMovies`
- `loading`
- `relatedError`
- `isListedToWatch`
- `backdropLoading`

### Interaction pattern

The component uses the clicked movie as initial state, then updates `activeMovie` if the user clicks a related movie card. That creates an in-modal drill-down flow without closing and reopening the modal.

This is a good example of local state being used as a state machine:

- initial movie
- fetch recommendations for current active movie
- swap active movie
- repeat

## 13. Trailer Playback Flow

Files:

- `src/pages/watch/Watch.jsx`
- `src/pages/watch/TrailerNotAvailable.jsx`

Flow:

1. A parent passes `tmdbId`
2. `Watch` fetches videos via `getMovieVideos`
3. It searches for a result where:
   - `site === "YouTube"`
   - `type === "Trailer"`
   - `official === true`
4. If found, it builds a YouTube embed URL
5. If not found, it renders the fallback page

This is not true first-party streaming. It is trailer playback via YouTube embedding.

### UI behavior

- fullscreen black overlay
- back button in upper left
- fullscreen iframe

## 14. Firestore Watchlist System

File: `src/services/db.service.js`

This service manages a per-user subcollection:

- `users/{uid}/watchlist/{movieId}`

### Data model

Stored fields:

- `movieId`
- `title`
- `posterPath`
- `mediaType`
- `addedAt`

This is intentionally a snapshot model, not a normalized relational structure. The app stores the minimum needed to render the watchlist without re-fetching TMDB first.

### Operations

#### `addToWatchlist(movie)`

- requires authenticated current user
- writes a document whose ID is the TMDB movie ID
- uses `serverTimestamp()` for ordering

#### `removeFromWatchlist(movieId)`

- deletes the watchlist doc for the current authenticated user

#### `isInWatchlist(movieId)`

- checks whether the document exists

#### `getWatchlist(uid)`

- queries the watchlist ordered by `addedAt desc`
- maps documents into plain objects

### Where watchlist is used

- `MovieDetailModal`
- `RelatedCard`
- `WatchlistModal`
- `ProtectedHeader`

### Current implementation issue

`WatchlistModal` calls:

```js
await removeFromWatchlist(user.uid, movieId);
```

But the service signature is:

```js
removeFromWatchlist(movieId)
```

So the modal passes an extra argument and the actual first argument becomes `user.uid`, not the movie ID. This means remove behavior is currently incorrect.

## 15. Context Design

### Auth context

This is a proper provider-backed shared state used throughout the app.

### Watch context

Files:

- `src/context/watchContext.js`
- `src/context/watchProvider.jsx`

Intent:

- track which movie is currently being watched
- hide the protected header while the watch overlay is active

Reality in current branch:

- provider exists
- hook exists
- multiple components use it
- root does not mount `WatchProvider`

So the conceptual design is valid, but integration is incomplete.

## 16. Component Design Patterns Used

### 1. Container + presentational split

Examples:

- `MovieList` fetches data, `MovieRow` renders a section
- `HeroBanner` owns logic, `HeroContent` renders text/actions
- `TrendingCarousel` owns fetch state, `TrendingCard` renders each item

### 2. Local modal state

Several features use local component state instead of route-driven overlays:

- trending modal
- movie details modal
- watchlist modal
- watch trailer overlay

This keeps the app simple but makes deep-linking impossible.

### 3. Thin services

Firebase and TMDB interactions are centralized in service files. This keeps UI components reasonably clean and makes data access patterns easier to trace.

### 4. Context only for cross-cutting state

Only auth and playback-visibility concerns are lifted globally. Most UI state remains local to the feature where it belongs.

## 17. Styling Strategy

### Tailwind-first approach

Most layout, spacing, color, and responsive behavior are defined inline in JSX with Tailwind utilities.

Advantages:

- fast iteration
- clear component-local styling
- minimal global CSS

Tradeoff:

- some JSX becomes visually dense
- repeated styles are not abstracted

### Custom CSS exceptions

#### `trending.css`

Used for:

- horizontal scrolling
- hover scaling
- card shadowing
- large rank index display

#### `movieRows.css`

Used for:

- horizontal scroll behavior
- scrollbar hiding

#### `loading.css`

Used for:

- centered spinner
- custom red Netflix-like loader animation

## 18. State and Data Flow Summary

### Public flow

1. User opens `/`
2. Landing page fetches public trending items
3. User enters email
4. User is redirected to signup with prefilled email

### Auth flow

1. Login/signup form validates locally
2. Auth context validates again
3. Firebase handles identity
4. `onAuthStateChanged` updates provider state
5. Protected route allows or denies entry

### Authenticated content flow

1. `/home` loads
2. Hero banner fetches one random movie
3. Movie list fetches multiple row datasets
4. User opens modal
5. Modal fetches recommendations
6. User optionally adds to watchlist
7. User optionally plays trailer

### Watchlist flow

1. User adds movie from detail modal or related card
2. Firestore stores snapshot under user document
3. Header opens watchlist modal
4. Modal queries Firestore and renders saved movies

## 19. Known Issues and Incomplete Areas

These are not theoretical concerns. They come directly from the current codebase state.

### Functional issues

1. `WatchProvider` is not mounted at the app root, so watch context is not truly shared.
2. `Header.jsx` hardcodes `user = false`, so it never reflects auth state.
3. `WatchlistModal` passes the wrong arguments to `removeFromWatchlist`, breaking deletion.
4. `ProtectedHeader` logs out through `LogoutService` directly instead of using the auth context's `logout`, which bypasses the provider abstraction.
5. Login form validation allows 4 to 60 characters, while shared validation requires minimum 6.

### UX / product issues

1. Many nav items in `ProtectedHeader` point to `"#"` and are placeholders only.
2. Language selectors are mostly non-functional presentation controls.
3. Signup redirects to `/` instead of the protected area.
4. Modal state is not reflected in URL, so users cannot deep-link or refresh back into the same movie/trailer.

### Code quality issues

1. Several files contain encoding artifacts like `â‚¹`, `â–¶`, and `Ã—`.
2. `FAQs.JS` uses an uppercase extension pattern inconsistent with the rest of the project.
3. `config/row.config.js` exists but is not currently used by `tmdb.service.js`.
4. There is debug logging in Firestore service methods.

### Verification status

- `npm.cmd run lint` currently fails with a `no-unused-vars` error in `src/components/Landing/ReasonCard.jsx`
- `npm.cmd run build` could not complete in this environment because Vite/esbuild process spawning hit `spawn EPERM`

The build failure here is environment-restricted, so it does not prove the app is unbuildable. The lint failure is a direct repo-level issue.

## 20. Security and Architecture Considerations

### Direct TMDB access from frontend

The TMDB API key is used directly in client-side requests. This is common in hobby/demo apps, but it means:

- the key is exposed to the browser
- rate limits are not protected by a backend
- request shaping and caching are client-controlled

For a production app, a backend proxy would be more robust.

### Firestore rules matter

The frontend assumes users can only access their own watchlist documents. That must be enforced in Firestore security rules. The client code alone is not enough to secure multi-user data.

### Firebase auth as source of truth

The provider design is correct in principle: session state should come from Firebase's auth observer, not from manual localStorage or route assumptions.

## 21. Suggested Improvement Roadmap

### High priority

1. Wrap the app with `WatchProvider` in `main.jsx`
2. Fix `removeFromWatchlist` call site in `WatchlistModal`
3. Connect `Header.jsx` to `useAuth()`
4. Make login and shared credential validation rules consistent
5. Replace committed `.env` with `.env.example`

### Medium priority

1. Route all logout behavior through auth context
2. Convert placeholder nav items into real routes or remove them
3. Use `ROW_CONFIG` to drive `getAllMovieRows()` declaratively
4. Normalize text encoding issues
5. Add error boundaries or more resilient user-facing error states

### Nice-to-have

1. Add deep-linkable movie detail pages
2. Add skeleton loaders for hero and rows
3. Add pagination or lazy-loading for rows
4. Add tests for auth validation and watchlist services
5. Add TypeScript or schema validation for API responses

## 22. Mental Model of How the Project Works

The simplest way to understand this codebase is:

- React renders the UI
- React Router chooses which page tree to show
- AuthProvider decides whether a user is logged in
- Firebase stores identity and watchlist records
- TMDB supplies all movie content
- Tailwind shapes the UI
- local component state controls overlays and modals

So this is primarily a frontend integration project:

- UI imitation layer
- third-party content integration layer
- Firebase-based identity/persistence layer

It is not a full Netflix backend clone. It is a client-side streaming-style experience built on external services.

## 23. File-by-File Reading Order for Future Maintenance

For someone new to the codebase, the best reading order is:

1. `src/main.jsx`
2. `src/App.jsx`
3. `src/context/AuthProvider.jsx`
4. `src/components/Auth/ProtectedRoute.jsx`
5. `src/pages/Home/Landing.jsx`
6. `src/pages/Home/Home.jsx`
7. `src/components/Home/HeroBanner.jsx`
8. `src/components/Home/MovieList.jsx`
9. `src/components/Home/MovieDetailModal.jsx`
10. `src/services/tmdb.service.js`
11. `src/services/db.service.js`
12. `src/firebase/*`

That order follows the real runtime dependency chain.

## 24. Final Summary

This project is a React + Vite Netflix-style SPA that combines:

- public marketing pages
- Firebase auth
- TMDB-powered content discovery
- Firestore watchlist persistence
- Tailwind-driven styling
- modal-based browsing and trailer playback

Its architecture is understandable and appropriate for a portfolio/demo application. The strongest parts are:

- clean separation between UI and service calls
- reasonable provider-based auth flow
- modular component organization
- resilient partial-loading strategy for movie rows

Its current weak points are:

- incomplete watch-context integration
- a broken watchlist remove path
- placeholder navigation
- committed secrets
- minor validation and code-quality inconsistencies

With those issues cleaned up, the app would be a solid small-to-medium frontend project showcasing routing, auth, third-party API integration, and basic per-user persistence.
