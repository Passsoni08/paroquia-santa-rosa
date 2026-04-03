import styled from 'styled-components';

const Badge = styled.span`
  display: inline-block;
  padding: 3px 12px;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  background: ${({ $variant }) => {
    switch ($variant) {
      case 'success': return '#D4EDDA';
      case 'warning': return '#FFF3CD';
      case 'danger': return '#F8D7DA';
      default: return '#E2E8F0';
    }
  }};
  color: ${({ $variant }) => {
    switch ($variant) {
      case 'success': return '#155724';
      case 'warning': return '#856404';
      case 'danger': return '#721C24';
      default: return '#4A5568';
    }
  }};
`;

const VARIANTS = {
  publicado: 'success',
  ativo: 'success',
  rascunho: 'warning',
  inativo: 'danger',
  lido: 'default',
  'não lido': 'warning',
};

export default function StatusBadge({ status }) {
  const label = status ? String(status) : '';
  const variant = VARIANTS[label.toLowerCase()] || 'default';

  return <Badge $variant={variant}>{label}</Badge>;
}
