import { useState } from 'react';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
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
            <a href='#' className='navigate__movies'>
              Фильмы
            </a>
          </li>
          <li className='navigate__item'>
            <a href='#' className='navigate__save-movies'>
              Сохранённые фильмы
            </a>
          </li>
        </ul>
        <a href='#' className='navigate__account'>
          Аккаунт
        </a>
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
