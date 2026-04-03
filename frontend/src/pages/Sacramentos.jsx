import { useEffect } from 'react';
import styled from 'styled-components';
import PageBanner from '../components/PageBanner';
import { SACRAMENTOS } from '../constants/sacramentos';

const Section = styled.section`
  padding: ${({ theme }) => theme.spacing.section} 24px;
  max-width: 900px;
  margin: 0 auto;
`;

const Intro = styled.p`
  text-align: center;
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.textMuted};
  margin-bottom: 48px;
  line-height: 1.7;
`;

const SacItem = styled.div`
  display: flex;
  gap: 24px;
  margin-bottom: 48px;
  align-items: flex-start;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
  }
`;

const IconWrap = styled.div`
  width: 60px;
  height: 60px;
  background: ${({ theme }) => theme.colors.surfaceAlt};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-size: 24px;
  color: ${({ theme }) => theme.colors.secondary};
`;

const Content = styled.div`
  flex: 1;

  h3 {
    font-family: ${({ theme }) => theme.fonts.heading};
    font-size: ${({ theme }) => theme.fontSizes.xl};
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: 8px;
  }

  p {
    color: ${({ theme }) => theme.colors.text};
    line-height: 1.7;
    margin-bottom: 12px;
  }
`;

const ReqList = styled.ul`
  li {
    position: relative;
    padding-left: 16px;
    margin-bottom: 6px;
    font-size: ${({ theme }) => theme.fontSizes.sm};
    color: ${({ theme }) => theme.colors.textMuted};

    &::before {
      content: '•';
      position: absolute;
      left: 0;
      color: ${({ theme }) => theme.colors.secondary};
    }
  }
`;

export default function Sacramentos() {
  useEffect(() => { document.title = 'Sacramentos — Paróquia Santa Rosa de Viterbo'; }, []);

  return (
    <>
      <PageBanner title="Sacramentos" breadcrumb="Início / Sacramentos" />
      <Section>
        <Intro>
          Os sete sacramentos são sinais eficazes da graça de Deus, instituídos por Cristo e confiados à Igreja,
          pelos quais nos é dispensada a vida divina.
        </Intro>

        {SACRAMENTOS.map((sac) => {
          const Icon = sac.icon;
          return (
            <SacItem key={sac.id}>
              <IconWrap><Icon /></IconWrap>
              <Content>
                <h3>{sac.nome}</h3>
                <p>{sac.descricao}</p>
                <ReqList>
                  {sac.requisitos.map((req, i) => <li key={i}>{req}</li>)}
                </ReqList>
              </Content>
            </SacItem>
          );
        })}
      </Section>
    </>
  );
}
