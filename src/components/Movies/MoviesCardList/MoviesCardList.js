import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function MoviesCardList({ movies, isNotFound, isFailed }) {
  const [moviesToLoad, setMoviesToLoad] = useState(0);
  const [displayedMovies, setDisplayedMovies] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const location = useLocation();

  const handleShowMoreMovies = () => {
    setDisplayedMovies((movies) => movies + moviesToLoad);
  };

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleWindowResize);

    if (location.pathname === '/movies') {
      if (windowWidth <= 480) {
        setDisplayedMovies(5);
        setMoviesToLoad(2);
      } else if (windowWidth <= 990 && windowWidth > 480) {
        setDisplayedMovies(8);
        setMoviesToLoad(3);
      } else if (windowWidth <= 1280 && windowWidth > 990) {
        setDisplayedMovies(16);
        setMoviesToLoad(4);
      } else if (windowWidth > 1280) {
        setDisplayedMovies(16);
        setMoviesToLoad(4);
      }
    }
  }, [windowWidth, location]);

  let classTextNotFound = isNotFound
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

  return (
    <section className='movies-list'>
      <ul className='movies-list__container'>
        {movies.slice(0, displayedMovies).map((movie) => {
          return (
            <MoviesCard
              key={movie.id}
              name={movie.nameRU}
              duration={movie.duration}
              thumbnail={`https://api.nomoreparties.co/${movie.image.formats.thumbnail.url}`}
            />
          );
        })}
        <h2 className={classTextNotFound}>Ничего не найдено</h2>
        <h2 className={classTextError}>
          Во время запроса произошла ошибка. Возможно, проблема с соединением
          или сервер недоступен. Подождите немного и попробуйте ещё раз
        </h2>
      </ul>
      <button
        type='button'
        className={buttonStatus}
        onClick={handleShowMoreMovies}
      >
        Еще
      </button>
    </section>
  );
}

export default MoviesCardList;
