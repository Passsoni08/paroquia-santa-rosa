import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa';

const FooterWrapper = styled.footer`
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.textLight};
  padding: 60px 24px 24px;
`;

const FooterGrid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 40px;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const Column = styled.div`
  h3 {
    font-family: ${({ theme }) => theme.fonts.accent};
    font-size: ${({ theme }) => theme.fontSizes.lg};
    margin-bottom: 16px;
    color: ${({ theme }) => theme.colors.secondary};
  }

  p, li {
    font-size: ${({ theme }) => theme.fontSizes.sm};
    line-height: 1.8;
    opacity: 0.9;
  }

  a {
    color: ${({ theme }) => theme.colors.textLight};
    opacity: 0.9;
    font-size: ${({ theme }) => theme.fontSizes.sm};
    &:hover { opacity: 1; color: ${({ theme }) => theme.colors.secondary}; }
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 12px;

  a {
    font-size: 20px;
    transition: color 0.2s;
  }
`;

const BottomBar = styled.div`
  max-width: 1200px;
  margin: 40px auto 0;
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  text-align: center;
  font-size: ${({ theme }) => theme.fontSizes.xs};
  opacity: 0.7;
`;

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <FooterWrapper>
      <FooterGrid>
        <Column>
          <h3>Paróquia Santa Rosa</h3>
          <p>Comunidade de fé, esperança e caridade a serviço do povo de Deus.</p>
          <SocialLinks>
            <a href="#" aria-label="Facebook" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
            <a href="#" aria-label="Instagram" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            <a href="#" aria-label="YouTube" target="_blank" rel="noopener noreferrer"><FaYoutube /></a>
          </SocialLinks>
        </Column>

        <Column>
          <h3>Links Rápidos</h3>
          <ul>
            <li><Link to="/sobre">Sobre Nós</Link></li>
            <li><Link to="/sacramentos">Sacramentos</Link></li>
            <li><Link to="/horarios">Horários</Link></li>
            <li><Link to="/eventos">Eventos</Link></li>
            <li><Link to="/contato">Contato</Link></li>
          </ul>
        </Column>

        <Column>
          <h3>Horários de Missa</h3>
          <p>Domingo: 07h, 09h, 19h</p>
          <p>Seg a Sex: 07h</p>
          <p>Qua e Sex: 19h</p>
          <p>Sábado: 07h e 19h</p>
        </Column>

        <Column>
          <h3>Contato</h3>
          <p>Rua das Flores, 123 — Centro</p>
          <p>Santa Rosa de Viterbo — SP</p>
          <p>CEP 14270-000</p>
          <p>(16) 3322-0000</p>
          <p>contato@paroquia.com.br</p>
        </Column>
      </FooterGrid>

      <BottomBar>
        &copy; {year} Paróquia Santa Rosa de Viterbo — Todos os direitos reservados
      </BottomBar>
    </FooterWrapper>
  );
}
