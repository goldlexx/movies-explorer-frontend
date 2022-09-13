import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import data from '../../../utils/data';
import { useState, useEffect } from 'react';

function MoviesCardList({ type, size }) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (size === 3) return setMovies(data.slice(0, 3));
    const windowSize = window.innerWidth;
    if (windowSize <= 320) {
      return setMovies(data.slice(0, 5));
    } else if (windowSize <= 768) {
      return setMovies(data.slice(0, 8));
    } else {
      return setMovies(data);
    }
  }, [data]);

  let hiddenButton = `movies-list__button ${
    type === 'save' ? 'movies-list__button_hidden' : ''
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
              type={type}
            />
          );
        })}
      </ul>
      <button type='button' className={hiddenButton}>
        Еще
      </button>
    </section>
  );
}

export default MoviesCardList;
