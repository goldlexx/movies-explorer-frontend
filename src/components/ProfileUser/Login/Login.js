import './Login.css';
import { Link } from 'react-router-dom';
import { useFormWithValidation } from '../../../utils/hoocks/useFormWithValidation';

function Login({ onLogin, isLoginMessage, isErrorLoginBtn }) {
  const controlInput = useFormWithValidation();
  const { email, password } = controlInput.errors;
  const errorClassName = !controlInput.isValid
    ? 'login__error login__error_visible'
    : 'login__error';

  const errorClassNameBtn = isErrorLoginBtn
    ? 'login__error login__error_visible'
    : 'login__error';

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = controlInput.values;
    onLogin(email, password);
    controlInput.resetForm();
  };

  return (
    <>
      <main className='login'>
        <div className='login__container'>
          <header className='login__header'>
            <Link to='/' className='login__logo'></Link>
            <h2 className='login__title'>Рады видеть!</h2>
          </header>
          <form
            action='#'
            className='login__form'
            onSubmit={handleSubmit}
            noValidate
          >
            <fieldset className='login__content'>
              <label className='login__form-field'>
                <span className='login__label'>E-mail</span>
                <input
                  type='email'
                  name='email'
                  placeholder='Email'
                  autoComplete='off'
                  className='login__input'
                  pattern='^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$'
                  minLength='5'
                  maxLength='40'
                  onChange={controlInput.handleChange}
                  value={controlInput?.values?.email || ''}
                  required
                />
                <span className={errorClassName}>{email}</span>
              </label>
              <label className='login__form-field'>
                <span className='login__label'>Пароль</span>
                <input
                  type='password'
                  name='password'
                  placeholder='Пароль'
                  autoComplete='off'
                  className='login__input login__input_color_red'
                  minLength='5'
                  maxLength='40'
                  onChange={controlInput.handleChange}
                  value={controlInput?.values?.password || ''}
                  required
                />
                <span className={errorClassName}>{password}</span>
              </label>
              <span className={errorClassNameBtn}>{isLoginMessage}</span>
              <button
                type='submit'
                className='login__submit-button'
                disabled={!controlInput.isValid}
              >
                Войти
              </button>
            </fieldset>
          </form>
          <section className='question'>
            <p className='question__text'>Еще не зарегистрированы?</p>
            <Link to='/signup' className='question__login'>
              Регистрация
            </Link>
          </section>
        </div>
      </main>
    </>
  );
}

export default Login;
