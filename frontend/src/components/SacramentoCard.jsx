import styled from 'styled-components';

const Card = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: 28px 20px;
  text-align: center;
  box-shadow: ${({ theme }) => theme.shadows.sm};
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.shadows.md};
  }
`;

const IconWrap = styled.div`
  font-size: 36px;
  color: ${({ theme }) => theme.colors.secondary};
  margin-bottom: 12px;
`;

const Nome = styled.h3`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 8px;
`;

const Resumo = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.6;
`;

export default function SacramentoCard({ sacramento }) {
  const Icon = sacramento.icon;

  return (
    <Card>
      <IconWrap><Icon /></IconWrap>
      <Nome>{sacramento.nome}</Nome>
      <Resumo>{sacramento.resumo}</Resumo>
    </Card>
  );
}
