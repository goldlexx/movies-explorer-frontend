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
    setChecked(true);
    setCheckedSaveMovies(true);
    setIsNotFound(false);
  }, [navigate]);

  const tokenCheck = useCallback(() => {
    const jwt = localStorage.getItem('jwt');
    if (!jwt) return;

    apiAuth
      .checkToken(jwt)
      .then((res) => {
        if (res) {
          setLoggedIn(true);
          navigate(location.pathname);
        }
      })
      .catch((err) => {
        onSignOut();
        console.error(err);
      });
  }, [location.pathname, navigate, onSignOut]);

  useEffect(() => {
    tokenCheck();
  }, [tokenCheck]);

  useEffect(() => {
    if (loggedIn) {
      mainApi
        .getSavedMovies()
        .then((res) => {
          setSavedMovies(res);
          setIsFailed(false);
        })
        .catch((err) => {
          console.error('Saved movies could not be loaded:', err);
          setSavedMovies([]);
          setIsFailed(true);
        });
      apiAuth
        .getUserInfo()
        .then((data) => {
          setCurrentUser(data);
        })
        .catch((err) => {
          console.error(`Данные пользователя не получены: ${err}`);
        });
      const storedChecked = localStorage.getItem('checkbox');
      const storedSavedChecked = localStorage.getItem('checkboxSaveMovies');
      if (storedChecked !== null) setChecked(JSON.parse(storedChecked));
      if (storedSavedChecked !== null) setCheckedSaveMovies(JSON.parse(storedSavedChecked));
    }
  }, [loggedIn]);

  const handleSaveMovie = (movie) => {
    mainApi
      .addMovie(movie)
      .then((data) => {
        setSavedMovies([data, ...savedMovies]);
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

  const handleSearchSavedMovies = async (name) => {
    setIsLoading(true);
    setIsFailed(false);
    setIsNotFound(false);

    try {
      const allMovies = await mainApi.getSavedMovies();
      const userMovies = allMovies.filter(
        (movie) => movie.owner === currentUser._id
      );
      const searchArr = searchMovies(userMovies, name);

      setAllSavedMovies(allMovies);
      setSavedMovies(searchArr);
      setIsNotFound(searchArr.length === 0);
      localStorage.setItem('checkboxSaveMovies', JSON.stringify(checkedSaveMovies));
    } catch (error) {
      console.error('Saved movie search failed:', error);
      setSavedMovies([]);
      setIsFailed(true);
    } finally {
      setIsLoading(false);
    }
  };

  const onRegister = (name, email, password) => {
    apiAuth
      .register(name, email, password)
      .then((data) => {
        if (data) {
          onLogin(email, password);
        }
        setIsErrorRegisterBtn(false);
      })
      .catch((err) => {
        if (err.status === 409) {
          setRegisterMessage('Пользователь с таким email уже зарегистрирован');
        } else if (err.status === 400) {
          setRegisterMessage('Проверьте корректность введённых данных.');
        } else {
          setRegisterMessage(err.message || 'При регистрации пользователя произошла ошибка.');
        }
        setIsErrorRegisterBtn(true);
      });
  };

  const onLogin = (email, password) => {
    apiAuth
      .authorize(email, password)
      .then((res) => {
        if (res.token) {
          localStorage.setItem('jwt', res.token);
          setIsErrorLoginBtn(false);
          apiAuth.checkToken(res.token).then((res) => {
            if (res) {
              setTimeout(() => navigate('/movies'), 800);
              setLoggedIn(true);
            }
          });
        }
      })
      .catch((err) => {
        if (err.status === 401) {
          setLoginMessage('Вы ввели неправильный логин или пароль.');
        } else {
          setLoginMessage('Не удалось войти. Проверьте подключение и попробуйте ещё раз.');
        }
        setIsErrorLoginBtn(true);
      });
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
            />
          }
        />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </CurrentUserContext.Provider>
  );
}

export default App;
