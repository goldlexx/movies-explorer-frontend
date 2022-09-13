import './Login.css';
import { Link } from 'react-router-dom';

function Login() {
  return (
    <>
      <main className='login'>
        <div className='login__container'>
          <header className='login__header'>
            <Link to='/' className='login__logo'></Link>

            <h2 className='login__title'>Рады видеть!</h2>
          </header>
          <form action='#' className='login__form'>
            <fieldset className='login__content'>
              <label className='login__form-field'>
                <span className='login__label'>E-mail</span>
                <input
                  type='email'
                  name='email'
                  placeholder='Email'
                  autoComplete='off'
                  className='login__input'
                  minLength='5'
                  maxLength='40'
                  required
                />
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
                  required
                />
              </label>
              <button type='submit' className='login__submit-button'>
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
