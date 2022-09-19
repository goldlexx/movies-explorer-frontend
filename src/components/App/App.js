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
import mainApi from '../../utils/MainApi';
import './App.css';

function App() {
  const [allMovies, setAllMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFailed, setIsFailed] = useState(false);
  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [checked, setChecked] = useState(false);
  const [isNotFound, setIsNotFound] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState(
    localStorage.getItem('searchKeyword') || ''
  );
  const [filteredMovies, setFilteredMovies] = useState(
    JSON.parse(localStorage.getItem('filteredMovies')) || []
  );
  const [localCheckbox, setLocalCheckbox] = useState(
    JSON.parse(localStorage.getItem('checkbox')) || checked
  );

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

  useEffect(() => {
    mainApi
      .getSavedMovies()
      .then((savedMovies) => {
        setSavedMovies(savedMovies);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (filteredMovies) {
      setMovies(filteredMovies);
      setChecked(localCheckbox);
    }
  }, []);

  const handleSaveMovie = (movie) => {
    mainApi
      .addMovie(movie)
      .then((data) => {
        setSavedMovies([data, ...savedMovies]);
        localStorage.setItem(
          'savedMovies',
          JSON.stringify([data, ...savedMovies])
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDeleteMovie = (movie) => {
    const savedMovie = savedMovies.find(
      (item) => item.movieId === movie.movieId
    );
    mainApi
      .deleteMovie(savedMovie._id)
      .then(() => {
        const newMoviesList = savedMovies.filter(
          (item) => item._id !== savedMovie._id
        );
        setSavedMovies(newMoviesList);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChangeCheckbox = (evt) => {
    setChecked(!checked);
  };

  const searchMovies = (movies, name) => {
    return movies.filter((item) =>
      item.nameRU.toLowerCase().includes(name.toLowerCase())
    );
  };

  const handleSearchMovies = (name) => {
    setIsLoading(true);
    const searchArr = searchMovies(allMovies, name);
    setMovies(searchArr);
    setIsNotFound(!movies.length && !isFailed);
    localStorage.setItem('filteredMovies', JSON.stringify(searchArr));
    localStorage.setItem('searchKeyword', name);
    localStorage.setItem('checkbox', checked);
    setTimeout(() => setIsLoading(false), 1000);
  };

  const handleSearchSavedMovies = (name) => {
    setIsLoading(true);
    const searchArr = searchMovies(savedMovies, name);
    setSavedMovies(searchArr);
    setIsNotFound(!searchArr.length && !isFailed);
    setTimeout(() => setIsLoading(false), 1000);
  };

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
            savedMovies={savedMovies}
            onSave={handleSaveMovie}
            onDelete={handleDeleteMovie}
            localCheckbox={localCheckbox}
          ></Movies>
        }
      />
      <Route
        path='/saved-movies'
        element={
          <SavedMovies
            onSubmit={handleSearchSavedMovies}
            movies={movies}
            isLoading={isLoading}
            isFailed={isFailed}
            isNotFound={isNotFound}
            searchKeyword={searchKeyword}
            onCheckbox={handleChangeCheckbox}
            checked={checked}
            savedMovies={savedMovies}
            onSave={handleSaveMovie}
            onDelete={handleDeleteMovie}
          ></SavedMovies>
        }
      />
      <Route path='/profile' element={<Profile />} />
      <Route path='/signup' element={<Register />} />
      <Route path='/signin' element={<Login />} />
      <Route path='*' element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
