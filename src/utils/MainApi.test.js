import mainApi from './MainApi';

const catalogMovie = {
  id: 11,
  country: 'US',
  director: 'Denis Villeneuve',
  duration: 116,
  year: '2016',
  description: 'A science fiction film.',
  image: { url: '/images/arrival.jpg' },
  trailerLink: 'https://example.test/trailer',
  nameRU: 'Прибытие',
  nameEN: 'Arrival',
};

afterEach(() => {
  jest.restoreAllMocks();
  localStorage.clear();
});

test('sends numeric movie identifiers accepted by the Movies API', async () => {
  localStorage.setItem('jwt', 'test-jwt');
  const response = {
    ok: true,
    status: 201,
    json: jest.fn().mockResolvedValue({ movieId: 11 }),
  };
  const fetchSpy = jest.spyOn(global, 'fetch').mockResolvedValue(response);

  await mainApi.addMovie(catalogMovie);

  const [, request] = fetchSpy.mock.calls[0];
  expect(JSON.parse(request.body).movieId).toBe(11);
  expect(request.headers.Authorization).toBe('Bearer test-jwt');
});
