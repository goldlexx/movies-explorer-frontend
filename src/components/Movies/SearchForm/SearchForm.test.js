import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import SearchForm from './SearchForm';

const renderForm = (onSubmit = jest.fn()) => {
  render(
    <MemoryRouter initialEntries={['/movies']}>
      <SearchForm
        onSubmit={onSubmit}
        searchKeyword=''
        onCheckbox={jest.fn()}
        checked={false}
        checkedSaveMovies={false}
      />
    </MemoryRouter>
  );
  return onSubmit;
};

test('does not submit an empty search and shows validation feedback', () => {
  const onSubmit = renderForm();

  fireEvent.click(screen.getByRole('button', { name: 'Search' }));

  expect(onSubmit).not.toHaveBeenCalled();
  expect(screen.getByText('Нужно ввести ключевое слово')).toBeInTheDocument();
});

test('submits the entered keyword', () => {
  const onSubmit = renderForm();
  const input = screen.getByRole('textbox', { name: 'Search movies' });

  fireEvent.change(input, { target: { value: 'Arrival' } });
  fireEvent.click(screen.getByRole('button', { name: 'Search' }));

  expect(onSubmit).toHaveBeenCalledWith('Arrival');
});
