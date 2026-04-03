import { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import DataTable from '../components/DataTable';
import AdminButton from '../components/AdminButton';
import ConfirmModal from '../components/ConfirmModal';
import StatusBadge from '../components/StatusBadge';
import { fetchMensagens, toggleLido, deleteMensagem } from '../services/contatoService';
import { FaEye, FaTrash } from 'react-icons/fa';

const Header = styled.div`
  display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;
  h1 { font-size: 1.5rem; }
`;

const Filters = styled.div`
  display: flex; gap: 8px; margin-bottom: 16px;
`;

const FilterBtn = styled.button`
  padding: 6px 16px; border-radius: 20px; font-size: 0.875rem;
  background: ${({ $active, theme }) => $active ? theme.colors.primary : theme.admin.card};
  color: ${({ $active, theme }) => $active ? '#fff' : theme.colors.text};
  border: 1px solid ${({ $active, theme }) => $active ? theme.colors.primary : theme.colors.border};
`;

const ModalOverlay = styled.div`
  position: fixed; inset: 0; background: rgba(0,0,0,0.5);
  display: flex; align-items: center; justify-content: center; z-index: 2000;
`;

const ModalBox = styled.div`
  background: #fff; border-radius: 8px; padding: 32px;
  width: 90%; max-width: 500px;

  h3 { margin-bottom: 16px; }
  p { margin-bottom: 8px; font-size: 0.875rem; }
  .label { font-weight: 600; color: #6B6B6B; }
  .msg { margin-top: 12px; line-height: 1.7; }
`;

const Actions = styled.div` display: flex; gap: 6px; `;

export default function AdminContatos() {
  const [mensagens, setMensagens] = useState([]);
  const [pagina, setPagina] = useState(1);
  const [filtro, setFiltro] = useState(null);
  const [viewing, setViewing] = useState(null);
  const [deleting, setDeleting] = useState(null);

  const load = useCallback(async () => {
    try {
      const params = { limite: 20, pagina };
      if (filtro !== null) params.lido = filtro;
      const data = await fetchMensagens(params);
      setMensagens(data);
    } catch { /* */ }
  }, [pagina, filtro]);

  useEffect(() => { document.title = 'Contatos — Admin'; load(); }, [load]);

  const handleView = async (m) => {
    setViewing(m);
    if (!m.lido) { try { await toggleLido(m.id); load(); } catch { /* */ } }
  };

  const handleDelete = async () => {
    try { await deleteMensagem(deleting.id); toast.success('Mensagem excluída'); setDeleting(null); load(); }
    catch { toast.error('Erro ao excluir'); }
  };

  const columns = [
    { key: 'nome', label: 'Nome' },
    { key: 'email', label: 'E-mail' },
    { key: 'assunto', label: 'Assunto' },
    { key: 'criado_em', label: 'Data', render: (r) => new Date(r.criado_em).toLocaleDateString('pt-BR') },
    { key: 'lido', label: 'Status', render: (r) => <StatusBadge status={r.lido ? 'Lido' : 'Não lido'} /> },
    { key: 'acoes', label: 'Ações', render: (r) => (
      <Actions>
        <AdminButton variant="ghost" onClick={() => handleView(r)}><FaEye /></AdminButton>
        <AdminButton variant="danger" onClick={() => setDeleting(r)}><FaTrash /></AdminButton>
      </Actions>
    )},
  ];

  return (
    <>
      <Header><h1>Mensagens de Contato</h1></Header>

      <Filters>
        <FilterBtn $active={filtro === null} onClick={() => setFiltro(null)}>Todas</FilterBtn>
        <FilterBtn $active={filtro === false} onClick={() => setFiltro(false)}>Não lidas</FilterBtn>
        <FilterBtn $active={filtro === true} onClick={() => setFiltro(true)}>Lidas</FilterBtn>
      </Filters>

      <DataTable columns={columns} data={mensagens} pagina={pagina} total={mensagens.length} limite={20} onPageChange={setPagina} />

      {viewing && (
        <ModalOverlay onClick={() => setViewing(null)}>
          <ModalBox onClick={(e) => e.stopPropagation()}>
            <h3>{viewing.assunto}</h3>
            <p><span className="label">De:</span> {viewing.nome} ({viewing.email})</p>
            {viewing.telefone && <p><span className="label">Telefone:</span> {viewing.telefone}</p>}
            <p><span className="label">Data:</span> {new Date(viewing.criado_em).toLocaleString('pt-BR')}</p>
            <p className="msg">{viewing.mensagem}</p>
            <div style={{ marginTop: 20, textAlign: 'right' }}>
              <AdminButton variant="ghost" onClick={() => setViewing(null)}>Fechar</AdminButton>
            </div>
          </ModalBox>
        </ModalOverlay>
      )}

      {deleting && <ConfirmModal title="Excluir mensagem" message="Deseja excluir esta mensagem?" onConfirm={handleDelete} onCancel={() => setDeleting(null)} />}
    </>
  );
}
