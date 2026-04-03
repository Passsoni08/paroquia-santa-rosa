import { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import AdminButton from '../components/AdminButton';
import ConfirmModal from '../components/ConfirmModal';
import { fetchMidias, cadastrarVideo, toggleDestaqueMidia, deleteMidia } from '../services/midiaService';
import { FaPlus, FaStar, FaTrash } from 'react-icons/fa';

const Header = styled.div`
  display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;
  h1 { font-size: 1.5rem; }
`;

const FormCard = styled.div`
  background: ${({ theme }) => theme.admin.card};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: ${({ theme }) => theme.shadows.sm};
`;

const FormRow = styled.div`
  display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px;
  @media (max-width: 600px) { grid-template-columns: 1fr; }
  label { display: block; font-weight: 600; font-size: 0.875rem; margin-bottom: 4px; }
  input, textarea { width: 100%; padding: 8px 12px; border: 1px solid #E0D6C3; border-radius: 4px; }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 16px;
`;

const VideoItem = styled.div`
  background: ${({ theme }) => theme.admin.card};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.sm};

  img { width: 100%; height: 140px; object-fit: cover; }
`;

const VideoInfo = styled.div`
  padding: 12px;
  h4 { font-size: 0.875rem; margin-bottom: 4px; }
  span { font-size: 0.75rem; color: ${({ theme }) => theme.colors.textMuted}; text-transform: capitalize; }
`;

const VideoActions = styled.div`
  display: flex; justify-content: space-between; padding: 0 12px 12px;
`;

export default function AdminVideos() {
  const [videos, setVideos] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [deleting, setDeleting] = useState(null);
  const [form, setForm] = useState({ url: '', titulo: '', descricao: '' });

  const load = useCallback(async () => {
    try { const data = await fetchMidias({ tipo: 'video', limite: 40 }); setVideos(data); } catch { /* */ }
  }, []);

  useEffect(() => { document.title = 'Vídeos — Admin'; load(); }, [load]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('url', form.url);
    formData.append('titulo', form.titulo);
    formData.append('descricao', form.descricao);
    formData.append('publicado', 'true');
    try { await cadastrarVideo(formData); toast.success('Vídeo cadastrado'); setForm({ url: '', titulo: '', descricao: '' }); setShowForm(false); load(); }
    catch (err) { toast.error(err.response?.data?.detail || 'Erro ao cadastrar'); }
  };

  const handleDelete = async () => {
    try { await deleteMidia(deleting.id); toast.success('Vídeo excluído'); setDeleting(null); load(); }
    catch { toast.error('Erro ao excluir'); }
  };

  return (
    <>
      <Header>
        <h1>Vídeos</h1>
        <AdminButton onClick={() => setShowForm(!showForm)}><FaPlus /> Novo Vídeo</AdminButton>
      </Header>

      {showForm && (
        <FormCard>
          <form onSubmit={handleSubmit}>
            <FormRow>
              <div><label>URL (YouTube/Vimeo)</label><input value={form.url} onChange={(e) => setForm({ ...form, url: e.target.value })} required /></div>
              <div><label>Título</label><input value={form.titulo} onChange={(e) => setForm({ ...form, titulo: e.target.value })} required /></div>
            </FormRow>
            <FormRow>
              <div style={{ gridColumn: '1 / -1' }}><label>Descrição</label><input value={form.descricao} onChange={(e) => setForm({ ...form, descricao: e.target.value })} /></div>
            </FormRow>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
              <AdminButton variant="ghost" type="button" onClick={() => setShowForm(false)}>Cancelar</AdminButton>
              <AdminButton type="submit">Cadastrar</AdminButton>
            </div>
          </form>
        </FormCard>
      )}

      <Grid>
        {videos.map((v) => (
          <VideoItem key={v.id}>
            <img src={v.thumbnail_url || `https://picsum.photos/300/160?random=${v.id}`} alt={v.titulo} loading="lazy" />
            <VideoInfo><h4>{v.titulo}</h4><span>{v.plataforma}</span></VideoInfo>
            <VideoActions>
              <AdminButton variant="ghost" onClick={() => toggleDestaqueMidia(v.id).then(load)}>
                <FaStar color={v.destaque ? '#C9A84C' : '#ccc'} />
              </AdminButton>
              <AdminButton variant="danger" onClick={() => setDeleting(v)}><FaTrash /></AdminButton>
            </VideoActions>
          </VideoItem>
        ))}
      </Grid>

      {deleting && <ConfirmModal title="Excluir vídeo" message={`Deseja excluir "${deleting.titulo}"?`} onConfirm={handleDelete} onCancel={() => setDeleting(null)} />}
    </>
  );
}
