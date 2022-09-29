import './Profile.css';
import Header from '../../Header/Header';
import MainMovies from '../../Header/MoviesHeader/MoviesHeader';
import { useState, useContext } from 'react';
import { useFormWithValidation } from '../../../utils/hoocks/useFormWithValidation';
import { CurrentUserContext } from '../../../contexts/CurrentUserContext';

function Profile({ onUpdateUser, onSignOut, isMessageProfile }) {
  const currentUser = useContext(CurrentUserContext);
  const [isEditInput, setIsEditInput] = useState(true);
  const controlInput = useFormWithValidation();
  const { nameErr, emailErr } = controlInput.errors;
  const errorClassName = !controlInput.isValid
    ? 'profile__error profile__error_visible'
    : 'profile__error';

  const toggleInput = (e) => {
    e.preventDefault();
    setIsEditInput((state) => !state);
  };

  let disableUserCurrentCheck =
    (currentUser.name === controlInput?.values?.name &&
      typeof controlInput?.values?.email === 'undefined') ||
    (currentUser.email === controlInput?.values?.email &&
      typeof controlInput?.values?.email === 'undefined');

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email } = controlInput.values;
    if (!name) {
      onUpdateUser(currentUser.name, email);
    } else if (!email) {
      onUpdateUser(name, currentUser.email);
    } else {
      onUpdateUser(name, email);
    }
    setTimeout(() => setIsEditInput((state) => !state), 1000);
    controlInput.resetForm();
  };

  let classNameMessageBtn = isMessageProfile
    ? 'profile__button-msg'
    : 'profile__button-msg profile__button-msg_hidden';

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
          <form className='profile__form' onSubmit={handleSubmit} noValidate>
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
                value={controlInput?.values?.name ?? currentUser.name}
                {...(!isEditInput ? {} : { disabled: true })}
              />
            </label>
            <span className={errorClassName}>{nameErr}</span>
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
                value={controlInput?.values?.email ?? currentUser.email}
                {...(!isEditInput ? {} : { disabled: true })}
              />
            </label>
            <span className={errorClassName}>{emailErr}</span>

            {!isEditInput && (
              <>
                <span className={classNameMessageBtn}>
                  Изменение данных прошло успешно!
                </span>
                <button
                  className='profile__button'
                  disabled={disableUserCurrentCheck || !controlInput.isValid}
                >
                  Сохранить
                </button>
              </>
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
                <button className='profile__logout' onClick={onSignOut}>
                  Выйти из аккаунта
                </button>
              </li>
            </ul>
          )}
        </div>
      </main>
    </>
  );
}

export default Profile;
