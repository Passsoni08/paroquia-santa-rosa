import { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import DataTable from '../components/DataTable';
import AdminButton from '../components/AdminButton';
import ConfirmModal from '../components/ConfirmModal';
import StatusBadge from '../components/StatusBadge';
import { fetchEventos, deleteEvento } from '../services/eventosService';
import { FaPlus, FaTrash } from 'react-icons/fa';
import styled from 'styled-components';

const Header = styled.div`
  display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;
  h1 { font-size: 1.5rem; }
`;

export default function AdminEventos() {
  const [eventos, setEventos] = useState([]);
  const [pagina, setPagina] = useState(1);
  const [deleting, setDeleting] = useState(null);

  const load = useCallback(async () => {
    try { const data = await fetchEventos({ limite: 20, pagina }); setEventos(data); } catch { /* */ }
  }, [pagina]);

  useEffect(() => { document.title = 'Eventos — Admin'; load(); }, [load]);

  const handleDelete = async () => {
    try { await deleteEvento(deleting.id); toast.success('Evento excluído'); setDeleting(null); load(); }
    catch { toast.error('Erro ao excluir'); }
  };

  const columns = [
    { key: 'titulo', label: 'Título' },
    { key: 'data_inicio', label: 'Data', render: (r) => new Date(r.data_inicio).toLocaleDateString('pt-BR') },
    { key: 'local', label: 'Local', render: (r) => r.local || '-' },
    { key: 'publicado', label: 'Status', render: (r) => <StatusBadge status={r.publicado ? 'Publicado' : 'Rascunho'} /> },
    { key: 'acoes', label: 'Ações', render: (r) => (
      <AdminButton variant="danger" onClick={() => setDeleting(r)}><FaTrash /></AdminButton>
    )},
  ];

  return (
    <>
      <Header><h1>Eventos</h1><AdminButton><FaPlus /> Novo Evento</AdminButton></Header>
      <DataTable columns={columns} data={eventos} pagina={pagina} total={eventos.length} limite={20} onPageChange={setPagina} />
      {deleting && <ConfirmModal title="Excluir evento" message={`Deseja excluir "${deleting.titulo}"?`} onConfirm={handleDelete} onCancel={() => setDeleting(null)} />}
    </>
  );
}
