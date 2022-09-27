import { useLocation } from 'react-router-dom';
import './MoviesCard.css';

function MoviesCard({
  name,
  duration,
  thumbnail,
  trailerLink,
  savedMovies,
  onSave,
  onDelete,
  movie,
}) {
  const location = useLocation();
  let hours = Math.floor(duration / 60);
  let minutes = Math.floor(duration - hours * 60);
  const isSaved = savedMovies.some((m) => m.movieId === movie.id);

  let buttonClassName = isSaved
    ? 'movies-card__button movies-card__button_save'
    : 'movies-card__button';

  const handleSaveClick = () => {
    console.log(isSaved);
    if (isSaved) {
      onDelete(savedMovies.filter((m) => m.movieId === movie.id)[0]);
    } else {
      onSave(movie);
    }
  };

  const handleDeleteMovie = () => onDelete(movie);

  return (
    <li className='movie-card__item'>
      <a
        href={trailerLink}
        className='movie-card__trailer-link'
        target='_blank'
        rel='noreferrer'
      >
        <img src={thumbnail} alt={name} className='movie-card__image' />
      </a>

      <div className='movie-card__block'>
        <div className='movie-card__description'>
          <h3 className='movie-card__title'>{name}</h3>

          {location.pathname === '/movies' && (
            <button
              className={buttonClassName}
              type='button'
              onClick={handleSaveClick}
            ></button>
          )}
          {location.pathname === '/saved-movies' && (
            <button
              className='movies-card__button movies-card__button_delete'
              type='button'
              onClick={handleDeleteMovie}
            ></button>
          )}
        </div>
        <div className='movie-card__time'>
          {hours}ч{minutes}м
        </div>
      </div>
    </li>
  );
}

export default MoviesCard;
