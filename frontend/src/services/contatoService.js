import api from './api';

export async function enviarMensagem(payload) {
  const { data } = await api.post('/contato', payload);
  return data;
}

export async function fetchMensagens(params = {}, signal) {
  const { data } = await api.get('/contato', { params, signal });
  return data;
}

export async function countNaoLidas(signal) {
  const { data } = await api.get('/contato/nao-lidas/count', { signal });
  return data.count;
}

export async function toggleLido(id) {
  const { data } = await api.patch(`/contato/${id}/lido`);
  return data;
}

export async function deleteMensagem(id) {
  await api.delete(`/contato/${id}`);
}
