import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaCalendar, FaMapMarkerAlt } from 'react-icons/fa';

const Card = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.md};
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
  }
`;

const Image = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const Body = styled.div`
  padding: 20px;
`;

const Title = styled.h3`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 8px;
`;

const Meta = styled.p`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textMuted};
  margin-bottom: 4px;
  svg { color: ${({ theme }) => theme.colors.secondary}; }
`;

const Desc = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textMuted};
  margin-top: 8px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const SaibaMais = styled(Link)`
  display: inline-block;
  margin-top: 12px;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
  &:hover { text-decoration: underline; }
`;

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('pt-BR', {
    day: '2-digit', month: 'short', year: 'numeric',
  });
}

export default function EventCard({ evento }) {
  return (
    <Card>
      <Image
        src={evento.imagem_url || 'https://picsum.photos/400/200?random=' + evento.id}
        alt={evento.titulo}
        loading="lazy"
      />
      <Body>
        <Title>{evento.titulo}</Title>
        <Meta><FaCalendar />{formatDate(evento.data_inicio)}</Meta>
        {evento.local && <Meta><FaMapMarkerAlt />{evento.local}</Meta>}
        <Desc>{evento.descricao}</Desc>
        <SaibaMais to={`/eventos`}>Saiba mais</SaibaMais>
      </Body>
    </Card>
  );
}
