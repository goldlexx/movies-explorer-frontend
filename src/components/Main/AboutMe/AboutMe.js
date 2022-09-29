import './AboutMe.css';
import student from '../../../images/student.jpg';

function AboutMe() {
  return (
    <section className='student' id='student'>
      <div className='student__container'>
        <h2 className='student__title'>Студент</h2>
        <div className='student__block'>
          <div className='student__info'>
            <h3 className='student__name'>Руслан</h3>
            <p className='student__specialization'>
              Фронтенд-разработчик, 32 года
            </p>
            <p className='student__description'>
              Я живу в Москве, закончил факультет социальной работы в МосГУ.
              Начал обучение два года назад. Прошел большое количество курсов с
              Udemy, Youtube, Stepik. Параллельно читаю профильные книги и решаю
              задачи с CodeWars. В октябре 2022 года защитил диплом по программе
              фронтенд разработчик (Яндекс Практикум). На образование трачу все
              свободное время. Планирую продолжить свое развитие в этой сфере.
              Помимо обучения играю в компьютерные игры и люблю читать фэнтези.
            </p>
            <a
              className='student__github-link'
              href='https://github.com/goldlexx'
              target='_blank'
              rel='noreferrer'
            >
              Github
            </a>
          </div>
          <img className='student__photo' src={student} alt='Фото студента' />
        </div>
      </div>
    </section>
  );
}

export default AboutMe;
