import { Link } from 'react-router-dom';
import styled from 'styled-components';

const HeroWrapper = styled.section`
  position: relative;
  height: 100vh;
  min-height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: ${({ theme }) => theme.colors.textLight};
  background: linear-gradient(rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.55)),
    url(${({ $image }) => $image}) center/cover no-repeat;
`;

const Content = styled.div`
  max-width: 700px;
  padding: 0 24px;
`;

const Title = styled.h1`
  font-family: ${({ theme }) => theme.fonts.accent};
  font-size: ${({ theme }) => theme.fontSizes['5xl']};
  color: ${({ theme }) => theme.colors.textLight};
  margin-bottom: 16px;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: ${({ theme }) => theme.fontSizes['3xl']};
  }
`;

const Subtitle = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  margin-bottom: 32px;
  opacity: 0.9;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: ${({ theme }) => theme.fontSizes.lg};
  }
`;

const HeroButton = styled(Link)`
  display: inline-block;
  background: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.text};
  padding: 14px 36px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-weight: 700;
  font-size: ${({ theme }) => theme.fontSizes.md};
  transition: background 0.2s, transform 0.2s;

  &:hover {
    background: ${({ theme }) => theme.colors.secondaryLight};
    color: ${({ theme }) => theme.colors.text};
    transform: translateY(-2px);
  }
`;

export default function Hero({ image, title, subtitle, buttonText, buttonLink }) {
  return (
    <HeroWrapper $image={image || 'https://picsum.photos/1920/1080?grayscale'}>
      <Content>
        <Title>{title || 'Paróquia Santa Rosa de Viterbo'}</Title>
        <Subtitle>{subtitle || 'Uma comunidade de fé, esperança e caridade'}</Subtitle>
        {buttonText && (
          <HeroButton to={buttonLink || '/horarios'}>{buttonText}</HeroButton>
        )}
      </Content>
    </HeroWrapper>
  );
}
