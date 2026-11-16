import loveActuallyPoster from '../images/demo-love-actually.svg';
import loveMonstersPoster from '../images/demo-love-monsters.svg';
import shapeOfWaterPoster from '../images/demo-shape-water.svg';
import grandHotelPoster from '../images/demo-grand-hotel.svg';
import inceptionPoster from '../images/demo-inception.svg';
import martianPoster from '../images/demo-martian.svg';
import whiplashPoster from '../images/demo-whiplash.svg';
import redBalloonPoster from '../images/demo-red-balloon.svg';

const createMovie = (movie, poster) => {
  const posterUrl = new URL(poster, window.location.origin).toString();

  return {
    ...movie,
    image: { url: posterUrl, formats: { thumbnail: { url: posterUrl } } },
    trailerLink: `https://www.youtube.com/results?search_query=${encodeURIComponent(`${movie.nameEN} trailer`)}`,
  };
};

export const DEMO_MOVIES = [
  createMovie({
    id: 900001,
    country: 'Великобритания',
    director: 'Ричард Кёртис',
    duration: 135,
    year: '2003',
    description: 'Романтическая комедия, действие которой разворачивается в Лондоне перед Рождеством.',
    movieId: 900001,
    nameRU: 'Реальная любовь',
    nameEN: 'Love Actually',
  }, loveActuallyPoster),
  createMovie({
    id: 900002,
    country: 'США',
    director: 'Майкл Мэттьюс',
    duration: 109,
    year: '2020',
    description: 'Приключенческий фильм о путешествии через мир, населённый монстрами.',
    movieId: 900002,
    nameRU: 'Любовь и монстры',
    nameEN: 'Love and Monsters',
  }, loveMonstersPoster),
  createMovie({
    id: 900003,
    country: 'США',
    director: 'Гильермо дель Торо',
    duration: 123,
    year: '2017',
    description: 'Фантастическая драма о необычной дружбе в лаборатории времён холодной войны.',
    movieId: 900003,
    nameRU: 'Форма воды',
    nameEN: 'The Shape of Water',
  }, shapeOfWaterPoster),
  createMovie({
    id: 900004,
    country: 'США, Германия',
    director: 'Уэс Андерсон',
    duration: 99,
    year: '2014',
    description: 'Комедийная история консьержа и его юного помощника в европейском отеле.',
    movieId: 900004,
    nameRU: 'Отель «Гранд Будапешт»',
    nameEN: 'The Grand Budapest Hotel',
  }, grandHotelPoster),
  createMovie({
    id: 900005,
    country: 'США, Великобритания',
    director: 'Кристофер Нолан',
    duration: 169,
    year: '2014',
    description: 'Научно-фантастическое путешествие команды исследователей через космос.',
    movieId: 900005,
    nameRU: 'Интерстеллар',
    nameEN: 'Interstellar',
  }, inceptionPoster),
  createMovie({
    id: 900006,
    country: 'США',
    director: 'Ридли Скотт',
    duration: 144,
    year: '2015',
    description: 'Астронавт пытается выжить на Марсе и связаться с Землёй.',
    movieId: 900006,
    nameRU: 'Марсианин',
    nameEN: 'The Martian',
  }, martianPoster),
  createMovie({
    id: 900007,
    country: 'США',
    director: 'Дэмьен Шазелл',
    duration: 107,
    year: '2014',
    description: 'Музыкальная драма о молодом барабанщике и требовательном преподавателе.',
    movieId: 900007,
    nameRU: 'Одержимость',
    nameEN: 'Whiplash',
  }, whiplashPoster),
  createMovie({
    id: 900008,
    country: 'Франция',
    director: 'Альбер Ламорис',
    duration: 34,
    year: '1956',
    description: 'Короткометражная история мальчика и красного воздушного шара на улицах Парижа.',
    movieId: 900008,
    nameRU: 'Красный шар',
    nameEN: 'The Red Balloon',
  }, redBalloonPoster),
];
