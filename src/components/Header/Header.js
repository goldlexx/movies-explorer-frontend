import './Header.css';

function Header({ children }) {
  return (
    <header className='header'>
      <div className='header__container'>
        <a className='header__logo' href='#' />
        {children}
      </div>
    </header>
  );
}

export default Header;
