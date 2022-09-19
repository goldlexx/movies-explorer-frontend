class MainApi {
  constructor({ url }) {
    this._url = url;
  }

  checkError(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  getSavedMovies() {
    return fetch(`${this._url}/movies`, {
      headers: {
        'Content-type': 'application/json',
        // 'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzI4MGZjN2YxN2MyNjc3MGFmYzc2ODAiLCJpYXQiOjE2NjM1Njk4ODAsImV4cCI6MTY2NDE3NDY4MH0.8iCICV3WwblFn_1Dw8HZ8JIcRzJI8-qByb5oxDdcq9E',
      },
    }).then((res) => {
      return this.checkError(res);
    });
  }

  addMovie(movie) {
    return fetch(`${this._url}/movies`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzI4MGZjN2YxN2MyNjc3MGFmYzc2ODAiLCJpYXQiOjE2NjM1Njk4ODAsImV4cCI6MTY2NDE3NDY4MH0.8iCICV3WwblFn_1Dw8HZ8JIcRzJI8-qByb5oxDdcq9E',
        // Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
      body: JSON.stringify({
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: `https://api.nomoreparties.co${movie.image.url}`,
        trailerLink: movie.trailerLink,
        thumbnail: `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`,
        movieId: movie.id.toString(),
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
      }),
    }).then((res) => {
      return this.checkError(res);
    });
  }

  deleteMovie(id) {
    return fetch(`${this._url}/movies/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzI4MGZjN2YxN2MyNjc3MGFmYzc2ODAiLCJpYXQiOjE2NjM1Njk4ODAsImV4cCI6MTY2NDE3NDY4MH0.8iCICV3WwblFn_1Dw8HZ8JIcRzJI8-qByb5oxDdcq9E',
        // 'Authorization': `Bearer ${localStorage.getItem('jwt')}`
      },
    }).then((res) => {
      return this.checkError(res);
    });
  }
}

const mainApi = new MainApi({
  url: 'https://api.movies.explorer.nomorepartiesxyz.ru',
});

export default mainApi;
