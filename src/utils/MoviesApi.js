import checkResponse from './checkResponse';
import { MOVIES_CATALOG_API_URL } from './config';

class MoviesApi {
  constructor({ url }) {
    this._url = url;
  }

  getAllMovies() {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);

    return fetch(this._url, { signal: controller.signal })
      .then(checkResponse)
      .catch((error) => {
        if (error.name === 'AbortError') {
          throw new Error('Каталог фильмов не ответил вовремя. Попробуйте ещё раз позже.');
        }
        throw error;
      })
      .finally(() => clearTimeout(timeout));
  }
}

const moviesApi = new MoviesApi({ url: MOVIES_CATALOG_API_URL });

export default moviesApi;
