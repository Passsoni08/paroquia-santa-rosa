import { useState } from 'react';
import styled from 'styled-components';
import { LITURGICAL_COLORS } from '../constants/liturgicalColors';
import { useLiturgia } from '../hooks/useLiturgia';

const Card = styled.div`
  background: ${({ theme }) => theme.colors.surfaceAlt};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: 32px;
  max-width: 700px;
  margin: 0 auto;
  box-shadow: ${({ theme }) => theme.shadows.gold};
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
  flex-wrap: wrap;
  gap: 8px;
`;

const Titulo = styled.h3`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: ${({ theme }) => theme.fontSizes['xl']};
  color: ${({ theme }) => theme.colors.primary};
`;

const ColorBadge = styled.span`
  display: inline-block;
  padding: 4px 14px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: 700;
  background: ${({ $bg }) => $bg};
  color: ${({ $text }) => $text};
`;

const Evangelho = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.md};
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.text};
  margin-top: 12px;

  p { margin-bottom: 8px; }
`;

const Referencia = styled.p`
  font-style: italic;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  margin-top: 12px;
`;

const ExpandBtn = styled.button`
  background: none;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 600;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  margin-top: 8px;

  &:hover { text-decoration: underline; }
`;

const DesatualizadoBadge = styled.span`
  display: inline-block;
  background: #F39C12;
  color: #fff;
  padding: 2px 10px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.fontSizes.xs};
`;

const SkeletonLine = styled.div`
  height: 16px;
  background: ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  margin-bottom: 8px;
  width: ${({ $width }) => $width || '100%'};
  animation: pulse 1.5s ease-in-out infinite;

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
`;

export default function LiturgiaCard() {
  const { liturgia, loading } = useLiturgia();
  const [expanded, setExpanded] = useState(false);

  if (loading) {
    return (
      <Card>
        <SkeletonLine $width="60%" />
        <SkeletonLine />
        <SkeletonLine />
        <SkeletonLine $width="80%" />
      </Card>
    );
  }

  if (!liturgia) return null;

  const { payload, desatualizado } = liturgia;
  const cor = LITURGICAL_COLORS[payload?.cor] || LITURGICAL_COLORS.Verde;
  const evangelho = payload?.leituras?.evangelho;
  const textoEvangelho = evangelho?.texto || '';
  const paragrafos = textoEvangelho.split('\n').filter(Boolean);
  const visivel = expanded ? paragrafos : paragrafos.slice(0, 3);

  return (
    <Card>
      <Header>
        <Titulo>{payload?.liturgia || 'Liturgia do Dia'}</Titulo>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <ColorBadge $bg={cor.hex} $text={cor.textColor}>{cor.label}</ColorBadge>
          {desatualizado && <DesatualizadoBadge>Conteúdo de {payload?.data}</DesatualizadoBadge>}
        </div>
      </Header>

      <Evangelho>
        {visivel.map((p, i) => <p key={i}>{p}</p>)}
      </Evangelho>

      {evangelho?.referencia && (
        <Referencia>{evangelho.referencia}</Referencia>
      )}

      {paragrafos.length > 3 && (
        <ExpandBtn onClick={() => setExpanded(!expanded)}>
          {expanded ? 'Mostrar menos' : 'Ler completo'}
        </ExpandBtn>
      )}
    </Card>
  );
}
