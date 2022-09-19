import Header from '../Header/Header';
import MainMovies from '../Header/MoviesHeader/MoviesHeader';
import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import Preloader from './Preloader/Preloader';
import Footer from '../Footer/Footer';
import './Movies.css';

function Movies({
  onSubmit,
  movies,
  isLoading,
  isFailed,
  isNotFound,
  searchKeyword,
  savedMovies,
  onSave,
  onDelete,
  onCheckbox,
  checked,
  localCheckbox
}) {


  return (
    <>
      <Header
        color={'header__theme_black'}
        location={'header__container_movies'}
      >
        <MainMovies />
      </Header>
      <main className='movies'>
        <SearchForm
          onSubmit={onSubmit}
          searchKeyword={searchKeyword}
          onCheckbox={onCheckbox}
          checked={checked}
          localCheckbox={localCheckbox}
        />

        {isLoading ? (
          <Preloader />
        ) : (
          <MoviesCardList
            movies={movies}
            isNotFound={isNotFound}
            isFailed={isFailed}
            searchKeyword={searchKeyword}
            savedMovies={savedMovies}
            onSave={onSave}
            onDelete={onDelete}
            onCheckbox={onCheckbox}
            checked={checked}
          />
        )}
      </main>

      <Footer />
    </>
  );
}

export default Movies;
