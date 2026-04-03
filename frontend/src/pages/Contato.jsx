import { useEffect } from 'react';
import styled from 'styled-components';
import PageBanner from '../components/PageBanner';
import ContatoForm from '../components/ContatoForm';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaWhatsapp } from 'react-icons/fa';

const Section = styled.section`
  padding: ${({ theme }) => theme.spacing.section} 24px;
  max-width: 1100px;
  margin: 0 auto;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 48px;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const InfoCol = styled.div`
  h2 {
    font-family: ${({ theme }) => theme.fonts.heading};
    font-size: ${({ theme }) => theme.fontSizes['2xl']};
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: 20px;
  }
`;

const InfoItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 16px;
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: ${({ theme }) => theme.colors.text};

  svg {
    color: ${({ theme }) => theme.colors.secondary};
    font-size: 18px;
    margin-top: 3px;
    flex-shrink: 0;
  }
`;

const MapWrapper = styled.div`
  margin-top: 24px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  overflow: hidden;
  height: 250px;

  iframe { width: 100%; height: 100%; border: 0; }
`;

export default function Contato() {
  useEffect(() => { document.title = 'Contato — Paróquia Santa Rosa de Viterbo'; }, []);

  return (
    <>
      <PageBanner title="Contato" breadcrumb="Início / Contato" />
      <Section>
        <Grid>
          <div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', color: '#7B1C1C', marginBottom: 20 }}>
              Envie sua mensagem
            </h2>
            <ContatoForm />
          </div>
          <InfoCol>
            <h2>Informações</h2>
            <InfoItem><FaMapMarkerAlt /><span>Rua das Flores, 123 — Centro<br />Santa Rosa de Viterbo — SP, 14270-000</span></InfoItem>
            <InfoItem><FaPhone /><span>(16) 3322-0000</span></InfoItem>
            <InfoItem><FaWhatsapp /><span>(16) 98888-7777</span></InfoItem>
            <InfoItem><FaEnvelope /><span>contato@paroquia.com.br</span></InfoItem>
            <MapWrapper>
              <iframe
                src="https://maps.google.com/maps?q=-21.47,-47.35&z=15&output=embed"
                title="Localização"
                loading="lazy"
                allowFullScreen
              />
            </MapWrapper>
          </InfoCol>
        </Grid>
      </Section>
    </>
  );
}
