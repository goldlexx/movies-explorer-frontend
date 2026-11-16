import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import moviesApi from '../../utils/MoviesApi';
import App from './App';

const catalogMovie = {
  id: 11,
  nameRU: 'Arrival',
  nameEN: 'Arrival',
  country: 'US',
  director: 'Denis Villeneuve',
  duration: 116,
  year: '2016',
  description: 'A science fiction film.',
  trailerLink: 'https://example.test/trailer',
  image: {
    url: '/images/arrival.jpg',
    formats: { thumbnail: { url: '/images/arrival-thumb.jpg' } },
  },
};

afterEach(() => {
  jest.restoreAllMocks();
  localStorage.clear();
});

test('allows guests to browse the public movie catalog without save controls', async () => {
  jest.spyOn(moviesApi, 'getAllMovies').mockResolvedValue([catalogMovie]);

  render(
    <MemoryRouter initialEntries={['/movies']}>
      <App />
    </MemoryRouter>
  );

  expect(screen.getByText(/Browse-only demo/)).not.toBeNull();
  fireEvent.change(screen.getByRole('textbox', { name: 'Search movies' }), {
    target: { value: 'Arrival' },
  });
  fireEvent.click(screen.getByRole('button', { name: 'Search' }));

  expect(await screen.findByText('Arrival')).not.toBeNull();
  expect(screen.queryByRole('button', { name: 'Save Arrival' })).toBeNull();
  expect(moviesApi.getAllMovies).toHaveBeenCalledTimes(1);
});
