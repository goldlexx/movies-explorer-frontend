import BurgerMenu from '../BurgerMenu/BurgerMenu';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './MoviesHeader.css';

function MoviesHeader() {
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState('');
  const handleBurgerMenuOpenClick = () => setIsBurgerMenuOpen('open');
  const handleBurgerMenuCloseClick = () => setIsBurgerMenuOpen('');

  return (
    <>
      <nav className='navigate'>
        <ul className='navigate__list'>
          <li className='navigate__item'>
            <Link to='/movies' className='navigate__movies'>
              Фильмы
            </Link>
          </li>
          <li className='navigate__item'>
            <Link to='/saved-movies' className='navigate__movies'>
              Сохранённые фильмы
            </Link>
          </li>
        </ul>
        <Link to='/profile' className='navigate__account'>
          Аккаунт
        </Link>
      </nav>
      <button
        className='navigate__button-open'
        onClick={handleBurgerMenuOpenClick}
      ></button>
      <BurgerMenu
        isOpen={isBurgerMenuOpen}
        isClose={handleBurgerMenuCloseClick}
      ></BurgerMenu>
    </>
  );
}

export default MoviesHeader;
