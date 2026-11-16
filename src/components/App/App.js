import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import Profile from '../ProfileUser/Profile/Profile';
import Login from '../ProfileUser/Login/Login';
import Register from '../ProfileUser/Register/Register';
import SavedMovies from '../SavedMovies/SavedMovies';
import PageNotFound from '../PageNotFound/PageNotFound';
import ProtectedRoute from '../ProtectedRoute';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';

import { DEMO_MOVIES } from '../../data/demoMovies';
import mainApi from '../../utils/MainApi';
import * as apiAuth from '../../utils/ApiAuth';

import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import './App.css';

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [isErrorRegisterBtn, setIsErrorRegisterBtn] = useState(false);
  const [isRegisterMessage, setRegisterMessage] = useState(false);
  const [isLoginMessage, setLoginMessage] = useState(false);
  const [isErrorLoginBtn, setIsErrorLoginBtn] = useState(false);
  const [isAuthSubmitting, setIsAuthSubmitting] = useState(false);
  const [movieActionMessage, setMovieActionMessage] = useState('');
  const [movies, setMovies] = useState(DEMO_MOVIES);
  const [savedMovies, setSavedMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFailed, setIsFailed] = useState(false);
  const [checked, setChecked] = useState(true);
  const [checkedSaveMovies, setCheckedSaveMovies] = useState(true);
  const [isMessageProfile, setIsMessageProfile] = useState(false);
  const [isNotFound, setIsNotFound] = useState(false);
  const [allSavedMovies, setAllSavedMovies] = useState([]);

  const onSignOut = useCallback(() => {
    localStorage.clear();
    navigate('/');
    setLoggedIn(false);
    setCurrentUser({});
    setIsErrorRegisterBtn(false);
    setRegisterMessage(false);
    setLoginMessage(false);
    setIsErrorLoginBtn(false);
    setIsLoading(false);
    setIsFailed(false);
    setMovies([]);
    setSavedMovies([]);
    setAllSavedMovies([]);
    setChecked(true);
    setCheckedSaveMovies(true);
    setIsNotFound(false);
  }, [navigate]);

  const tokenCheck = useCallback(() => {
    const jwt = localStorage.getItem('jwt');
    if (!jwt) return;

    apiAuth
      .checkToken(jwt)
      .then((user) => {
        setCurrentUser(user);
        setLoggedIn(true);
      })
      .catch((err) => {
        if (err.status === 401) onSignOut();
        console.error(err);
      });
  }, [onSignOut]);

  useEffect(() => {
    tokenCheck();
  }, [tokenCheck]);

  useEffect(() => {
    if (loggedIn) {
      mainApi
        .getSavedMovies()
        .then((res) => {
          setSavedMovies(res);
          setAllSavedMovies(res);
          setIsFailed(false);
        })
        .catch((err) => {
          console.error('Saved movies could not be loaded:', err);
          setSavedMovies([]);
          setIsFailed(true);
        });
      const storedChecked = localStorage.getItem('checkbox');
      const storedSavedChecked = localStorage.getItem('checkboxSaveMovies');
      if (storedChecked !== null) setChecked(JSON.parse(storedChecked));
      if (storedSavedChecked !== null) setCheckedSaveMovies(JSON.parse(storedSavedChecked));
    }
  }, [loggedIn]);

  const handleSaveMovie = (movie) => {
    setMovieActionMessage('');
    mainApi
      .addMovie(movie)
      .then((data) => {
        setSavedMovies((current) => [data, ...current]);
        setAllSavedMovies((current) => [data, ...current]);
        setMovieActionMessage('Фильм сохранён.');
      })
      .catch((err) => {
        console.error(err);
        setMovieActionMessage('Не удалось сохранить фильм. Попробуйте ещё раз.');
      });
  };

  const handleDeleteMovie = (movie) => {
    const savedMovie = allSavedMovies.find(
      (item) => item.movieId === movie.movieId
    );

    if (!savedMovie) return;

    setMovieActionMessage('');
    mainApi
      .deleteMovie(savedMovie._id)
      .then(() => {
        setSavedMovies((current) => current.filter((item) => item._id !== savedMovie._id));
        setAllSavedMovies((current) => current.filter((item) => item._id !== savedMovie._id));
        setMovieActionMessage('Фильм удалён из сохранённых.');
      })
      .catch((err) => {
        console.error(err);
        setMovieActionMessage('Не удалось удалить фильм. Попробуйте ещё раз.');
      });
  };

  const handleChangeCheckbox = (evt) => {
    if (location.pathname === '/movies') {
      setChecked(!checked);
      localStorage.setItem('checkbox', !checked);
    } else if (location.pathname === '/saved-movies') {
      setCheckedSaveMovies(!checkedSaveMovies);
      localStorage.setItem('checkboxSaveMovies', !checkedSaveMovies);
    }
  };

  const searchMovies = (movies, name) => {
    const keyword = name.trim().toLowerCase();
    return movies.filter((item) =>
      [item.nameRU, item.nameEN]
        .filter((movieName) => typeof movieName === 'string')
        .some((movieName) => movieName.toLowerCase().includes(keyword))
    );
  };

  const handleSearchMovies = async (name) => {
    setIsLoading(false);
    setIsFailed(false);
    setIsNotFound(false);

    const searchArr = searchMovies(DEMO_MOVIES, name);
    setMovies(searchArr);
    setIsNotFound(searchArr.length === 0);
    localStorage.setItem('allMovies', JSON.stringify(DEMO_MOVIES));
    localStorage.setItem('filteredMovies', JSON.stringify(searchArr));
    localStorage.setItem('searchKeyword', name);
    localStorage.setItem('checkbox', JSON.stringify(checked));
  };

  useEffect(() => {
    if (location.pathname !== '/movies') return;

    setMovies(DEMO_MOVIES);
    setIsNotFound(false);
    setIsFailed(false);
    setIsLoading(false);
    localStorage.removeItem('allMovies');
    localStorage.removeItem('filteredMovies');
    localStorage.setItem('searchKeyword', '');
  }, [location.pathname]);

  const handleSearchSavedMovies = (name) => {
    setIsFailed(false);
    setIsNotFound(false);
    const searchArr = searchMovies(allSavedMovies, name);
    setSavedMovies(searchArr);
    setIsNotFound(searchArr.length === 0);
    localStorage.setItem('searchKeyword', name);
    localStorage.setItem('checkboxSaveMovies', JSON.stringify(checkedSaveMovies));
  };

  const onRegister = async (name, email, password) => {
    setIsAuthSubmitting(true);
    setRegisterMessage(false);
    try {
      await apiAuth.register(name, email, password);
      setIsErrorRegisterBtn(false);
      setIsAuthSubmitting(false);
      await onLogin(email, password);
    } catch (err) {
        if (err.status === 409) {
          setRegisterMessage('Пользователь с таким email уже зарегистрирован');
        } else if (err.status === 400) {
          setRegisterMessage('Проверьте корректность введённых данных.');
        } else {
          setRegisterMessage(err.message || 'При регистрации пользователя произошла ошибка.');
        }
        setIsErrorRegisterBtn(true);
    } finally {
      setIsAuthSubmitting(false);
    }
  };

  const onLogin = async (email, password) => {
    setIsAuthSubmitting(true);
    setLoginMessage(false);
    try {
      const res = await apiAuth.authorize(email, password);
      if (!res.token) throw new Error('Сервер не вернул токен авторизации.');
      localStorage.setItem('jwt', res.token);
      const user = await apiAuth.checkToken(res.token);
      setCurrentUser(user);
      setLoggedIn(true);
      setIsErrorLoginBtn(false);
      navigate('/movies');
    } catch (err) {
        if (err.status === 401) {
          setLoginMessage('Вы ввели неправильный логин или пароль.');
        } else {
          setLoginMessage(err.message || 'Не удалось войти. Проверьте подключение и попробуйте ещё раз.');
        }
        setIsErrorLoginBtn(true);
    } finally {
      setIsAuthSubmitting(false);
    }
  };

  const onUpdateUser = (name, email) => {
    apiAuth
      .updateUserInfo(name, email)
      .then((data) => {
        setIsMessageProfile(true);
        setCurrentUser(data);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setTimeout(() => setIsMessageProfile(false), 1000);
      });
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Routes>
        <Route path='/' element={<Main loggedIn={loggedIn} />} />
        <Route
          path='/movies'
          element={
            <Movies
              loggedIn={loggedIn}
              onSubmit={handleSearchMovies}
              movies={movies}
              isLoading={isLoading}
              isFailed={isFailed}
              isNotFound={isNotFound}
              searchKeyword={localStorage.getItem('searchKeyword')}
              onCheckbox={handleChangeCheckbox}
              checked={checked}
              checkedSaveMovies={checkedSaveMovies}
              savedMovies={savedMovies}
              onSave={handleSaveMovie}
              onDelete={handleDeleteMovie}
              allSavedMovies={allSavedMovies}
              actionMessage={movieActionMessage}
            />
          }
        />
        <Route
          path='/saved-movies'
          element={
            <ProtectedRoute loggedIn={loggedIn}>
              <SavedMovies
                onSubmit={handleSearchSavedMovies}
                movies={movies}
                isLoading={isLoading}
                isFailed={isFailed}
                isNotFound={isNotFound}
                searchKeyword={localStorage.getItem('searchKeyword')}
                onCheckbox={handleChangeCheckbox}
                checked={checked}
                checkedSaveMovies={checkedSaveMovies}
                savedMovies={savedMovies}
                onSave={handleSaveMovie}
                onDelete={handleDeleteMovie}
                allSavedMovies={allSavedMovies}
                actionMessage={movieActionMessage}
              ></SavedMovies>
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile'
          element={
            <ProtectedRoute loggedIn={loggedIn}>
              <Profile
                onUpdateUser={onUpdateUser}
                onSignOut={onSignOut}
                isMessageProfile={isMessageProfile}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path='/signup'
          element={
            <Register
              onRegister={onRegister}
              isErrorRegisterBtn={isErrorRegisterBtn}
              isRegisterMessage={isRegisterMessage}
              isSubmitting={isAuthSubmitting}
            />
          }
        />
        <Route
          path='/signin'
          element={
            <Login
              onLogin={onLogin}
              isLoginMessage={isLoginMessage}
              isErrorLoginBtn={isErrorLoginBtn}
              isSubmitting={isAuthSubmitting}
            />
          }
        />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </CurrentUserContext.Provider>
  );
}

export default App;
