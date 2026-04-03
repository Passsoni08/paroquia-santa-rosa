import api from './api';

export async function fetchLiturgiaHoje(signal) {
  const { data } = await api.get('/liturgia/hoje', { signal });
  return data;
}

export async function fetchLiturgiaPorData(data, signal) {
  const response = await api.get(`/liturgia/${data}`, { signal });
  return response.data;
}
