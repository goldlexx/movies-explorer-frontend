import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
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
}) {
  const [moviesToLoad, setMoviesToLoad] = useState(0);
  const [displayedMovies, setDisplayedMovies] = useState(0);
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
      if (windowWidth <= BREAKPOINT_480) {
        setDisplayedMovies(VISIBLE_MOVIES_5);
        setMoviesToLoad(MOVIES_TO_LOAD_2);
      } else if (
        windowWidth <= BREAKPOINT_990 &&
        windowWidth > BREAKPOINT_480
      ) {
        setDisplayedMovies(VISIBLE_MOVIES_8);
        setMoviesToLoad(MOVIES_TO_LOAD_2);
      } else if (
        windowWidth <= BREAKPOINT_1280 &&
        windowWidth > BREAKPOINT_990
      ) {
        setDisplayedMovies(VISIBLE_MOVIES_12);
        setMoviesToLoad(MOVIES_TO_LOAD_3);
      } else if (windowWidth > BREAKPOINT_1280) {
        setDisplayedMovies(VISIBLE_MOVIES_16);
        setMoviesToLoad(MOVIES_TO_LOAD_4);
      }
    }

    window.addEventListener('resize', handleWindowResize);
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, [windowWidth, location]);

  let classTextNotFound =
    isNotFound && moviesFilterArr.length === 0
      ? 'movies-list__not-found_visible'
      : 'movies-list__not-found';

  let classTextError =
    isFailed && !isNotFound
      ? 'movies-list__error_visible'
      : 'movies-list__error';

  let buttonStatus =
    !(movies.length > 4) || displayedMovies >= movies.length
      ? 'movies-list__button_hidden'
      : 'movies-list__button';

  let moviesBlock = location.pathname === '/movies';

  return (
    <section className='movies-list'>
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
                  thumbnail={`https://api.nomoreparties.co/${movie.image.formats.thumbnail.url}`}
                  savedMovies={savedMovies}
                  onSave={onSave}
                  onDelete={onDelete}
                  movie={movie}
                  allSavedMovies={allSavedMovies}
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
