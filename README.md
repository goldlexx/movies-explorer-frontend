# Movies Explorer — Frontend

The React client for Movies Explorer. Users can search a movie catalogue, register and sign in, and save movies to their account.

**Related project:** [Movies Explorer API](https://github.com/goldlexx/movies-explorer-api)

## Screenshot

![Movies Explorer landing page](screenshots/local-home.jpg)

The screenshot was captured from the local frontend. The interface text is in Russian.

## Features

- Registration, sign-in, and protected routes
- Movie search and short-film filtering
- Save and remove movies from a user's list
- Profile editing and responsive layouts

## Technologies

- React 18
- React Router 6
- Create React App (`react-scripts` 5)
- JavaScript and CSS

## Run locally

```bash
npm ci
npm start
```

The repository also defines `npm run build` to create a production build.

## API configuration

The movie catalogue service and the saved-movies API base URL are currently defined in the frontend source (`src/utils/MoviesApi.js` and `src/utils/MainApi.js`). They are not read from environment variables. The saved-movies API points to a legacy deployment that could not be verified, so local development may require updating the API URL in your local copy.

## Demo status

No live demo link is listed because the legacy frontend and API deployment could not be confirmed as working during this review.

## Verification

The production build completed. It reported existing React Hook dependency and anchor accessibility warnings.
