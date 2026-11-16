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
    const error = new Error(payload?.message || `Request failed (${response.status}).`);
    error.status = response.status;
    throw error;
  }

  return payload;
};

export default checkResponse;
