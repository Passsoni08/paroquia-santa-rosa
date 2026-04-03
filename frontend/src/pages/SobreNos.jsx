import { useEffect } from 'react';
import styled from 'styled-components';
import PageBanner from '../components/PageBanner';
import { FaHandsHelping, FaCross, FaHeart } from 'react-icons/fa';

const Section = styled.section`
  padding: ${({ theme }) => theme.spacing.section} 24px;
  max-width: 1000px;
  margin: 0 auto;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: ${({ theme }) => theme.spacing.sectionMobile} 24px;
  }
`;

const TwoCol = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  align-items: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const Title = styled.h2`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 16px;
`;

const Text = styled.p`
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.8;
  margin-bottom: 12px;
`;

const Image = styled.img`
  border-radius: ${({ theme }) => theme.borderRadius.md};
  box-shadow: ${({ theme }) => theme.shadows.md};
`;

const ValoresGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-top: 40px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const ValorCard = styled.div`
  text-align: center;
  padding: 24px;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  box-shadow: ${({ theme }) => theme.shadows.sm};

  svg { font-size: 32px; color: ${({ theme }) => theme.colors.secondary}; margin-bottom: 12px; }
  h3 { font-size: ${({ theme }) => theme.fontSizes.lg}; color: ${({ theme }) => theme.colors.primary}; margin-bottom: 8px; }
  p { font-size: ${({ theme }) => theme.fontSizes.sm}; color: ${({ theme }) => theme.colors.textMuted}; }
`;

const Versiculo = styled.blockquote`
  text-align: center;
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-style: italic;
  color: ${({ theme }) => theme.colors.primary};
  max-width: 600px;
  margin: 40px auto 0;
  padding: 24px;
  border-left: 4px solid ${({ theme }) => theme.colors.secondary};

  cite {
    display: block;
    margin-top: 8px;
    font-size: ${({ theme }) => theme.fontSizes.sm};
    color: ${({ theme }) => theme.colors.textMuted};
    font-style: normal;
  }
`;

export default function SobreNos() {
  useEffect(() => { document.title = 'Sobre Nós — Paróquia Santa Rosa de Viterbo'; }, []);

  return (
    <>
      <PageBanner title="Sobre Nós" breadcrumb="Início / Sobre Nós" />

      <Section>
        <TwoCol>
          <div>
            <Title>Nossa História</Title>
            <Text>
              A Paróquia Santa Rosa de Viterbo foi fundada com o propósito de servir à comunidade católica
              da cidade de Santa Rosa de Viterbo e região. Ao longo de décadas, a paróquia tem sido um
              centro de fé, acolhimento e caridade.
            </Text>
            <Text>
              Nossa comunidade é formada por famílias dedicadas que, juntas, vivem e transmitem os
              valores cristãos, promovendo o bem comum e o crescimento espiritual de todos os fiéis.
            </Text>
          </div>
          <Image src="https://picsum.photos/500/400?grayscale" alt="Fachada da Igreja" loading="lazy" />
        </TwoCol>

        <ValoresGrid>
          <ValorCard>
            <FaCross />
            <h3>Fé</h3>
            <p>Vivemos e testemunhamos a fé católica em comunidade, guiados pelo Evangelho.</p>
          </ValorCard>
          <ValorCard>
            <FaHeart />
            <h3>Caridade</h3>
            <p>Servimos aos mais necessitados com amor e dedicação, seguindo o exemplo de Cristo.</p>
          </ValorCard>
          <ValorCard>
            <FaHandsHelping />
            <h3>Comunidade</h3>
            <p>Acolhemos a todos como irmãos, construindo laços de fraternidade e solidariedade.</p>
          </ValorCard>
        </ValoresGrid>

        <Versiculo>
          &ldquo;Onde dois ou três estiverem reunidos em meu nome, ali estou eu no meio deles.&rdquo;
          <cite>Mateus 18:20</cite>
        </Versiculo>
      </Section>
    </>
  );
}
