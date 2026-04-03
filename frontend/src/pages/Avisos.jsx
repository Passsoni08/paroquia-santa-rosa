import { useState, useEffect } from 'react';
import styled from 'styled-components';
import PageBanner from '../components/PageBanner';
import Loading from '../components/Loading';
import { fetchAvisos } from '../services/avisosService';

const Section = styled.section`
  padding: ${({ theme }) => theme.spacing.section} 24px;
  max-width: 800px;
  margin: 0 auto;
`;

const AvisoItem = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: 24px;
  margin-bottom: 16px;
  box-shadow: ${({ theme }) => theme.shadows.sm};
  border-left: 4px solid ${({ theme }) => theme.colors.primary};
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  flex-wrap: wrap;
  gap: 8px;
`;

const Title = styled.h3`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.primary};
`;

const Badge = styled.span`
  background: ${({ theme }) => theme.colors.surfaceAlt};
  color: ${({ theme }) => theme.colors.textMuted};
  padding: 2px 10px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  text-transform: capitalize;
`;

const DateText = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.textMuted};
`;

const Body = styled.p`
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.7;
`;

export default function Avisos() {
  const [avisos, setAvisos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = 'Avisos — Paróquia Santa Rosa de Viterbo';
    const controller = new AbortController();
    fetchAvisos({ limite: 20 }, controller.signal)
      .then(setAvisos)
      .catch(() => {})
      .finally(() => setLoading(false));
    return () => controller.abort();
  }, []);

  return (
    <>
      <PageBanner title="Avisos" breadcrumb="Início / Avisos" />
      <Section>
        {loading ? <Loading /> : avisos.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#6B6B6B' }}>Nenhum aviso publicado.</p>
        ) : avisos.map((aviso) => (
          <AvisoItem key={aviso.id}>
            <Header>
              <Title>{aviso.titulo}</Title>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <Badge>{aviso.categoria}</Badge>
                <DateText>{new Date(aviso.criado_em).toLocaleDateString('pt-BR')}</DateText>
              </div>
            </Header>
            <Body>{aviso.conteudo}</Body>
          </AvisoItem>
        ))}
      </Section>
    </>
  );
}
