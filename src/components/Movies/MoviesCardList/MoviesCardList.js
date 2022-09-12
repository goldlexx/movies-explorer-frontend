import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import data from '../../../utils/data';
import { useState, useEffect } from 'react';

function MoviesCardList() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const windowSize = window.innerWidth;
    if (windowSize <= 320) {
      return setMovies(data.slice(0, 5));
    } else if (windowSize <= 768) {
      return setMovies(data.slice(0, 8));
    } else {
      return setMovies(data);
    }
  }, [data]);

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
      </ul>
      <button type='button' className='movies-list__button'>
        Еще
      </button>
    </section>
  );
}

export default MoviesCardList;
