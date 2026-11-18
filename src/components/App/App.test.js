import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import * as auth from '../../utils/ApiAuth';
import mainApi from '../../utils/MainApi';

afterEach(() => {
  jest.restoreAllMocks();
  localStorage.clear();
});

test('shows the local demo catalog immediately and supports search without save controls', async () => {
  render(
    <MemoryRouter initialEntries={['/movies']}>
      <App />
    </MemoryRouter>
  );

  expect(await screen.findByText(/Local demo catalog/)).not.toBeNull();
  expect(screen.getByText('Реальная любовь')).not.toBeNull();
  fireEvent.change(screen.getByRole('textbox', { name: 'Search movies' }), {
    target: { value: 'love' },
  });
  fireEvent.click(screen.getByRole('button', { name: 'Search' }));

  expect(await screen.findByText('Реальная любовь')).not.toBeNull();
  expect(screen.getByText('Любовь и монстры')).not.toBeNull();
  expect(screen.queryByRole('button', { name: 'Save Реальная любовь' })).toBeNull();
});

test.each(['/signup', '/signin'])('opens a new session in one auth request on %s', async path => {
  const user = { _id: 'test', name: 'Tester', email: 'tester@example.org' };
  const signup = jest.spyOn(auth, 'register').mockResolvedValue({ ...user, token: 'test-token' });
  const signin = jest.spyOn(auth, 'authorize').mockResolvedValue({ user, token: 'test-token' });
  const profile = jest.spyOn(auth, 'checkToken');
  jest.spyOn(mainApi, 'getSavedMovies').mockResolvedValue([]);
  render(<MemoryRouter initialEntries={[path]}><App /></MemoryRouter>);

  if (path === '/signup') {
    fireEvent.change(screen.getByPlaceholderText('Имя'), { target: { value: user.name } });
  }
  fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: user.email } });
  fireEvent.change(screen.getByPlaceholderText('Пароль'), { target: { value: 'test-password' } });
  fireEvent.submit(screen.getByPlaceholderText('Email').closest('form'));
  expect(await screen.findByText('Реальная любовь')).not.toBeNull();
  expect(signup).toHaveBeenCalledTimes(path === '/signup' ? 1 : 0);
  expect(signin).toHaveBeenCalledTimes(path === '/signin' ? 1 : 0);
  expect(profile).not.toHaveBeenCalled();
  expect(localStorage.getItem('jwt')).toBe('test-token');
});
