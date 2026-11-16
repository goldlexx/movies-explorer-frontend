import BurgerMenu from '../BurgerMenu/BurgerMenu';
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './MoviesHeader.css';

function MoviesHeader({ loggedIn }) {
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState('');
  const handleBurgerMenuOpenClick = () => setIsBurgerMenuOpen('open');
  const handleBurgerMenuCloseClick = () => setIsBurgerMenuOpen('');

  return (
    <>
      <nav className='navigate'>
        <ul className='navigate__list'>
          <li className='navigate__item'>
            <NavLink to='/movies' className='navigate__movies'>
              Фильмы
            </NavLink>
          </li>
          {loggedIn ? (
            <li className='navigate__item'>
              <NavLink to='/saved-movies' className='navigate__movies'>
                Сохранённые фильмы
              </NavLink>
            </li>
          ) : null}
        </ul>
        <Link to={loggedIn ? '/profile' : '/signin'} className='navigate__account'>
          {loggedIn ? 'Аккаунт' : 'Войти'}
        </Link>
      </nav>
      <button
        className='navigate__button-open'
        onClick={handleBurgerMenuOpenClick}
      ></button>
      <BurgerMenu
        isOpen={isBurgerMenuOpen}
        isClose={handleBurgerMenuCloseClick}
        loggedIn={loggedIn}
      ></BurgerMenu>
    </>
  );
}

export default MoviesHeader;
