const API_BASE = 'http://localhost:8000/api';

const getToken = () => localStorage.getItem('baddalni_token');
const setToken = (token) => localStorage.setItem('baddalni_token', token);
const removeToken = () => localStorage.removeItem('baddalni_token');

const getUserData = () => {
  const str = localStorage.getItem('baddalni_user');
  return str ? JSON.parse(str) : null;
};
const setUserData = (user) => localStorage.setItem('baddalni_user', JSON.stringify(user));
const removeUserData = () => localStorage.removeItem('baddalni_user');

const authHeaders = () => {
  const token = getToken();
  return token ? { 'Authorization': `Bearer ${token}` } : {};
};

const jsonHeaders = () => ({
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  ...authHeaders(),
});

const handleResponse = async (res) => {
  const data = await res.json();
  if (!res.ok) {
    const message = data.message || data.errors
      ? Object.values(data.errors || {}).flat().join(', ') || data.message
      : 'Request failed';
    throw new Error(message);
  }
  return data;
};

export const registerUser = async (name, email, password, passwordConfirmation) => {
  const res = await fetch(`${API_BASE}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    body: JSON.stringify({ name, email, password, password_confirmation: passwordConfirmation }),
  });
  const data = await handleResponse(res);
  setToken(data.token);
  setUserData(data.user);
  return data;
};

export const loginUser = async (email, password) => {
  const res = await fetch(`${API_BASE}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const data = await handleResponse(res);
  setToken(data.token);
  setUserData(data.user);
  return data;
};

export const googleLogin = async (accessToken) => {
  const res = await fetch(`${API_BASE}/auth/google`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    body: JSON.stringify({ access_token: accessToken }),
  });
  const data = await handleResponse(res);
  setToken(data.token);
  setUserData(data.user);
  return data;
};

export const logoutUser = async () => {
  try {
    await fetch(`${API_BASE}/logout`, {
      method: 'POST',
      headers: jsonHeaders(),
    });
  } catch {
  }
  removeToken();
  removeUserData();
};

export const getUser = () => getUserData();

export const fetchUser = async () => {
  const res = await fetch(`${API_BASE}/user`, {
    headers: jsonHeaders(),
  });
  const data = await handleResponse(res);
  setUserData(data);
  return data;
};

export const updateUser = async (userData) => {
  const res = await fetch(`${API_BASE}/user`, {
    method: 'PUT',
    headers: jsonHeaders(),
    body: JSON.stringify(userData),
  });
  const data = await handleResponse(res);
  setUserData(data);
  return data;
};

export const deleteAccount = async () => {
  await fetch(`${API_BASE}/user`, {
    method: 'DELETE',
    headers: jsonHeaders(),
  });
  removeToken();
  removeUserData();
};

export const isLoggedIn = () => !!getToken();

export const getItems = async (filters = {}) => {
  const params = new URLSearchParams();
  if (filters.search) params.set('search', filters.search);
  if (filters.city) params.set('city', filters.city);
  if (filters.category) params.set('category', filters.category);
  if (filters.sort) params.set('sort', filters.sort);
  if (filters.page) params.set('page', filters.page);
  if (filters.per_page) params.set('per_page', filters.per_page);
  if (filters.user_id) params.set('user_id', filters.user_id);

  const res = await fetch(`${API_BASE}/items?${params.toString()}`, {
    headers: { 'Accept': 'application/json', ...authHeaders() },
  });
  return handleResponse(res);
};

export const getItem = async (id) => {
  const res = await fetch(`${API_BASE}/items/${id}`, {
    headers: { 'Accept': 'application/json' },
  });
  return handleResponse(res);
};

export const addItem = async (formData) => {
  const res = await fetch(`${API_BASE}/items`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      ...authHeaders(),
    },
    body: formData,
  });
  return handleResponse(res);
};

export const removeItem = async (itemId) => {
  const res = await fetch(`${API_BASE}/items/${itemId}`, {
    method: 'DELETE',
    headers: jsonHeaders(),
  });
  return handleResponse(res);
};

export const addComment = async (itemId, text) => {
  const res = await fetch(`${API_BASE}/items/${itemId}/comments`, {
    method: 'POST',
    headers: jsonHeaders(),
    body: JSON.stringify({ text }),
  });
  return handleResponse(res);
};

export const getFavorites = async () => {
  const res = await fetch(`${API_BASE}/favorites`, {
    headers: jsonHeaders(),
  });
  return handleResponse(res);
};

export const toggleFavorite = async (itemId) => {
  const res = await fetch(`${API_BASE}/favorites/${itemId}`, {
    method: 'POST',
    headers: jsonHeaders(),
  });
  return handleResponse(res);
};

export const isFavorite = async (itemId) => {
  const res = await fetch(`${API_BASE}/favorites/check`, {
    method: 'POST',
    headers: jsonHeaders(),
    body: JSON.stringify({ item_ids: [itemId] }),
  });
  const data = await handleResponse(res);
  return data.includes(itemId);
};

export const checkFavorites = async (itemIds) => {
  const res = await fetch(`${API_BASE}/favorites/check`, {
    method: 'POST',
    headers: jsonHeaders(),
    body: JSON.stringify({ item_ids: itemIds }),
  });
  return handleResponse(res);
};

export const getMessages = async () => {
  const res = await fetch(`${API_BASE}/messages`, {
    headers: jsonHeaders(),
  });
  return handleResponse(res);
};

export const sendMessage = async (toUserId, text, itemId = null, itemTitle = '') => {
  const res = await fetch(`${API_BASE}/messages`, {
    method: 'POST',
    headers: jsonHeaders(),
    body: JSON.stringify({
      to_user_id: toUserId,
      text,
      item_id: itemId,
      item_title: itemTitle,
    }),
  });
  return handleResponse(res);
};
