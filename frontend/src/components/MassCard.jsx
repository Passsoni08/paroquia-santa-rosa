import styled from 'styled-components';
import { FaClock, FaMapMarkerAlt } from 'react-icons/fa';

const Card = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: 20px;
  box-shadow: ${({ theme }) => theme.shadows.sm};
  border-left: 4px solid ${({ theme }) => theme.colors.secondary};
`;

const Dia = styled.h4`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 8px;
`;

const Info = styled.p`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textMuted};
  margin-bottom: 4px;

  svg { color: ${({ theme }) => theme.colors.secondary}; }
`;

const Tipo = styled.span`
  display: inline-block;
  margin-top: 8px;
  background: ${({ theme }) => theme.colors.surfaceAlt};
  padding: 2px 10px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.textMuted};
`;

export default function MassCard({ dia, horario, local, tipo }) {
  return (
    <Card>
      <Dia>{dia}</Dia>
      <Info><FaClock />{horario}</Info>
      <Info><FaMapMarkerAlt />{local}</Info>
      <Tipo>{tipo}</Tipo>
    </Card>
  );
}
