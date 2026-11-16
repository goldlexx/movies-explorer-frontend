const checkResponse = async (response) => {
  let payload = null;

  try {
    payload = await response.json();
  } catch {
    if (response.ok && response.status !== 204) {
      throw new Error('The server returned an unreadable response.');
    }
  }

  if (!response.ok) {
    throw new Error(payload?.message || `Request failed (${response.status}).`);
  }

  return payload;
};

export default checkResponse;
