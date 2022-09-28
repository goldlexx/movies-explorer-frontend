import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import Profile from '../ProfileUser/Profile/Profile';
import Login from '../ProfileUser/Login/Login';
import Register from '../ProfileUser/Register/Register';
import SavedMovies from '../SavedMovies/SavedMovies';
import PageNotFound from '../PageNotFound/PageNotFound';
import ProtectedRoute from '../ProtectedRoute';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

import moviesApi from '../../utils/MoviesApi';
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
  const [allMovies, setAllMovies] = useState([]);
  const [movies, setMovies] = useState([]);
  const [allSavedMovies, setAllSavedMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [isFailed, setIsFailed] = useState(false);
  const [checked, setChecked] = useState(true);
  const [checkedSaveMovies, setCheckedSaveMovies] = useState(true);

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

  const [localCheckboxSaveMovies, setLocalCheckboxSaveMovies] = useState(
    JSON.parse(localStorage.getItem('checkboxSaveMovies')) || checkedSaveMovies
  );

    useEffect(() => {
      tokenCheck();
    }, []);

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
    if (loggedIn) {
      mainApi
        .getSavedMovies()
        .then((res) => {
          setSavedMovies(res);
        })
        .catch((err) => {
          console.log(err);
        });
      apiAuth
        .getUserInfo()
        .then((data) => {
          setCurrentUser(data);
        })
        .catch((err) => {
          console.error(`Данные пользователя не получены: ${err}`);
        });

      if (filteredMovies) {
        setMovies(filteredMovies);
        setChecked(localCheckbox);
        setCheckedSaveMovies(localCheckboxSaveMovies)
      }

    }
  }, [loggedIn, filteredMovies]);


  const tokenCheck = () => {
    const jwt = localStorage.getItem('jwt');

    if (jwt) {
      apiAuth
        .checkToken(jwt)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

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
    if (location.pathname === "/movies") {
      setChecked(!checked);
    } else if (location.pathname === "/saved-movies") {
      setCheckedSaveMovies(!checkedSaveMovies);
    }

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
    setFilteredMovies(searchArr);
    localStorage.setItem('searchKeyword', name);
    localStorage.setItem('checkbox', checked);
    setSearchKeyword(name);
    setTimeout(() => setIsLoading(false), 1000);
  };

  const handleSearchSavedMovies = (name) => {
    setIsLoading(true);
    mainApi
      .getSavedMovies()
      .then((movies) => {
        localStorage.setItem('checkboxSaveMovies', checkedSaveMovies);
        const userSavedMovies = movies.filter((movie) => {
          return movie.owner === currentUser._id;
        });
        const searchArr = searchMovies(userSavedMovies, name);
        setSavedMovies(searchArr);
        setIsNotFound(!searchArr.length && !isFailed);
        setTimeout(() => setIsLoading(false), 1000);
      })
      .catch((err) => console.log(err));

    const searchArr = searchMovies(allSavedMovies, name);

    setSavedMovies(searchArr);
    setIsNotFound(!searchArr.length && !isFailed);
    setTimeout(() => setIsLoading(false), 1000);
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
        err.status !== 400
          ? setRegisterMessage('Пользователь с таким email уже зарегистрирован')
          : setRegisterMessage(
              'При регистрации пользователя произошла ошибка.'
            );
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
        if (err.includes(401)) {
          setLoginMessage('Вы ввели неправильный логин или пароль.');
        }
        setIsErrorLoginBtn(true);
      });
  };

  const onUpdateUser = (name, email) => {
    apiAuth
      .updateUserInfo(name, email)
      .then((data) => {
        console.log(data);
        setCurrentUser(data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const onSignOut = () => {
    localStorage.clear();
    navigate('/');
    setLoggedIn(false);
    setCurrentUser({});
    setIsErrorRegisterBtn(false);
    setRegisterMessage(false);
    setLoginMessage(false);
    setIsErrorLoginBtn(false);
    setAllMovies([]);
    setIsLoading(false);
    setIsFailed(false);
    setMovies([]);
    setSavedMovies([]);
    setChecked(true);
    setCheckedSaveMovies(true);
    setIsNotFound(false);
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Routes>
        <Route path='/' element={<Main loggedIn={loggedIn} />} />
        <Route
          path='/movies'
          element={
            <ProtectedRoute loggedIn={loggedIn}>
              <Movies
                onSubmit={handleSearchMovies}
                movies={movies}
                isLoading={isLoading}
                isFailed={isFailed}
                isNotFound={isNotFound}
                searchKeyword={searchKeyword}
                onCheckbox={handleChangeCheckbox}
                checked={checked}
                checkedSaveMovies={checkedSaveMovies}
                savedMovies={savedMovies}
                onSave={handleSaveMovie}
                onDelete={handleDeleteMovie}
                localCheckbox={localCheckbox}
                allSavedMovies={allSavedMovies}
              ></Movies>
            </ProtectedRoute>
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
                searchKeyword={searchKeyword}
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
              <Profile onUpdateUser={onUpdateUser} onSignOut={onSignOut} />
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
