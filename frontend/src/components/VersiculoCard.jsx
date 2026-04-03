import styled from 'styled-components';
import { FaSyncAlt } from 'react-icons/fa';
import { useBibleVerse } from '../hooks/useBibleVerse';

const Card = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 2px solid ${({ theme }) => theme.colors.secondary};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: 24px;
  max-width: 500px;
  margin: 0 auto;
  text-align: center;
`;

const Texto = styled.p`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-style: italic;
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 12px;
`;

const Referencia = styled.p`
  color: ${({ theme }) => theme.colors.secondary};
  font-weight: 700;
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

const RefreshBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-top: 16px;
  background: none;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.fontSizes.sm};

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const SkeletonLine = styled.div`
  height: 14px;
  background: ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  margin: 6px auto;
  width: ${({ $width }) => $width || '100%'};
  animation: pulse 1.5s ease-in-out infinite;

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
`;

export default function VersiculoCard() {
  const { verse, loading, refresh } = useBibleVerse();

  if (loading) {
    return (
      <Card>
        <SkeletonLine $width="90%" />
        <SkeletonLine $width="70%" />
      </Card>
    );
  }

  if (!verse) return null;

  return (
    <Card>
      <Texto>&ldquo;{verse.texto}&rdquo;</Texto>
      <Referencia>{verse.referencia}</Referencia>
      <RefreshBtn onClick={refresh} aria-label="Outro versículo">
        <FaSyncAlt /> Outro versículo
      </RefreshBtn>
    </Card>
  );
}
