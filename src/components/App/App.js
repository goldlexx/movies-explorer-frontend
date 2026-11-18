import Main from '../Main/Main';
import Login from '../ProfileUser/Login/Login';
import Register from '../ProfileUser/Register/Register';
import PageNotFound from '../PageNotFound/PageNotFound';
import ProtectedRoute from '../ProtectedRoute';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import { lazy, Suspense, useState, useEffect, useCallback, useRef } from 'react';

import { DEMO_MOVIES } from '../../data/demoMovies';
import mainApi from '../../utils/MainApi';
import * as apiAuth from '../../utils/ApiAuth';

import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import './App.css';

const Movies = lazy(() => import('../Movies/Movies'));
const SavedMovies = lazy(() => import('../SavedMovies/SavedMovies'));
const Profile = lazy(() => import('../ProfileUser/Profile/Profile'));

const getApiErrorMessage = (error, action) => {
  if (error.code === 'API_UNAVAILABLE') {
    return 'Нет ответа от API (возможны DNS, интернет или CORS). Не отправляйте регистрацию повторно сразу: запрос мог дойти до сервера. Сначала попробуйте войти или проверьте подключение.';
  }
  if (error.status === 409 && action === 'register') {
    return 'Пользователь с таким email уже зарегистрирован.';
  }
  if (error.status === 400) return 'Проверьте корректность введённых данных.';
  if (error.status === 401 && action === 'login') return 'Вы ввели неправильный логин или пароль.';
  if (error.status === 404) {
    return 'API не нашёл маршрут авторизации (404). Проверьте адрес сайта и повторите попытку позже.';
  }
  if (error.status >= 500) return 'Сервис авторизации временно недоступен. Попробуйте позже.';
  return error.message || 'Не удалось выполнить запрос. Проверьте подключение и попробуйте позже.';
};

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
  const [isSessionChecking, setIsSessionChecking] = useState(() => Boolean(localStorage.getItem('jwt')));
  const [sessionMessage, setSessionMessage] = useState('');
  const [movieActionMessage, setMovieActionMessage] = useState('');
  const [movies, setMovies] = useState(DEMO_MOVIES);
  const [savedMovies, setSavedMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFailed, setIsFailed] = useState(false);
  const [checked, setChecked] = useState(true);
  const [checkedSaveMovies, setCheckedSaveMovies] = useState(true);
  const [isNotFound, setIsNotFound] = useState(false);
  const [allSavedMovies, setAllSavedMovies] = useState([]);
  const sessionCheckStarted = useRef(false);

  const onSignOut = useCallback(() => {
    localStorage.clear();
    navigate('/');
    setLoggedIn(false);
    setCurrentUser({});
    setIsErrorRegisterBtn(false);
    setRegisterMessage(false);
    setLoginMessage(false);
    setIsErrorLoginBtn(false);
    setSessionMessage('');
    setIsLoading(false);
    setIsFailed(false);
    setMovies([]);
    setSavedMovies([]);
    setAllSavedMovies([]);
    setChecked(true);
    setCheckedSaveMovies(true);
    setIsNotFound(false);
  }, [navigate]);

  const tokenCheck = useCallback(async () => {
    const jwt = localStorage.getItem('jwt');
    if (!jwt) {
      setIsSessionChecking(false);
      return;
    }
    setIsSessionChecking(true);
    try {
      const user = await apiAuth.checkToken(jwt);
      setCurrentUser(user);
      setLoggedIn(true);
      setSessionMessage('');
    } catch (error) {
      if (error.status === 401) onSignOut();
      else setSessionMessage(`Не удалось восстановить сессию. ${getApiErrorMessage(error, 'session')}`);
    } finally {
      setIsSessionChecking(false);
    }
  }, [onSignOut]);

  useEffect(() => {
    if (sessionCheckStarted.current) return;
    sessionCheckStarted.current = true;
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

  const openSession = (token, user) => {
    localStorage.setItem('jwt', token);
    setCurrentUser(user);
    setLoggedIn(true);
    setIsErrorLoginBtn(false);
    navigate('/movies');
  };

  const onRegister = async (name, email, password) => {
    setIsAuthSubmitting(true);
    setRegisterMessage(false);
    try {
      const { token, ...user } = await apiAuth.register(name, email, password);
      setIsErrorRegisterBtn(false);
      if (token) {
        openSession(token, user);
        return true;
      }
      const signedIn = await onLogin(email, password);
      if (!signedIn) {
        setRegisterMessage('Регистрация прошла успешно, аккаунт создан. Не отправляйте форму повторно; попробуйте войти позже.');
        setIsErrorRegisterBtn(true);
      }
      return true;
    } catch (error) {
      setRegisterMessage(getApiErrorMessage(error, 'register'));
      setIsErrorRegisterBtn(true);
      return false;
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
      openSession(res.token, res.user || await apiAuth.checkToken(res.token));
      return true;
    } catch (error) {
      setLoginMessage(getApiErrorMessage(error, 'login'));
      setIsErrorLoginBtn(true);
      return false;
    } finally {
      setIsAuthSubmitting(false);
    }
  };

  const onUpdateUser = async (name, email) => {
    const user = await apiAuth.updateUserInfo(name, email);
    setCurrentUser(user);
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      {sessionMessage && (
        <div className='app__session-notice' role='alert'>
          <span>{sessionMessage}</span>
          <button type='button' onClick={() => setSessionMessage('')} aria-label='Закрыть сообщение'>×</button>
        </div>
      )}
      <Suspense fallback={<p role='status'>Загрузка…</p>}>
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
            <ProtectedRoute loggedIn={loggedIn} isChecking={isSessionChecking}>
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
            <ProtectedRoute loggedIn={loggedIn} isChecking={isSessionChecking}>
              <Profile
                onUpdateUser={onUpdateUser}
                onSignOut={onSignOut}
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
      </Suspense>
    </CurrentUserContext.Provider>
  );
}

export default App;
