import { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import DataTable from '../components/DataTable';
import AdminButton from '../components/AdminButton';
import StatusBadge from '../components/StatusBadge';
import ConfirmModal from '../components/ConfirmModal';
import { fetchAvisos, createAviso, updateAviso, toggleAtivoAviso, deleteAviso } from '../services/avisosService';
import { FaPlus, FaEdit, FaTrash, FaToggleOn } from 'react-icons/fa';

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;

  h1 { font-size: 1.5rem; }
`;

const ModalOverlay = styled.div`
  position: fixed; inset: 0;
  background: rgba(0,0,0,0.5);
  display: flex; align-items: center; justify-content: center; z-index: 2000;
`;

const ModalBox = styled.div`
  background: #fff; border-radius: 8px; padding: 32px;
  width: 90%; max-width: 500px; max-height: 90vh; overflow-y: auto;
`;

const FormGroup = styled.div`
  margin-bottom: 16px;
  label { display: block; font-weight: 600; margin-bottom: 4px; font-size: 0.875rem; }
  input, textarea, select { width: 100%; padding: 8px 12px; border: 1px solid #E0D6C3; border-radius: 4px; font-size: 1rem; }
  textarea { min-height: 100px; resize: vertical; }
`;

const Actions = styled.div`
  display: flex; gap: 6px;
`;

export default function AdminAvisos() {
  const [avisos, setAvisos] = useState([]);
  const [pagina, setPagina] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [form, setForm] = useState({ titulo: '', conteudo: '', categoria: 'informativo', ativo: true, publicado: true, data_expiracao: '' });

  const load = useCallback(async () => {
    try {
      const data = await fetchAvisos({ limite: 20, pagina });
      setAvisos(data);
    } catch { /* */ }
  }, [pagina]);

  useEffect(() => { document.title = 'Avisos — Admin'; load(); }, [load]);

  const openNew = () => { setEditing(null); setForm({ titulo: '', conteudo: '', categoria: 'informativo', ativo: true, publicado: true, data_expiracao: '' }); setShowForm(true); };
  const openEdit = (a) => { setEditing(a); setForm({ titulo: a.titulo, conteudo: a.conteudo, categoria: a.categoria, ativo: a.ativo, publicado: a.publicado, data_expiracao: a.data_expiracao || '' }); setShowForm(true); };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...form, data_expiracao: form.data_expiracao || null };
      if (editing) { await updateAviso(editing.id, payload); toast.success('Aviso atualizado'); }
      else { await createAviso(payload); toast.success('Aviso criado'); }
      setShowForm(false); load();
    } catch { toast.error('Erro ao salvar aviso'); }
  };

  const handleDelete = async () => {
    try { await deleteAviso(deleting.id); toast.success('Aviso excluído'); setDeleting(null); load(); }
    catch { toast.error('Erro ao excluir'); }
  };

  const handleToggle = async (a) => {
    try { await toggleAtivoAviso(a.id); load(); } catch { toast.error('Erro'); }
  };

  const columns = [
    { key: 'titulo', label: 'Título' },
    { key: 'categoria', label: 'Categoria' },
    { key: 'ativo', label: 'Ativo', render: (r) => <StatusBadge status={r.ativo ? 'Ativo' : 'Inativo'} /> },
    { key: 'publicado', label: 'Publicado', render: (r) => <StatusBadge status={r.publicado ? 'Publicado' : 'Rascunho'} /> },
    { key: 'criado_em', label: 'Criado em', render: (r) => new Date(r.criado_em).toLocaleDateString('pt-BR') },
    { key: 'acoes', label: 'Ações', render: (r) => (
      <Actions>
        <AdminButton variant="ghost" onClick={() => handleToggle(r)} title="Ativar/Desativar"><FaToggleOn /></AdminButton>
        <AdminButton variant="ghost" onClick={() => openEdit(r)}><FaEdit /></AdminButton>
        <AdminButton variant="danger" onClick={() => setDeleting(r)}><FaTrash /></AdminButton>
      </Actions>
    )},
  ];

  return (
    <>
      <Header>
        <h1>Avisos</h1>
        <AdminButton onClick={openNew}><FaPlus /> Novo Aviso</AdminButton>
      </Header>

      <DataTable columns={columns} data={avisos} pagina={pagina} total={avisos.length} limite={20} onPageChange={setPagina} />

      {showForm && (
        <ModalOverlay onClick={() => setShowForm(false)}>
          <ModalBox onClick={(e) => e.stopPropagation()}>
            <h2 style={{ marginBottom: 20 }}>{editing ? 'Editar Aviso' : 'Novo Aviso'}</h2>
            <form onSubmit={handleSave}>
              <FormGroup><label>Título</label><input value={form.titulo} onChange={(e) => setForm({ ...form, titulo: e.target.value })} required /></FormGroup>
              <FormGroup><label>Conteúdo</label><textarea value={form.conteudo} onChange={(e) => setForm({ ...form, conteudo: e.target.value })} required /></FormGroup>
              <FormGroup><label>Categoria</label>
                <select value={form.categoria} onChange={(e) => setForm({ ...form, categoria: e.target.value })}>
                  <option value="informativo">Informativo</option>
                  <option value="liturgia">Liturgia</option>
                  <option value="pastoral">Pastoral</option>
                  <option value="obras">Obras</option>
                </select>
              </FormGroup>
              <FormGroup><label>Data de Expiração</label><input type="date" value={form.data_expiracao} onChange={(e) => setForm({ ...form, data_expiracao: e.target.value })} /></FormGroup>
              <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end', marginTop: 20 }}>
                <AdminButton variant="ghost" type="button" onClick={() => setShowForm(false)}>Cancelar</AdminButton>
                <AdminButton type="submit">Salvar</AdminButton>
              </div>
            </form>
          </ModalBox>
        </ModalOverlay>
      )}

      {deleting && <ConfirmModal title="Excluir aviso" message={`Deseja excluir "${deleting.titulo}"? Esta ação não pode ser desfeita.`} onConfirm={handleDelete} onCancel={() => setDeleting(null)} />}
    </>
  );
}
