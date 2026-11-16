import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { MOVIE_ASSETS_BASE_URL } from '../../../utils/config';
import {
  BREAKPOINT_1280,
  BREAKPOINT_990,
  BREAKPOINT_480,
  VISIBLE_MOVIES_5,
  VISIBLE_MOVIES_8,
  VISIBLE_MOVIES_12,
  VISIBLE_MOVIES_16,
  MOVIES_TO_LOAD_2,
  MOVIES_TO_LOAD_3,
  MOVIES_TO_LOAD_4,
} from '../../../utils/constants';

const getMovieThumbnail = (movie) => {
  const imagePath = typeof movie.image === 'string'
    ? movie.image
    : movie.image?.formats?.thumbnail?.url || movie.image?.url;
  return imagePath
    ? new URL(imagePath, `${MOVIE_ASSETS_BASE_URL}/`).toString()
    : '';
};

const getVisibleCount = (width) => width <= BREAKPOINT_480 ? VISIBLE_MOVIES_5
  : width <= BREAKPOINT_990 ? VISIBLE_MOVIES_8
    : width <= BREAKPOINT_1280 ? VISIBLE_MOVIES_12 : VISIBLE_MOVIES_16;
const getLoadCount = (width) => width <= BREAKPOINT_990 ? MOVIES_TO_LOAD_2
  : width <= BREAKPOINT_1280 ? MOVIES_TO_LOAD_3 : MOVIES_TO_LOAD_4;

function MoviesCardList({
  movies,
  isNotFound,
  isFailed,
  savedMovies,
  onSave,
  onDelete,
  checked,
  checkedSaveMovies,
  allSavedMovies,
  loggedIn,
  actionMessage,
}) {
  const [moviesToLoad, setMoviesToLoad] = useState(() => getLoadCount(window.innerWidth));
  const [displayedMovies, setDisplayedMovies] = useState(() => getVisibleCount(window.innerWidth));
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const location = useLocation();

  const handleShowMoreMovies = () => {
    setDisplayedMovies((movies) => movies + moviesToLoad);
  };

  const searchShortMovies = (movies) => {
    const searchShortMoviesArr = movies.slice(0);
    return searchShortMoviesArr.filter((item) => item.duration <= 40);
  };

  let saveMoviesFilterArr = !checkedSaveMovies
    ? searchShortMovies(savedMovies)
    : savedMovies;

  let moviesFilterArr = !checked ? searchShortMovies(movies) : movies;

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };

    if (location.pathname === '/movies') {
      setDisplayedMovies(getVisibleCount(windowWidth));
      setMoviesToLoad(getLoadCount(windowWidth));
    }

    window.addEventListener('resize', handleWindowResize);
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, [windowWidth, location.pathname]);

  let classTextError =
    isFailed && !isNotFound
      ? 'movies-list__error_visible'
      : 'movies-list__error';

  let buttonStatus =
    !(movies.length > 4) ||
    displayedMovies >= movies.length ||
    displayedMovies >= moviesFilterArr.length
      ? 'movies-list__button_hidden'
      : 'movies-list__button';

  let classTextNotFound =
    isNotFound && moviesFilterArr.length === 0
      ? 'movies-list__not-found_visible'
      : 'movies-list__not-found';

  let moviesBlock = location.pathname === '/movies';

  return (
    <section className='movies-list'>
      {actionMessage && <p className='movies-list__status' role='status'>{actionMessage}</p>}
      {moviesBlock ? (
        <>
          <ul className='movies-list__container'>
            {moviesFilterArr.slice(0, displayedMovies).map((movie) => {
              return (
                <MoviesCard
                  key={movie.id}
                  name={movie.nameRU}
                  duration={movie.duration}
                  trailerLink={movie.trailerLink}
                  thumbnail={getMovieThumbnail(movie)}
                  savedMovies={savedMovies}
                  onSave={onSave}
                  onDelete={onDelete}
                  movie={movie}
                  allSavedMovies={allSavedMovies}
                  loggedIn={loggedIn}
                />
              );
            })}
            <h2 className={classTextNotFound}>
              {moviesFilterArr.length === 0 ? 'Ничего не найдено' : ''}
            </h2>
            <h2 className={classTextError}>
              {moviesFilterArr.length === 0
                ? 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'
                : ''}
            </h2>
          </ul>
          <button
            type='button'
            className={buttonStatus}
            onClick={handleShowMoreMovies}
          >
            Еще
          </button>
        </>
      ) : (
        <ul className='movies-list__container'>
          {saveMoviesFilterArr.map((movie) => {
            return (
              <MoviesCard
                key={movie._id}
                name={movie.nameRU}
                duration={movie.duration}
                trailerLink={movie.trailerLink}
                thumbnail={movie.thumbnail}
                savedMovies={savedMovies}
                onSave={onSave}
                onDelete={onDelete}
                movie={movie}
                allSavedMovies={allSavedMovies}
                loggedIn={loggedIn}
              />
            );
          })}
          <h2 className={classTextNotFound}>
            {savedMovies.length === 0 ? 'Ничего не найдено' : ''}
          </h2>
          <h2 className={classTextError}>
            {savedMovies.length === 0
              ? 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'
              : ''}
          </h2>
        </ul>
      )}
    </section>
  );
}

export default MoviesCardList;
