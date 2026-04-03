import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 200px;
  width: 100%;
`;

const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 3px solid ${({ theme }) => theme.colors.border};
  border-top-color: ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
`;

export default function Loading() {
  return (
    <Wrapper>
      <Spinner aria-label="Carregando" />
    </Wrapper>
  );
}
