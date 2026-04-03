import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Loading from '../components/Loading';
import { fetchNoticia } from '../services/noticiasService';

const Article = styled.article`
  max-width: 800px;
  margin: 0 auto;
  padding: 100px 24px 60px;
`;

const CoverImage = styled.img`
  width: 100%;
  max-height: 400px;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  margin-bottom: 32px;
`;

const Title = styled.h1`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: ${({ theme }) => theme.fontSizes['4xl']};
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 12px;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: ${({ theme }) => theme.fontSizes['2xl']};
  }
`;

const Meta = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  margin-bottom: 32px;
`;

const Content = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.md};
  line-height: 1.8;
  color: ${({ theme }) => theme.colors.text};

  p { margin-bottom: 16px; }
  h2, h3 { margin: 24px 0 12px; color: ${({ theme }) => theme.colors.primary}; }
  img { max-width: 100%; border-radius: 8px; margin: 16px 0; }
  blockquote {
    border-left: 4px solid ${({ theme }) => theme.colors.secondary};
    padding-left: 16px;
    margin: 16px 0;
    font-style: italic;
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

export default function NoticiaDetalhe() {
  const { slug } = useParams();
  const [noticia, setNoticia] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    fetchNoticia(slug, controller.signal)
      .then((data) => {
        setNoticia(data);
        document.title = `${data.titulo} — Paróquia Santa Rosa de Viterbo`;
      })
      .catch(() => {})
      .finally(() => setLoading(false));
    return () => controller.abort();
  }, [slug]);

  if (loading) return <Article><Loading /></Article>;
  if (!noticia) return <Article><p>Notícia não encontrada.</p></Article>;

  return (
    <Article>
      {noticia.imagem_capa_url && (
        <CoverImage src={noticia.imagem_capa_url} alt={noticia.titulo} />
      )}
      <Title>{noticia.titulo}</Title>
      <Meta>
        {noticia.publicado_em && new Date(noticia.publicado_em).toLocaleDateString('pt-BR', {
          day: '2-digit', month: 'long', year: 'numeric',
        })}
      </Meta>
      <Content dangerouslySetInnerHTML={{ __html: noticia.conteudo }} />
    </Article>
  );
}
