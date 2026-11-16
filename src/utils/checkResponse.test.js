import checkResponse from './checkResponse';

test('returns parsed JSON for a successful response', async () => {
  const payload = { movies: [] };
  const response = {
    ok: true,
    status: 200,
    json: jest.fn().mockResolvedValue(payload),
  };

  await expect(checkResponse(response)).resolves.toEqual(payload);
});

test('uses the server message for failed responses', async () => {
  const response = {
    ok: false,
    status: 503,
    json: jest.fn().mockResolvedValue({ message: 'Service unavailable' }),
  };

  await expect(checkResponse(response)).rejects.toThrow('Service unavailable');
});

test('reports HTTP status when an error response is not JSON', async () => {
  const response = {
    ok: false,
    status: 502,
    json: jest.fn().mockRejectedValue(new SyntaxError()),
  };

  await expect(checkResponse(response)).rejects.toThrow('Request failed (502).');
});
