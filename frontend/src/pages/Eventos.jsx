import { useState, useEffect } from 'react';
import styled from 'styled-components';
import PageBanner from '../components/PageBanner';
import EventCard from '../components/EventCard';
import Loading from '../components/Loading';
import { fetchEventos } from '../services/eventosService';

const Section = styled.section`
  padding: ${({ theme }) => theme.spacing.section} 24px;
  max-width: 1200px;
  margin: 0 auto;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) { grid-template-columns: repeat(2, 1fr); }
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) { grid-template-columns: 1fr; }
`;

const PageNav = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 40px;
`;

const PageBtn = styled.button`
  padding: 8px 16px;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  background: ${({ $active, theme }) => $active ? theme.colors.primary : theme.colors.surface};
  color: ${({ $active, theme }) => $active ? theme.colors.textLight : theme.colors.text};
  border: 1px solid ${({ theme }) => theme.colors.border};
  font-weight: ${({ $active }) => $active ? 700 : 400};
`;

const Empty = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.colors.textMuted};
  padding: 40px;
`;

export default function Eventos() {
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagina, setPagina] = useState(1);
  const limite = 12;

  useEffect(() => {
    document.title = 'Eventos — Paróquia Santa Rosa de Viterbo';
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    fetchEventos({ publicado: true, limite, pagina }, controller.signal)
      .then(setEventos)
      .catch(() => {})
      .finally(() => setLoading(false));
    return () => controller.abort();
  }, [pagina]);

  return (
    <>
      <PageBanner title="Eventos" breadcrumb="Início / Eventos" />
      <Section>
        {loading ? <Loading /> : eventos.length === 0 ? (
          <Empty>Nenhum evento encontrado.</Empty>
        ) : (
          <>
            <Grid>
              {eventos.map((e) => <EventCard key={e.id} evento={e} />)}
            </Grid>
            {eventos.length >= limite && (
              <PageNav>
                {pagina > 1 && <PageBtn onClick={() => setPagina(pagina - 1)}>Anterior</PageBtn>}
                <PageBtn $active>{pagina}</PageBtn>
                <PageBtn onClick={() => setPagina(pagina + 1)}>Próxima</PageBtn>
              </PageNav>
            )}
          </>
        )}
      </Section>
    </>
  );
}
