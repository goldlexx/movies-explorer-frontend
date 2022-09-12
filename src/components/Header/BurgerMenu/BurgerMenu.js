import './BurgerMenu.css';

function BurgerMenu({ isOpen, isClose }) {
  return (
    <div className={`burger-menu ${isOpen && 'open'}`}>
      <div className='burger-menu__container'>
        <button
          className='burger-menu__close-icon'
          onClick={isClose}
          type='button'
        />
        <nav className='burger-menu__link-wrapper'>
          <a className='burger-menu__link' href='#'>Главная</a>
          <a className='burger-menu__link' href='#'>Фильмы</a>
          <a className='burger-menu__link' href='#'>Сохраненные фильмы</a>
        </nav>
        <button className='burger-menu__btn-profile' type='button' >
          Аккаунт
        </button>
      </div>
    </div>
  );
}

export default BurgerMenu;
