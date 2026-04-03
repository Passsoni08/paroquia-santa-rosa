import { useState, useEffect } from 'react';
import styled from 'styled-components';
import PageBanner from '../components/PageBanner';
import NoticiaCard from '../components/NoticiaCard';
import Loading from '../components/Loading';
import { fetchNoticias } from '../services/noticiasService';

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

const Empty = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.colors.textMuted};
  padding: 40px;
`;

export default function Noticias() {
  const [noticias, setNoticias] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = 'Notícias — Paróquia Santa Rosa de Viterbo';
    const controller = new AbortController();
    fetchNoticias({ publicado: true, limite: 12 }, controller.signal)
      .then(setNoticias)
      .catch(() => {})
      .finally(() => setLoading(false));
    return () => controller.abort();
  }, []);

  return (
    <>
      <PageBanner title="Notícias" breadcrumb="Início / Notícias" />
      <Section>
        {loading ? <Loading /> : noticias.length === 0 ? (
          <Empty>Nenhuma notícia encontrada.</Empty>
        ) : (
          <Grid>
            {noticias.map((n) => <NoticiaCard key={n.id} noticia={n} />)}
          </Grid>
        )}
      </Section>
    </>
  );
}
