import { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import AdminButton from '../components/AdminButton';
import ConfirmModal from '../components/ConfirmModal';
import { fetchMidias, uploadImagens, toggleDestaqueMidia, deleteMidia } from '../services/midiaService';
import { FaStar, FaTrash, FaUpload } from 'react-icons/fa';

const Header = styled.div`
  display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;
  h1 { font-size: 1.5rem; }
`;

const UploadArea = styled.div`
  border: 2px dashed ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: 32px;
  text-align: center;
  margin-bottom: 24px;
  background: ${({ theme }) => theme.admin.card};
  cursor: pointer;

  &:hover { border-color: ${({ theme }) => theme.colors.primary}; }

  input { display: none; }
  p { color: ${({ theme }) => theme.colors.textMuted}; margin-top: 8px; }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
`;

const ImgCard = styled.div`
  position: relative;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  overflow: hidden;
  background: ${({ theme }) => theme.admin.card};
  box-shadow: ${({ theme }) => theme.shadows.sm};

  img { width: 100%; height: 160px; object-fit: cover; }
`;

const ImgActions = styled.div`
  display: flex; justify-content: space-between; padding: 8px;
`;

export default function AdminGaleria() {
  const [imagens, setImagens] = useState([]);
  const [deleting, setDeleting] = useState(null);

  const load = useCallback(async () => {
    try { const data = await fetchMidias({ tipo: 'imagem', limite: 40 }); setImagens(data); } catch { /* */ }
  }, []);

  useEffect(() => { document.title = 'Galeria — Admin'; load(); }, [load]);

  const handleUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;
    const formData = new FormData();
    formData.append('titulo', 'Upload');
    formData.append('publicado', 'true');
    files.forEach((f) => formData.append('arquivos', f));
    try { await uploadImagens(formData); toast.success(`${files.length} imagem(ns) enviada(s)`); load(); }
    catch { toast.error('Erro no upload'); }
  };

  const handleDelete = async () => {
    try { await deleteMidia(deleting.id); toast.success('Imagem excluída'); setDeleting(null); load(); }
    catch { toast.error('Erro ao excluir'); }
  };

  const handleDestaque = async (img) => {
    try { await toggleDestaqueMidia(img.id); load(); } catch { /* */ }
  };

  return (
    <>
      <Header><h1>Galeria de Imagens</h1></Header>

      <UploadArea onClick={() => document.getElementById('fileInput').click()}>
        <FaUpload size={32} color="#7B1C1C" />
        <p>Clique ou arraste imagens aqui (JPEG, PNG, WebP — máx. 10MB)</p>
        <input id="fileInput" type="file" multiple accept="image/jpeg,image/png,image/webp" onChange={handleUpload} />
      </UploadArea>

      <Grid>
        {imagens.map((img) => (
          <ImgCard key={img.id}>
            <img src={img.arquivo_url} alt={img.titulo} loading="lazy" />
            <ImgActions>
              <AdminButton variant="ghost" onClick={() => handleDestaque(img)} title="Destaque">
                <FaStar color={img.destaque ? '#C9A84C' : '#ccc'} />
              </AdminButton>
              <AdminButton variant="danger" onClick={() => setDeleting(img)}><FaTrash /></AdminButton>
            </ImgActions>
          </ImgCard>
        ))}
      </Grid>

      {deleting && <ConfirmModal title="Excluir imagem" message="Deseja excluir esta imagem?" onConfirm={handleDelete} onCancel={() => setDeleting(null)} />}
    </>
  );
}
