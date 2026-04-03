import api from './api';

export async function fetchMidias(params = {}, signal) {
  const { data } = await api.get('/midia', { params, signal });
  return data;
}

export async function fetchMidia(id, signal) {
  const { data } = await api.get(`/midia/${id}`, { signal });
  return data;
}

export async function uploadImagens(formData) {
  const { data } = await api.post('/midia/imagem', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
}

export async function cadastrarVideo(formData) {
  const { data } = await api.post('/midia/video', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
}

export async function updateMidia(id, payload) {
  const { data } = await api.put(`/midia/${id}`, payload);
  return data;
}

export async function toggleDestaqueMidia(id) {
  const { data } = await api.patch(`/midia/${id}/destaque`);
  return data;
}

export async function deleteMidia(id) {
  await api.delete(`/midia/${id}`);
}
