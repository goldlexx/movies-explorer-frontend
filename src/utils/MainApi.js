import checkResponse from './checkResponse';
import { MOVIE_ASSETS_BASE_URL, MOVIES_API_BASE_URL } from './config';

class MainApi {
  constructor({ url, assetsUrl }) {
    this._url = url;
    this._assetsUrl = assetsUrl;
  }

  _getAuthHeaders() {
    return {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('jwt') || ''}`,
    };
  }

  _getAssetUrl(path) {
    return path ? new URL(path, `${this._assetsUrl}/`).toString() : '';
  }

  getSavedMovies() {
    return fetch(`${this._url}/movies`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt') || ''}`,
      },
    }).then(checkResponse);
  }

  addMovie(movie) {
    return fetch(`${this._url}/movies`, {
      method: 'POST',
      headers: {
        ...this._getAuthHeaders(),
      },
      body: JSON.stringify({
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: this._getAssetUrl(movie.image?.url),
        trailerLink: movie.trailerLink,
        thumbnail: this._getAssetUrl(
          movie.image?.formats?.thumbnail?.url || movie.image?.url
        ),
        movieId: Number(movie.id),
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
      }),
    }).then(checkResponse);
  }

  deleteMovie(id) {
    return fetch(`${this._url}/movies/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt') || ''}`,
      },
    }).then(checkResponse);
  }


}

const mainApi = new MainApi({
  url: MOVIES_API_BASE_URL,
  assetsUrl: MOVIE_ASSETS_BASE_URL,
});

export default mainApi;
