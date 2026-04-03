import styled from 'styled-components';

const Banner = styled.section`
  background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),
    url(${({ $image }) => $image || 'https://picsum.photos/1920/400?grayscale'}) center/cover no-repeat;
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.textLight};
  text-align: center;
  padding: 0 24px;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    height: 220px;
  }
`;

const Title = styled.h1`
  font-family: ${({ theme }) => theme.fonts.accent};
  font-size: ${({ theme }) => theme.fontSizes['4xl']};
  color: ${({ theme }) => theme.colors.textLight};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: ${({ theme }) => theme.fontSizes['2xl']};
  }
`;

const Breadcrumb = styled.p`
  margin-top: 8px;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  opacity: 0.8;
`;

export default function PageBanner({ title, breadcrumb, image }) {
  return (
    <Banner $image={image}>
      <Title>{title}</Title>
      {breadcrumb && <Breadcrumb>{breadcrumb}</Breadcrumb>}
    </Banner>
  );
}
