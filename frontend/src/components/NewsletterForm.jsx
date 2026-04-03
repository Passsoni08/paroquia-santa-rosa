import { useState } from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { inscreverNewsletter } from '../services/newsletterService';

const Section = styled.section`
  background: ${({ theme }) => theme.colors.surfaceAlt};
  padding: ${({ theme }) => theme.spacing.sectionMobile} 24px;
  text-align: center;
`;

const Title = styled.h2`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 8px;
`;

const Desc = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  margin-bottom: 24px;
  font-size: ${({ theme }) => theme.fontSizes.md};
`;

const Form = styled.form`
  display: flex;
  gap: 12px;
  max-width: 460px;
  margin: 0 auto;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
  }
`;

const Input = styled.input`
  flex: 1;
  padding: 12px 16px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: ${({ theme }) => theme.fontSizes.md};
`;

const Btn = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.textLight};
  padding: 12px 28px;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-weight: 700;
  white-space: nowrap;
  transition: background 0.2s;

  &:hover { background: ${({ theme }) => theme.colors.primaryDark}; }
  &:disabled { opacity: 0.6; }
`;

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await inscreverNewsletter(email);
      toast.success('Inscrição realizada com sucesso!');
      setEmail('');
    } catch (err) {
      const msg = err.response?.data?.detail || 'Erro ao inscrever. Tente novamente.';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Section>
      <Title>Receba nossas novidades</Title>
      <Desc>Inscreva-se e fique por dentro dos eventos e notícias da paróquia.</Desc>
      <Form onSubmit={handleSubmit}>
        <Input
          type="email"
          placeholder="Seu melhor e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          aria-label="E-mail para newsletter"
        />
        <Btn type="submit" disabled={loading}>
          {loading ? 'Enviando...' : 'Inscrever'}
        </Btn>
      </Form>
    </Section>
  );
}
