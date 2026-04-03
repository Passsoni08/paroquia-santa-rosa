import api from './api';

export async function fetchEventos(params = {}, signal) {
  const { data } = await api.get('/eventos', { params, signal });
  return data;
}

export async function fetchEvento(id, signal) {
  const { data } = await api.get(`/eventos/${id}`, { signal });
  return data;
}

export async function createEvento(formData) {
  const { data } = await api.post('/eventos', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
}

export async function updateEvento(id, payload) {
  const { data } = await api.put(`/eventos/${id}`, payload);
  return data;
}

export async function deleteEvento(id) {
  await api.delete(`/eventos/${id}`);
}
