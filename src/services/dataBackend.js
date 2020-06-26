import { DATA_BASE_URL } from './config';

const wrapResponse = async (resp) => {
  if (resp.ok) return resp.json();
  const err = new Error(resp.statusText);
  err.code = resp.status;
  try {
    err.body = await resp.json();
  } catch (error) {
    err.body = null;
  }
  throw err;
};

const authUser = (email, password) => {
  return fetch(`${DATA_BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })
    .then(wrapResponse)
    .catch((err) => {
      if (err.code) throw err;
      throw Error('Ошибка подключения');
    });
};

const getUser = (id, token) => {
  return fetch(`${DATA_BASE_URL}/users/${id}`, {
    method: 'GET',
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then(wrapResponse)
    .catch((err) => {
      if (err.code) throw err;
      throw Error('Ошибка подключения');
    });
};

const addUser = (email, password) => {
  return fetch(`${DATA_BASE_URL}/users`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })
    .then(wrapResponse)
    .catch((err) => {
      if (err.code) throw err;
      throw Error('Ошибка подключения');
    });
};

const getWords = (
  group,
  page,
  wordsPerPage = 20,
  maxWordsInSentence = 1000
) => {
  return fetch(
    `${DATA_BASE_URL}/words?page=${page}&group=${group}&wordsPerExampleSentenceLTE=${maxWordsInSentence}&wordsPerPage=${wordsPerPage}`,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  ).then(wrapResponse);
};

const getUserWords = (id, token, filter, wordsPerPage = 50) => {
  return fetch(
    `${DATA_BASE_URL}/users/${id}/aggregatedWords?filter=${filter}&wordsPerPage=${wordsPerPage}`,
    {
      method: 'GET',
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  ).then(wrapResponse);
};

const addUserWord = (id, token, wordId) => {
  const today = Math.floor(Date.now() / (3600 * 1000 * 24));
  return fetch(`${DATA_BASE_URL}/users/${id}/words/${wordId}`, {
    method: 'POST',
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      difficulty: 'new',
      optional: {
        creationDate: `${today}`,
        lastRepeat: 'null',
        repeatTimes: '0',
        nextRepeat: `${today}`,
      },
    }),
  }).then(wrapResponse);
};

const updateUserWord = (id, token, word) => {
  return fetch(`${DATA_BASE_URL}/users/${id}/words/${word.word}`, {
    method: 'PUT',
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      difficulty: word.difficulty,
      optional: {
        lastRepeat: word.lastRepeat,
        repeatTimes: word.repeatTimes,
        nextRepeat: word.nextRepeat,
      },
    }),
  }).then(wrapResponse);
};

const getSettings = (id, token) => {
  return fetch(`${DATA_BASE_URL}/users/${id}/settings`, {
    method: 'GET',
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then(wrapResponse);
};

const setSettings = (id, token, settings) => {
  return fetch(`${DATA_BASE_URL}/users/${id}/settings`, {
    method: 'PUT',
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(settings),
  }).then(wrapResponse);
};

const getStatistics = (id, token) => {
  return fetch(`${DATA_BASE_URL}/users/${id}/statistics`, {
    method: 'GET',
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then(wrapResponse);
};

const setStatistics = (id, token, statistics) => {
  return fetch(`${DATA_BASE_URL}/users/${id}/statistics`, {
    method: 'PUT',
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(statistics),
  }).then(wrapResponse);
};

export {
  authUser,
  getUser,
  addUser,
  getWords,
  getSettings,
  setSettings,
  getStatistics,
  setStatistics,
  addUserWord,
  updateUserWord,
  getUserWords,
};
