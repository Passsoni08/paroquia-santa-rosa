import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { useAuth } from '../hooks/useAuth';

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.admin.content};
  padding: 24px;
`;

const Card = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: 40px;
  width: 100%;
  max-width: 400px;
  box-shadow: ${({ theme }) => theme.shadows.lg};
`;

const Logo = styled.h1`
  font-family: ${({ theme }) => theme.fonts.accent};
  font-size: ${({ theme }) => theme.fontSizes['xl']};
  color: ${({ theme }) => theme.colors.primary};
  text-align: center;
  margin-bottom: 32px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Label = styled.label`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

const Input = styled.input`
  padding: 10px 14px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: ${({ theme }) => theme.fontSizes.md};
  width: 100%;
`;

const Btn = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.textLight};
  padding: 12px;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-weight: 700;
  font-size: ${({ theme }) => theme.fontSizes.md};
  transition: background 0.2s;

  &:hover { background: ${({ theme }) => theme.colors.primaryDark}; }
  &:disabled { opacity: 0.6; }
`;

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, senha);
      navigate('/admin');
    } catch {
      toast.error('E-mail ou senha incorretos');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Wrapper>
      <Card>
        <Logo>Paróquia Admin</Logo>
        <Form onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="email">E-mail</Label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div>
            <Label htmlFor="senha">Senha</Label>
            <Input id="senha" type="password" value={senha} onChange={(e) => setSenha(e.target.value)} required />
          </div>
          <Btn type="submit" disabled={loading}>
            {loading ? 'Entrando...' : 'Entrar'}
          </Btn>
        </Form>
      </Card>
    </Wrapper>
  );
}
