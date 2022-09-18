import Header from '../Header/Header';
import MainMovies from '../Header/MoviesHeader/MoviesHeader';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import SearchForm from '../Movies/SearchForm/SearchForm';

function SavedMovies() {
  return (
    <>
      <Header
        color={'header__theme_black'}
        location={'header__container_movies'}
      >
        <MainMovies />
      </Header>
      <main className='save-movies'>
        <SearchForm></SearchForm>
        <MoviesCardList></MoviesCardList>
      </main>
      <Footer></Footer>
    </>
  );
}

export default SavedMovies;
