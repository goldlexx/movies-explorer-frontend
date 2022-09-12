import './MoviesCard.css';

function MoviesCard({ name, duration, thumbnail }) {

  let hours = Math.floor(duration / 60);
  let minutes = Math.floor(duration - hours * 60);

  return (
      <li className='movie-card__item'>
        <img src={thumbnail} alt={name} className='movie-card__image' />
        <div className='movie-card__block'>
          <div className='movie-card__description'>
            <h3 className='movie-card__title'>{name}</h3>
            <button
              className='movies-card__button'
              type='button'
            ></button>
          </div>
          <div className='movie-card__time'>{hours}ч{minutes}м</div>
        </div>
      </li>
  );
}

export default MoviesCard;
