import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
// import data from '../../../utils/data';
import { useState } from 'react';

function MoviesCardList({ movies, isNotFound, isFailed }) {
  const [hiddenButton, setHiddenButton] = useState(true);

  let classTextNotFound = isNotFound
    ? 'movies-list__not-found_visible'
    : 'movies-list__not-found';

  let classTextError = isFailed && !isNotFound
    ? 'movies-list__error_visible'
    : 'movies-list__error';

  let buttonStatus = `movies-list__button ${
    hiddenButton && 'movies-list__button_hidden'
  }`;

  return (
    <section className='movies-list'>
      <ul className='movies-list__container'>
        {movies.map((movie) => {
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
      <button type='button' className={buttonStatus}>
        Еще
      </button>
    </section>
  );
}

export default MoviesCardList;
