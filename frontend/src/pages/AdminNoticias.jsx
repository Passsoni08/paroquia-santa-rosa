import { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import DataTable from '../components/DataTable';
import AdminButton from '../components/AdminButton';
import ConfirmModal from '../components/ConfirmModal';
import StatusBadge from '../components/StatusBadge';
import { fetchNoticias, togglePublicarNoticia, deleteNoticia } from '../services/noticiasService';
import { FaPlus, FaTrash, FaEye } from 'react-icons/fa';
import styled from 'styled-components';

const Header = styled.div`
  display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;
  h1 { font-size: 1.5rem; }
`;

const Actions = styled.div` display: flex; gap: 6px; `;

export default function AdminNoticias() {
  const [noticias, setNoticias] = useState([]);
  const [pagina, setPagina] = useState(1);
  const [deleting, setDeleting] = useState(null);

  const load = useCallback(async () => {
    try { const data = await fetchNoticias({ limite: 20, pagina }); setNoticias(data); } catch { /* */ }
  }, [pagina]);

  useEffect(() => { document.title = 'Notícias — Admin'; load(); }, [load]);

  const handleToggle = async (n) => {
    try { await togglePublicarNoticia(n.id); load(); } catch { toast.error('Erro'); }
  };

  const handleDelete = async () => {
    try { await deleteNoticia(deleting.id); toast.success('Notícia excluída'); setDeleting(null); load(); }
    catch { toast.error('Erro ao excluir'); }
  };

  const columns = [
    { key: 'titulo', label: 'Título' },
    { key: 'publicado', label: 'Status', render: (r) => <StatusBadge status={r.publicado ? 'Publicado' : 'Rascunho'} /> },
    { key: 'publicado_em', label: 'Data publicação', render: (r) => r.publicado_em ? new Date(r.publicado_em).toLocaleDateString('pt-BR') : '-' },
    { key: 'acoes', label: 'Ações', render: (r) => (
      <Actions>
        <AdminButton variant="ghost" onClick={() => handleToggle(r)}><FaEye /></AdminButton>
        <AdminButton variant="danger" onClick={() => setDeleting(r)}><FaTrash /></AdminButton>
      </Actions>
    )},
  ];

  return (
    <>
      <Header><h1>Notícias</h1><AdminButton><FaPlus /> Nova Notícia</AdminButton></Header>
      <DataTable columns={columns} data={noticias} pagina={pagina} total={noticias.length} limite={20} onPageChange={setPagina} />
      {deleting && <ConfirmModal title="Excluir notícia" message={`Deseja excluir "${deleting.titulo}"?`} onConfirm={handleDelete} onCancel={() => setDeleting(null)} />}
    </>
  );
}
