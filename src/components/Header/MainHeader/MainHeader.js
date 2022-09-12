import './MainHeader.css';

function MainHeader() {
  return (
        <nav className='auth-links'>
          <ul className='auth-links__list'>
            <li className='auth-links__item'>
              <a href='#' className='auth-links__registration'>
                Регистрация
              </a>
            </li>
            <li className='auth-links__item'>
              <a href='#' className='auth-links__login'>
                Войти
              </a>
            </li>
          </ul>
        </nav>
  );
}

export default MainHeader;
