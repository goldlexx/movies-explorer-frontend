import checkResponse from './checkResponse';
import { MOVIES_CATALOG_API_URL } from './config';

class MoviesApi {
  constructor({ url }) {
    this._url = url;
  }

  getAllMovies() {
    return fetch(this._url).then(checkResponse);
  }
}

const moviesApi = new MoviesApi({ url: MOVIES_CATALOG_API_URL });

export default moviesApi;
