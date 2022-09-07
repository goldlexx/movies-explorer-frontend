import './NavTab.css';

function NavTab() {
  return (
    <section className='navigation'>
      <nav className='navigation__container'>
        <ul className='navigation__list'>
          <li className='navigation__item'>
            <a href='#' className='navigation__link'>
              О проекте
            </a>
          </li>
          <li className='navigation__item'>
            <a href='#' className='navigation__link'>
              Технологии
            </a>
          </li>
          <li className='navigation__item'>
            <a href='#' className='navigation__link'>
              Студент
            </a>
          </li>
        </ul>
      </nav>
    </section>
  );
}

export default NavTab;
