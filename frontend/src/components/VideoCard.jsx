import styled from 'styled-components';
import { FaPlay } from 'react-icons/fa';

const Card = styled.div`
  position: relative;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.sm};
  cursor: pointer;
  transition: transform 0.2s;

  &:hover { transform: translateY(-4px); }
`;

const Thumbnail = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const PlayOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.3);
  opacity: 0;
  transition: opacity 0.2s;

  ${Card}:hover & {
    opacity: 1;
  }
`;

const PlayIcon = styled.div`
  width: 50px;
  height: 50px;
  background: ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.textLight};
  font-size: 18px;
`;

const Body = styled.div`
  padding: 14px;
`;

const Title = styled.h4`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 4px;
`;

const Platform = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.textMuted};
  text-transform: capitalize;
`;

export default function VideoCard({ video, onClick }) {
  return (
    <Card onClick={() => onClick?.(video)}>
      <Thumbnail
        src={video.thumbnail_url || 'https://picsum.photos/400/200?random=' + video.id}
        alt={video.titulo}
        loading="lazy"
      />
      <PlayOverlay>
        <PlayIcon><FaPlay /></PlayIcon>
      </PlayOverlay>
      <Body>
        <Title>{video.titulo}</Title>
        <Platform>{video.plataforma}</Platform>
      </Body>
    </Card>
  );
}
