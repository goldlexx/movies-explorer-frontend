import './AboutMe.css';
import student from '../../../images/student.jpg';

function AboutMe() {
  return (
    <section className='student'>
      <div className='student__container'>
        <h2 className='student__title'>Студент</h2>
        <div className='student__block'>
          <div className='student__info'>
            <h3 className='student__name'>Виталий</h3>
            <p className='student__specialization'>
              Фронтенд-разработчик, 30 лет
            </p>
            <p className='student__description'>
              Я родился и живу в Саратове, закончил факультет экономики СГУ. У
              меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь
              бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ
              Контур». После того, как прошёл курс по веб-разработке, начал
              заниматься фриланс-заказами и ушёл с постоянной работы.
            </p>
            <a className='student__github-link' href='#'>
              Github
            </a>
          </div>
          <img
            className='student__photo'
            src={student}
            alt='Фото студента'
          />
        </div>
      </div>
    </section>
  );
}

export default AboutMe;
