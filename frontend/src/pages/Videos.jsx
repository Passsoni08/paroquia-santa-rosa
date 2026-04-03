import { useState, useEffect } from 'react';
import styled from 'styled-components';
import PageBanner from '../components/PageBanner';
import VideoCard from '../components/VideoCard';
import Loading from '../components/Loading';
import { fetchMidias } from '../services/midiaService';

const Section = styled.section`
  padding: ${({ theme }) => theme.spacing.section} 24px;
  max-width: 1200px;
  margin: 0 auto;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) { grid-template-columns: repeat(3, 1fr); }
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) { grid-template-columns: repeat(2, 1fr); }
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) { grid-template-columns: 1fr; }
`;

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 24px;
`;

const ModalContent = styled.div`
  width: 100%;
  max-width: 800px;
  aspect-ratio: 16 / 9;

  iframe {
    width: 100%;
    height: 100%;
    border: 0;
    border-radius: 8px;
  }
`;

function getEmbedUrl(video) {
  if (video.plataforma === 'youtube') return `https://www.youtube.com/embed/${video.video_id}`;
  if (video.plataforma === 'vimeo') return `https://player.vimeo.com/video/${video.video_id}`;
  return '';
}

export default function Videos() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    document.title = 'Vídeos — Paróquia Santa Rosa de Viterbo';
    const controller = new AbortController();
    fetchMidias({ tipo: 'video', limite: 20 }, controller.signal)
      .then(setVideos)
      .catch(() => {})
      .finally(() => setLoading(false));
    return () => controller.abort();
  }, []);

  return (
    <>
      <PageBanner title="Vídeos" breadcrumb="Início / Vídeos" />
      <Section>
        {loading ? <Loading /> : (
          <Grid>
            {videos.map((v) => <VideoCard key={v.id} video={v} onClick={setSelected} />)}
          </Grid>
        )}
      </Section>

      {selected && (
        <ModalOverlay onClick={() => setSelected(null)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <iframe
              src={getEmbedUrl(selected)}
              title={selected.titulo}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
}
