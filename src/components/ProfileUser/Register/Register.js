import './Register.css';
import { Link } from 'react-router-dom';
import { useFormWithValidation } from '../../../utils/hoocks/useFormWithValidation';

function Register({ onRegister, isErrorRegisterBtn, isRegisterMessage, isSubmitting }) {
  const controlInput = useFormWithValidation();
  const { name, email, password } = controlInput.errors;

  const errorClassName = !controlInput.isValid
    ? 'register__error register__error_visible'
    : 'register__error';

  const errorClassNameBtn = isErrorRegisterBtn
    ? 'register__error register__error_visible'
    : 'register__error';

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = controlInput.values;
    const registered = await onRegister(name, email, password);
    if (registered) controlInput.resetForm();
  };

  return (
    <>
      <main className='register'>
        <div className='register__container'>
          <header className='register__header'>
            <Link to='/' className='register__logo'></Link>
            <h2 className='register__title'>Добро пожаловать!</h2>
          </header>
          <form
            action='#'
            className='register__form'
            onSubmit={handleSubmit}
            noValidate
          >
            <fieldset className='register__content'>
              <label className='register__form-field'>
                <span className='register__label'>Имя</span>
                <input
                  type='text'
                  name='name'
                  placeholder='Имя'
                  autoComplete='off'
                  className='register__input'
                  minLength='5'
                  maxLength='40'
                  pattern='^[A-Za-zА-Яа-яЁё\s\x2d]+$'
                  onChange={controlInput.handleChange}
                  value={controlInput?.values?.name || ''}
                  required
                />
                <span className={errorClassName}>{name}</span>
              </label>

              <label className='register__form-field'>
                <span className='register__label'>E-mail</span>
                <input
                  type='email'
                  name='email'
                  placeholder='Email'
                  autoComplete='off'
                  className='register__input'
                  minLength='5'
                  maxLength='40'
                  pattern='^[A-Za-z0-9_]+(([.]|-)?[A-Za-z0-9_]+)*@[A-Za-z0-9]+(([.]|-)?[A-Za-z0-9]+)*[.][A-Za-z]{2,}$'
                  onChange={controlInput.handleChange}
                  value={controlInput?.values?.email || ''}
                  required
                />
                <span className={errorClassName}>{email}</span>
              </label>
              <label className='register__form-field'>
                <span className='register__label'>Пароль</span>
                <input
                  type='password'
                  name='password'
                  placeholder='Пароль'
                  autoComplete='off'
                  className='register__input'
                  minLength='5'
                  maxLength='40'
                  onChange={controlInput.handleChange}
                  value={controlInput?.values?.password || ''}
                  required
                />
                <span className={errorClassName}>{password}</span>
              </label>

              <span className={errorClassNameBtn}>{isRegisterMessage}</span>
              <button
                type='submit'
                className='register__submit-button'
                disabled={!controlInput.isValid || isSubmitting}
              >
                {isSubmitting ? 'Регистрируем…' : 'Зарегистрироваться'}
              </button>
            </fieldset>
          </form>

          <section className='question'>
            <p className='question__text'>Уже зарегистрированы?</p>
            <Link to='/signin' className='question__login'>
              Войти
            </Link>
          </section>
        </div>
      </main>
    </>
  );
}

export default Register;
