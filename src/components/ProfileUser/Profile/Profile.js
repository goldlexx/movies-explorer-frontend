import './Profile.css';
import Header from '../../Header/Header';
import MainMovies from '../../Header/MoviesHeader/MoviesHeader';
import { useState, useContext } from 'react';
import { useFormWithValidation } from '../../../utils/hoocks/useFormWithValidation';
import { CurrentUserContext } from '../../../contexts/CurrentUserContext';

function Profile({ onUpdateUser, onSignOut }) {
  const currentUser = useContext(CurrentUserContext);
  const [isEditInput, setIsEditInput] = useState(true);
  const controlInput = useFormWithValidation();
  const { name, email } = controlInput.errors;

  const errorClassName = !controlInput.isValid
    ? 'profile__error profile__error_visible'
    : 'profile__error';

  const toggleInput = (e) => {
    e.preventDefault();

    setIsEditInput((state) => !state);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email } = controlInput.values;
    onUpdateUser(name, email);
    setIsEditInput((state) => !state);
    controlInput.resetForm();
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
          <h1 className='profile__title'> Привет, {currentUser.name}</h1>
          <form className='profile__form' onSubmit={handleSubmit}>
            <label className='profile__input-container'>
              <span className='profile__input-label'>Имя</span>
              <input
                type='text'
                className='profile__input'
                name='name'
                minLength='5'
                maxLength='40'
                required='{true}'
                placeholder={currentUser.name}
                pattern='[A-Za-zА-Яа-яЁё\s-]+'
                onChange={controlInput.handleChange}
                value={controlInput?.values?.name || ''}
                {...(!isEditInput ? {} : { disabled: true })}
              />
            </label>
            <span className={errorClassName}>{name}</span>
            <label className='profile__input-container'>
              <span className='profile__input-label'>E-mail</span>
              <input
                type='email'
                className='profile__input'
                name='email'
                required='{true}'
                minLength='5'
                maxLength='40'
                placeholder={currentUser.email}
                pattern='^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$'
                onChange={controlInput.handleChange}
                value={controlInput?.values?.email || ''}
                {...(!isEditInput ? {} : { disabled: true })}
              />
            </label>
            <span className={errorClassName}>{email}</span>

            {!isEditInput && (
              <button
                className='profile__button'
                disabled={!controlInput.isValid}
              >
                Сохранить
              </button>
            )}
          </form>

          {isEditInput && (
            <ul className='profile__list'>
              <li className='profile__item'>
                <button className='profile__edit' onClick={toggleInput}>
                  Редактировать
                </button>
              </li>
              <li className='profile__item'>
                <button className='profile__logout' onClick={onSignOut}>Выйти из аккаунта</button>
              </li>
            </ul>
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
