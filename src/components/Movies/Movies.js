import Header from '../Header/Header';
import MainMovies from '../Header/MoviesHeader/MoviesHeader';

import SearchForm from './SearchForm/SearchForm';
import Preloader from './Preloader/Preloader';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';


function Movies() {
  return (
    <>
      <Header>
        <MainMovies />
      </Header>
      <main className='movies'>
        <SearchForm/>
        <MoviesCardList/>
        <Footer/>
      </main>


    </>
  );
}

export default Movies;
