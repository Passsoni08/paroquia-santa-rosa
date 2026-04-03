import api from './api';

export async function inscreverNewsletter(email) {
  const { data } = await api.post('/newsletter/inscrever', { email });
  return data;
}

export async function fetchInscritos(params = {}, signal) {
  const { data } = await api.get('/newsletter', { params, signal });
  return data;
}

export async function removeInscrito(id) {
  await api.delete(`/newsletter/${id}`);
}
