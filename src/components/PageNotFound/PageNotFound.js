import './PageNotFound.css';

function PageNotFound() {
  return (
    <div className='page-not-found'>
      <div className='page-not-found__container'>
        <h2 className='page-not-found__title'>404</h2>
        <p className='page-not-found__text'>Страница не найдена</p>
        <a href='#' className='page-not-found__link'>
          Назад
        </a>
      </div>
    </div>
  );
}

export default PageNotFound;
