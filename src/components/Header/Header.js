import './Header.css';

function Header() {
  return (
    <header className='header'>
      <div className='header__container'>
        <a className='header__logo' href='#' />
        <nav className='header__navigation'>
          <ul className='header__navigation-list'>
            <li className='header__navigation-item'>
              <a href='#' className='header__navigation-registration'>
                Регистрация
              </a>
            </li>
            <li className='header__navigation-item'>
              <a href='#' className='header__navigation-login'>
                Войти
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
