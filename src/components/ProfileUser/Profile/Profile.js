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
  const { nameErr, emailErr } = controlInput.errors;
  const errorClassName = !controlInput.isValid
    ? 'profile__error profile__error_visible'
    : 'profile__error';

  const toggleInput = (e) => {
    e.preventDefault();
    setFeedback('');
    setIsEditInput((state) => !state);
  };

  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState('');
  const name = controlInput.values.name ?? currentUser.name;
  const email = controlInput.values.email ?? currentUser.email;
  const unchanged = name === currentUser.name && email === currentUser.email;

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (saving || unchanged) return;
    setSaving(true);
    try {
      await onUpdateUser(name, email);
      setIsEditInput(true);
      controlInput.resetForm();
      setFeedback('Изменения сохранены.');
    } catch {
      setFeedback('Не удалось сохранить изменения. Попробуйте ещё раз.');
    } finally {
      setSaving(false);
    }
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
                pattern='^[A-Za-zА-Яа-яЁё\s\x2d]+$'
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
                pattern='^[A-Za-z0-9_]+(([.]|-)?[A-Za-z0-9_]+)*@[A-Za-z0-9]+(([.]|-)?[A-Za-z0-9]+)*[.][A-Za-z]{2,}$'
                onChange={controlInput.handleChange}
                value={controlInput?.values?.email ?? currentUser.email}
                {...(!isEditInput ? {} : { disabled: true })}
              />
            </label>
            <span className={errorClassName}>{emailErr}</span>

            {!isEditInput && (
              <>
                <button
                  className='profile__button'
                  disabled={saving || unchanged || !controlInput.isValid}
                >
                  {saving ? 'Сохранение…' : 'Сохранить'}
                </button>
              </>
            )}
          </form>

          {feedback && <p role='status'>{feedback}</p>}
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
