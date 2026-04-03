import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Card = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.sm};
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-4px);
  }
`;

const Image = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
`;

const Body = styled.div`
  padding: 16px;
`;

const Title = styled.h3`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 6px;
`;

const Resumo = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textMuted};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const Data = styled.span`
  display: block;
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.textMuted};
  margin-top: 8px;
`;

function formatDate(dateStr) {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('pt-BR', {
    day: '2-digit', month: 'long', year: 'numeric',
  });
}

export default function NoticiaCard({ noticia }) {
  return (
    <Card>
      <Link to={`/noticias/${noticia.slug}`}>
        <Image
          src={noticia.imagem_capa_url || 'https://picsum.photos/400/200?random=' + noticia.id}
          alt={noticia.titulo}
          loading="lazy"
        />
        <Body>
          <Title>{noticia.titulo}</Title>
          <Resumo>{noticia.resumo}</Resumo>
          <Data>{formatDate(noticia.publicado_em || noticia.criado_em)}</Data>
        </Body>
      </Link>
    </Card>
  );
}
