import Header from '../Header/Header';
import MainHeader from '../Header/MainHeader/MainHeader';
import Promo from '../Main/Promo/Promo';
import NavTab from '../Main/NavTab/NavTab';
import AboutProject from '../Main/AboutProject/AboutProject';
import Techs from '../Main/Techs/Techs';
import AboutMe from '../Main/AboutMe/AboutMe';
import Portfolio from '../Main/Portfolio/Portfolio';
import Footer from '../Footer/Footer';

function Main() {
  return (
    <main className='landing'>
      <Header
        color={'header__theme_blue'}
        location={'header__container_landing'}
      >
        <MainHeader />
      </Header>
      <Promo />
      <NavTab />
      <AboutProject />
      <Techs />
      <AboutMe />
      <Portfolio />
      <Footer />
    </main>
  );
}

export default Main;
