import styled from 'styled-components';
import { FaBell } from 'react-icons/fa';

const Banner = styled.div`
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.textLight};
  padding: 20px 32px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  display: flex;
  align-items: flex-start;
  gap: 16px;
`;

const IconWrap = styled.div`
  font-size: 24px;
  color: ${({ theme }) => theme.colors.secondary};
  flex-shrink: 0;
  margin-top: 2px;
`;

const Content = styled.div`
  flex: 1;
`;

const Title = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: 700;
  margin-bottom: 4px;
  color: ${({ theme }) => theme.colors.textLight};
`;

const Text = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  opacity: 0.9;
  line-height: 1.6;
`;

const Badge = styled.span`
  display: inline-block;
  background: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.text};
  padding: 2px 10px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: 700;
  margin-top: 8px;
`;

export default function AvisoCard({ aviso }) {
  return (
    <Banner>
      <IconWrap><FaBell /></IconWrap>
      <Content>
        <Title>{aviso.titulo}</Title>
        <Text>{aviso.conteudo}</Text>
        <Badge>{aviso.categoria}</Badge>
      </Content>
    </Banner>
  );
}
