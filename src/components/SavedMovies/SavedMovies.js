import Header from '../Header/Header';
import MainMovies from '../Header/MoviesHeader/MoviesHeader';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import SearchForm from '../Movies/SearchForm/SearchForm';
import Preloader from '../Movies/Preloader/Preloader';
import './SavedMovies.css';

function SavedMovies({
  movies,
  onSubmit,
  isLoading,
  isFailed,
  isNotFound,
  searchKeyword,
  onCheckbox,
  checked,
  savedMovies,
  onSave,
  onDelete,
  allSavedMovies,
}) {
  return (
    <>
      <Header
        color={'header__theme_black'}
        location={'header__container_movies'}
      >
        <MainMovies />
      </Header>
      <main className='save-movies'>
        <SearchForm
          onSubmit={onSubmit}
          searchKeyword={searchKeyword}
          onCheckbox={onCheckbox}
          checked={checked}
        ></SearchForm>
        {isLoading ? (
          <Preloader />
        ) : (
          <MoviesCardList
            checked={checked}
            movies={movies}
            isNotFound={isNotFound}
            isFailed={isFailed}
            savedMovies={savedMovies}
            onSave={onSave}
            onDelete={onDelete}
            allSavedMovies={allSavedMovies}
          ></MoviesCardList>
        )}
      </main>
      <Footer></Footer>
    </>
  );
}

export default SavedMovies;
