import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  padding: 40px 24px;
  text-align: center;
`;

const Code = styled.h1`
  font-family: ${({ theme }) => theme.fonts.accent};
  font-size: 6rem;
  color: ${({ theme }) => theme.colors.secondary};
  margin-bottom: 8px;
`;

const Message = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.textMuted};
  margin-bottom: 24px;
`;

const HomeBtn = styled(Link)`
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.textLight};
  padding: 12px 32px;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-weight: 700;
  transition: background 0.2s;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
    color: ${({ theme }) => theme.colors.textLight};
  }
`;

export default function NotFound() {
  return (
    <Wrapper>
      <Code>404</Code>
      <Message>Página não encontrada</Message>
      <HomeBtn to="/">Voltar ao Início</HomeBtn>
    </Wrapper>
  );
}
