import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Hero from '../components/Hero';
import AvisoCard from '../components/AvisoCard';
import LiturgiaCard from '../components/LiturgiaCard';
import VersiculoCard from '../components/VersiculoCard';
import MassCard from '../components/MassCard';
import EventCard from '../components/EventCard';
import SacramentoCard from '../components/SacramentoCard';
import NoticiaCard from '../components/NoticiaCard';
import GaleriaGrid from '../components/GaleriaGrid';
import VideoCard from '../components/VideoCard';
import CounterSection from '../components/CounterSection';
import NewsletterForm from '../components/NewsletterForm';
import MapaSection from '../components/MapaSection';
import { fetchAvisos } from '../services/avisosService';
import { fetchEventos } from '../services/eventosService';
import { fetchNoticias } from '../services/noticiasService';
import { fetchMidias } from '../services/midiaService';
import { HORARIOS_MISSAS } from '../constants/missas';
import { SACRAMENTOS } from '../constants/sacramentos';

const Section = styled.section`
  padding: ${({ theme }) => theme.spacing.section} 24px;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: ${({ theme }) => theme.spacing.sectionMobile} 24px;
  }
`;

const SectionTitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: ${({ theme }) => theme.fontSizes['3xl']};
  color: ${({ theme }) => theme.colors.primary};
  text-align: center;
  margin-bottom: 40px;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: ${({ theme }) => theme.fontSizes['2xl']};
    margin-bottom: 24px;
  }
`;

const Grid3 = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const Grid4 = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const SacGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 20px;
`;

export default function Home() {
  const [aviso, setAviso] = useState(null);
  const [eventos, setEventos] = useState([]);
  const [noticias, setNoticias] = useState([]);
  const [galeriaImgs, setGaleriaImgs] = useState([]);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    document.title = 'Paróquia Santa Rosa de Viterbo';
    const controller = new AbortController();

    Promise.allSettled([
      fetchAvisos({ ativo: true, limite: 1 }, controller.signal),
      fetchEventos({ publicado: true, limite: 3 }, controller.signal),
      fetchNoticias({ publicado: true, limite: 3 }, controller.signal),
      fetchMidias({ tipo: 'imagem', destaque: true, limite: 6 }, controller.signal),
      fetchMidias({ tipo: 'video', limite: 4 }, controller.signal),
    ]).then(([aRes, eRes, nRes, gRes, vRes]) => {
      if (aRes.status === 'fulfilled' && aRes.value.length > 0) setAviso(aRes.value[0]);
      if (eRes.status === 'fulfilled') setEventos(eRes.value);
      if (nRes.status === 'fulfilled') setNoticias(nRes.value);
      if (gRes.status === 'fulfilled') setGaleriaImgs(gRes.value);
      if (vRes.status === 'fulfilled') setVideos(vRes.value);
    });

    return () => controller.abort();
  }, []);

  const missasPreview = HORARIOS_MISSAS.filter((m) => m.dia === 'Domingo' || m.dia === 'Sábado').slice(0, 4);

  return (
    <>
      <Hero
        title="Paróquia Santa Rosa de Viterbo"
        subtitle="Uma comunidade de fé, esperança e caridade"
        buttonText="Horários das Missas"
        buttonLink="/horarios"
      />

      {aviso && (
        <Section>
          <AvisoCard aviso={aviso} />
        </Section>
      )}

      <Section>
        <SectionTitle>Liturgia do Dia</SectionTitle>
        <LiturgiaCard />
      </Section>

      <Section>
        <SectionTitle>Versículo do Dia</SectionTitle>
        <VersiculoCard />
      </Section>

      <Section>
        <SectionTitle>Próximas Missas</SectionTitle>
        <Grid4>
          {missasPreview.map((m, i) => (
            <MassCard key={i} {...m} />
          ))}
        </Grid4>
      </Section>

      {eventos.length > 0 && (
        <Section>
          <SectionTitle>Próximos Eventos</SectionTitle>
          <Grid3>
            {eventos.map((e) => <EventCard key={e.id} evento={e} />)}
          </Grid3>
        </Section>
      )}

      <Section>
        <SectionTitle>Sacramentos</SectionTitle>
        <SacGrid>
          {SACRAMENTOS.map((s) => <SacramentoCard key={s.id} sacramento={s} />)}
        </SacGrid>
      </Section>

      {noticias.length > 0 && (
        <Section>
          <SectionTitle>Últimas Notícias</SectionTitle>
          <Grid3>
            {noticias.map((n) => <NoticiaCard key={n.id} noticia={n} />)}
          </Grid3>
        </Section>
      )}

      {galeriaImgs.length > 0 && (
        <Section>
          <SectionTitle>Galeria</SectionTitle>
          <GaleriaGrid imagens={galeriaImgs} />
        </Section>
      )}

      {videos.length > 0 && (
        <Section>
          <SectionTitle>Vídeos</SectionTitle>
          <Grid4>
            {videos.map((v) => <VideoCard key={v.id} video={v} />)}
          </Grid4>
        </Section>
      )}

      <CounterSection />
      <NewsletterForm />
      <MapaSection />
    </>
  );
}
