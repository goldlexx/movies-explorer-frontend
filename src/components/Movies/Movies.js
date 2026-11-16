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
  checkedSaveMovies,
  allSavedMovies,
  loggedIn,
}) {

  return (
    <>
      <Header
        color={'header__theme_black'}
        location={'header__container_movies'}
      >
        <MainMovies loggedIn={loggedIn} />
      </Header>
      <main className='movies'>
        <p className='service-preview' role='status'>
          Local demo catalog: sample movie data and original demo posters are bundled with this app. {loggedIn ? 'You can save these movies to your account.' : 'Sign in to save movies to your account.'}
        </p>
        <SearchForm
          onSubmit={onSubmit}
          searchKeyword={searchKeyword}
          onCheckbox={onCheckbox}
          checked={checked}
          checkedSaveMovies={checkedSaveMovies}
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
            checkedSaveMovies={checkedSaveMovies}
            allSavedMovies={allSavedMovies}
            loggedIn={loggedIn}
          />
        )}
      </main>

      <Footer />
    </>
  );
}

export default Movies;
