import './Profile.css';
import Header from '../../Header/Header';
import MainMovies from '../../Header/MoviesHeader/MoviesHeader';
import { useState } from 'react';

function Profile() {
  const [isEditInput, setIsEditInput] = useState(true);
  const toggleInput = (e) => {
    e.preventDefault();
    console.log(isEditInput);
    setIsEditInput((state) => !state);
  };

  return (
    <>
      <Header
        color={'header__theme_black'}
        location={'header__container_movies'}
      >
        <MainMovies />
      </Header>
      <main className='profile'>
        <div className='profile__container'>
          <h1 className='profile__title'>Привет, Виталий!</h1>
          <form className='profile__form'>
            <label className='profile__input-container'>
              <span className='profile__input-label'>Имя</span>
              <input
                type='text'
                className='profile__input'
                name='name'
                minLength='{2}'
                maxLength='{30}'
                required='{true}'
                placeholder='Виталий'
                {...(!isEditInput ? {} : { disabled: true })}
              />
            </label>
            <label className='profile__input-container'>
              <span className='profile__input-label'>E-mail</span>
              <input
                type='email'
                className='profile__input'
                name='email'
                required='{true}'
                placeholder='pochta@yandex.ru'
                {...(!isEditInput ? {} : { disabled: true })}
              />
            </label>
          </form>

          {isEditInput ? (
            <ul className='profile__list'>
              <li className='profile__item'>
                <button className='profile__edit' onClick={toggleInput}>
                  Редактировать
                </button>
              </li>
              <li className='profile__item'>
                <button className='profile__logout'>Выйти из аккаунта</button>
              </li>
            </ul>
          ) : (
            <button
              type='submit'
              className='profile__button'
              onClick={toggleInput}
            >
              Сохранить
            </button>
          )}
          {/* Если будет ошибка */}
          {/* <p className='profile__error-msg'>
            При обновлении профиля произошла ошибка.
          </p>
          <button
            type='submit'
            className='profile__button'
            onclick={toogleInput}
          >
            Сохранить
          </button> */}
        </div>
      </main>
    </>
  );
}

export default Profile;
