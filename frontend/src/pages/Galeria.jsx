import { useState, useEffect } from 'react';
import styled from 'styled-components';
import PageBanner from '../components/PageBanner';
import GaleriaGrid from '../components/GaleriaGrid';
import Loading from '../components/Loading';
import { fetchMidias } from '../services/midiaService';

const Section = styled.section`
  padding: ${({ theme }) => theme.spacing.section} 24px;
  max-width: 1200px;
  margin: 0 auto;
`;

const Filters = styled.div`
  display: flex;
  gap: 12px;
  justify-content: center;
  margin-bottom: 32px;
  flex-wrap: wrap;
`;

const FilterBtn = styled.button`
  padding: 8px 20px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background: ${({ $active, theme }) => $active ? theme.colors.primary : theme.colors.surface};
  color: ${({ $active, theme }) => $active ? theme.colors.textLight : theme.colors.text};
  border: 1px solid ${({ $active, theme }) => $active ? theme.colors.primary : theme.colors.border};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ $active }) => $active ? 700 : 400};
`;

const CATEGORIAS = ['Todas', 'Missas', 'Festas', 'Eventos', 'Obras'];

export default function Galeria() {
  const [imagens, setImagens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoria, setCategoria] = useState('Todas');

  useEffect(() => {
    document.title = 'Galeria — Paróquia Santa Rosa de Viterbo';
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    const params = { tipo: 'imagem', limite: 30 };
    if (categoria !== 'Todas') params.categoria = categoria.toLowerCase();
    fetchMidias(params, controller.signal)
      .then(setImagens)
      .catch(() => {})
      .finally(() => setLoading(false));
    return () => controller.abort();
  }, [categoria]);

  return (
    <>
      <PageBanner title="Galeria" breadcrumb="Início / Galeria" />
      <Section>
        <Filters>
          {CATEGORIAS.map((cat) => (
            <FilterBtn key={cat} $active={categoria === cat} onClick={() => setCategoria(cat)}>
              {cat}
            </FilterBtn>
          ))}
        </Filters>
        {loading ? <Loading /> : <GaleriaGrid imagens={imagens} />}
      </Section>
    </>
  );
}
