import Header from '../Header/Header';
import MainMovies from '../Header/MoviesHeader/MoviesHeader';
import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

function Movies() {
  return (
    <>
      <Header
        color={'header__theme_black'}
        location={'header__container_movies'}
      >
        <MainMovies />
      </Header>
      <main className='movies'>
        <SearchForm />
        <MoviesCardList />
        <Footer />

      </main>
    </>
  );
}

export default Movies;
