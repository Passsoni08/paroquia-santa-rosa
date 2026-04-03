import { useEffect } from 'react';
import styled from 'styled-components';
import PageBanner from '../components/PageBanner';
import MassCard from '../components/MassCard';
import { HORARIOS_MISSAS, CONFISSOES } from '../constants/missas';

const Section = styled.section`
  padding: ${({ theme }) => theme.spacing.section} 24px;
  max-width: 1000px;
  margin: 0 auto;
`;

const Title = styled.h2`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 24px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 16px;
  margin-bottom: 48px;
`;

const ConfissaoCard = styled.div`
  background: ${({ theme }) => theme.colors.surfaceAlt};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: 16px 20px;
  border-left: 4px solid ${({ theme }) => theme.colors.primary};
  margin-bottom: 12px;

  strong { color: ${({ theme }) => theme.colors.primary}; }
  span { color: ${({ theme }) => theme.colors.textMuted}; margin-left: 8px; }
`;

const CTA = styled.p`
  text-align: center;
  margin-top: 32px;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.fontSizes.md};

  a {
    color: ${({ theme }) => theme.colors.primary};
    font-weight: 600;
  }
`;

export default function HorarioMissas() {
  useEffect(() => { document.title = 'Horários de Missas — Paróquia Santa Rosa de Viterbo'; }, []);

  return (
    <>
      <PageBanner title="Horários das Missas" breadcrumb="Início / Horários" />
      <Section>
        <Title>Missas Semanais</Title>
        <Grid>
          {HORARIOS_MISSAS.map((m, i) => <MassCard key={i} {...m} />)}
        </Grid>

        <Title>Confissões</Title>
        {CONFISSOES.map((c, i) => (
          <ConfissaoCard key={i}>
            <strong>{c.dia}</strong>
            <span>{c.horario} — {c.local}</span>
          </ConfissaoCard>
        ))}

        <CTA>
          Dúvidas sobre horários especiais? <a href="/contato">Entre em contato</a>.
        </CTA>
      </Section>
    </>
  );
}
