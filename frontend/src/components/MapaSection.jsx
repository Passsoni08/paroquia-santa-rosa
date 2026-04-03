import styled from 'styled-components';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaWhatsapp } from 'react-icons/fa';

const Section = styled.section`
  padding: ${({ theme }) => theme.spacing.section} 24px;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: ${({ theme }) => theme.spacing.sectionMobile} 24px;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const MapWrapper = styled.div`
  border-radius: ${({ theme }) => theme.borderRadius.md};
  overflow: hidden;
  height: 350px;

  iframe {
    width: 100%;
    height: 100%;
    border: 0;
  }
`;

const ContatoInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Title = styled.h2`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  color: ${({ theme }) => theme.colors.primary};
`;

const InfoItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: ${({ theme }) => theme.colors.text};

  svg {
    color: ${({ theme }) => theme.colors.secondary};
    font-size: 18px;
    margin-top: 3px;
    flex-shrink: 0;
  }
`;

export default function MapaSection() {
  return (
    <Section>
      <Grid>
        <MapWrapper>
          <iframe
            src="https://maps.google.com/maps?q=-21.47,-47.35&z=15&output=embed"
            title="Localização da Paróquia"
            loading="lazy"
            allowFullScreen
          />
        </MapWrapper>
        <ContatoInfo>
          <Title>Como nos encontrar</Title>
          <InfoItem><FaMapMarkerAlt /><span>Rua das Flores, 123 — Centro<br />Santa Rosa de Viterbo — SP, 14270-000</span></InfoItem>
          <InfoItem><FaPhone /><span>(16) 3322-0000</span></InfoItem>
          <InfoItem><FaWhatsapp /><span>(16) 98888-7777</span></InfoItem>
          <InfoItem><FaEnvelope /><span>contato@paroquia.com.br</span></InfoItem>
        </ContatoInfo>
      </Grid>
    </Section>
  );
}
