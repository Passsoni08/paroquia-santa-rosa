import api from './api';

export async function fetchAvisos(params = {}, signal) {
  const { data } = await api.get('/avisos', { params, signal });
  return data;
}

export async function fetchAviso(id, signal) {
  const { data } = await api.get(`/avisos/${id}`, { signal });
  return data;
}

export async function createAviso(payload) {
  const { data } = await api.post('/avisos', payload);
  return data;
}

export async function updateAviso(id, payload) {
  const { data } = await api.put(`/avisos/${id}`, payload);
  return data;
}

export async function toggleAtivoAviso(id) {
  const { data } = await api.patch(`/avisos/${id}/ativar`);
  return data;
}

export async function deleteAviso(id) {
  await api.delete(`/avisos/${id}`);
}
