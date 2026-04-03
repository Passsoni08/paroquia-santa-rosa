import { Component } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  padding: 40px 24px;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  color: #7B1C1C;
  margin-bottom: 12px;
`;

const Message = styled.p`
  color: #6B6B6B;
  margin-bottom: 20px;
`;

const RetryBtn = styled.button`
  background: #7B1C1C;
  color: #fff;
  padding: 10px 24px;
  border-radius: 4px;
  font-weight: 600;
`;

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  handleRetry = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return (
        <Wrapper>
          <Title>Algo deu errado</Title>
          <Message>Ocorreu um erro inesperado. Tente recarregar a página.</Message>
          <RetryBtn onClick={this.handleRetry}>Tentar novamente</RetryBtn>
        </Wrapper>
      );
    }
    return this.props.children;
  }
}
