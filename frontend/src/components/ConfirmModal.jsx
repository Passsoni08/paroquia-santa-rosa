import styled from 'styled-components';

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
`;

const Modal = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: 32px;
  max-width: 420px;
  width: 90%;
  box-shadow: ${({ theme }) => theme.shadows.lg};
`;

const Title = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 12px;
`;

const Message = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textMuted};
  margin-bottom: 24px;
  line-height: 1.6;
`;

const Actions = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
`;

const Btn = styled.button`
  padding: 8px 20px;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-weight: 600;
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

const CancelBtn = styled(Btn)`
  background: ${({ theme }) => theme.admin.content};
  color: ${({ theme }) => theme.colors.textMuted};
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const ConfirmBtn = styled(Btn)`
  background: ${({ theme }) => theme.colors.error};
  color: ${({ theme }) => theme.colors.textLight};
`;

export default function ConfirmModal({ title, message, onConfirm, onCancel }) {
  return (
    <Overlay onClick={onCancel}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <Title>{title || 'Confirmar exclusão'}</Title>
        <Message>{message || 'Esta ação não pode ser desfeita. Deseja continuar?'}</Message>
        <Actions>
          <CancelBtn onClick={onCancel}>Cancelar</CancelBtn>
          <ConfirmBtn onClick={onConfirm}>Excluir</ConfirmBtn>
        </Actions>
      </Modal>
    </Overlay>
  );
}
