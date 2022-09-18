import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import Profile from '../ProfileUser/Profile/Profile';
import Login from '../ProfileUser/Login/Login';
import Register from '../ProfileUser/Register/Register';
import SavedMovies from '../SavedMovies/SavedMovies';
import PageNotFound from '../PageNotFound/PageNotFound';
import { Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';

import moviesApi from '../../utils/MoviesApi';
import './App.css';

function App() {
  const [allMovies, setAllMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFailed, setIsFailed] = useState(false);
  const [movies, setMovies] = useState([]);
  const [isNotFound, setIsNotFound] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState(
    localStorage.getItem('searchKeyword') || ''
  );
  const [filteкMovies, setFilterMovies] = useState(
    JSON.parse(localStorage.getItem('filterMovies')) || []
  );
  const [checked, setChecked] = useState(false);

  // Функции по поиску фильмов
  const searchMovies = (movies, name) => {
    return movies.filter((m) =>
      m.nameRU.toLowerCase().includes(name.toLowerCase())
    );
  };

  // Поиск короткометражны фильмов
  const searchShortMovies = (movies) => {
    return movies.filter((item) => item.duration <= 40);
  };

  // Поиск фильмов в зависимости от ползунка
  const filterMovies = (movies, name, checked) => {
    if (checked) {
      const filterMovies = searchShortMovies(movies);
      return searchMovies(filterMovies, name);
    } else {
      return searchMovies(filterMovies, name);
    }
  };

  const handleSearchMovies = (name) => {
    setIsLoading(true);
    const newMovies = searchMovies(allMovies, name);

    localStorage.setItem('searchKeyword', name);
    setSearchKeyword(name);

    setIsNotFound(!newMovies.length && !isFailed);
    setMovies(newMovies);
    setTimeout(() => setIsLoading(false), 1000);
  };

  const handleChangeCheckbox = (evt) => {
    setChecked(!checked);
  };

  useEffect(() => {
    moviesApi
      .getAllMovies()
      .then((movies) => {
        setAllMovies(movies);
      })
      .catch((err) => {
        setIsFailed(true);
        console.log(err);
      });
  }, []);

  return (
    <Routes>
      <Route path='/' element={<Main />} />
      <Route
        path='/movies'
        element={
          <Movies
            onSubmit={handleSearchMovies}
            movies={movies}
            isLoading={isLoading}
            isFailed={isFailed}
            isNotFound={isNotFound}
            searchKeyword={searchKeyword}
            onCheckbox={handleChangeCheckbox}
            checked={checked}
          ></Movies>
        }
      />
      <Route path='/saved-movies' element={<SavedMovies />} />
      <Route path='/profile' element={<Profile />} />
      <Route path='/signup' element={<Register />} />
      <Route path='/signin' element={<Login />} />
      <Route path='*' element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
