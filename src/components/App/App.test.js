import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

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

  expect(screen.getByText(/Local demo catalog/)).not.toBeNull();
  expect(screen.getByText('Реальная любовь')).not.toBeNull();
  fireEvent.change(screen.getByRole('textbox', { name: 'Search movies' }), {
    target: { value: 'love' },
  });
  fireEvent.click(screen.getByRole('button', { name: 'Search' }));

  expect(await screen.findByText('Реальная любовь')).not.toBeNull();
  expect(screen.getByText('Любовь и монстры')).not.toBeNull();
  expect(screen.queryByRole('button', { name: 'Save Реальная любовь' })).toBeNull();
});
