import styled from 'styled-components';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const ImageItem = styled.div`
  border-radius: ${({ theme }) => theme.borderRadius.md};
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover { transform: scale(1.02); }
`;

const Img = styled.img`
  width: 100%;
  height: 240px;
  object-fit: cover;
`;

export default function GaleriaGrid({ imagens, onImageClick }) {
  return (
    <Grid>
      {imagens.map((img) => (
        <ImageItem key={img.id} onClick={() => onImageClick?.(img)}>
          <Img src={img.arquivo_url} alt={img.titulo} loading="lazy" />
        </ImageItem>
      ))}
    </Grid>
  );
}
