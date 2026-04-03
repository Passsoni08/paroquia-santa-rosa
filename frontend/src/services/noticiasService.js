import api from './api';

export async function fetchNoticias(params = {}, signal) {
  const { data } = await api.get('/noticias', { params, signal });
  return data;
}

export async function fetchNoticia(slug, signal) {
  const { data } = await api.get(`/noticias/${slug}`, { signal });
  return data;
}

export async function createNoticia(formData) {
  const { data } = await api.post('/noticias', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
}

export async function updateNoticia(id, payload) {
  const { data } = await api.put(`/noticias/${id}`, payload);
  return data;
}

export async function togglePublicarNoticia(id) {
  const { data } = await api.patch(`/noticias/${id}/publicar`);
  return data;
}

export async function deleteNoticia(id) {
  await api.delete(`/noticias/${id}`);
}
