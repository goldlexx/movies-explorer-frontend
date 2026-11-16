const configuredMoviesApiUrl =
  process.env.REACT_APP_MOVIES_API_BASE_URL ||
  'https://movies-explorer-api.rustik-yuldashev.workers.dev';

export const MOVIES_API_BASE_URL = configuredMoviesApiUrl.replace(/\/+$/, '');

export const MOVIE_ASSETS_BASE_URL =
  process.env.REACT_APP_MOVIE_ASSETS_BASE_URL || 'https://api.nomoreparties.co';
