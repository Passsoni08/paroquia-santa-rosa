import { useState } from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { enviarMensagem } from '../services/contatoService';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
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
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  transition: border-color 0.2s;

  &:focus { border-color: ${({ theme }) => theme.colors.primary}; }
`;

const Select = styled.select`
  padding: 10px 14px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
`;

const Textarea = styled.textarea`
  padding: 10px 14px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  min-height: 120px;
  resize: vertical;

  &:focus { border-color: ${({ theme }) => theme.colors.primary}; }
`;

const SubmitBtn = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.textLight};
  padding: 12px 32px;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-weight: 700;
  font-size: ${({ theme }) => theme.fontSizes.md};
  transition: background 0.2s;
  align-self: flex-start;

  &:hover { background: ${({ theme }) => theme.colors.primaryDark}; }
  &:disabled { opacity: 0.6; cursor: not-allowed; }
`;

const ASSUNTOS = [
  'Batismo', 'Casamento', 'Informações', 'Doações', 'Pastoral', 'Outros',
];

export default function ContatoForm() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    nome: '', email: '', telefone: '', assunto: '', mensagem: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await enviarMensagem(form);
      toast.success('Mensagem enviada com sucesso!');
      setForm({ nome: '', email: '', telefone: '', assunto: '', mensagem: '' });
    } catch (err) {
      const msg = err.response?.data?.detail || 'Erro ao enviar mensagem. Tente novamente.';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Field>
          <Label htmlFor="nome">Nome *</Label>
          <Input id="nome" name="nome" value={form.nome} onChange={handleChange} required />
        </Field>
        <Field>
          <Label htmlFor="email">E-mail *</Label>
          <Input id="email" name="email" type="email" value={form.email} onChange={handleChange} required />
        </Field>
      </Row>
      <Row>
        <Field>
          <Label htmlFor="telefone">Telefone</Label>
          <Input id="telefone" name="telefone" value={form.telefone} onChange={handleChange} />
        </Field>
        <Field>
          <Label htmlFor="assunto">Assunto *</Label>
          <Select id="assunto" name="assunto" value={form.assunto} onChange={handleChange} required>
            <option value="">Selecione</option>
            {ASSUNTOS.map((a) => <option key={a} value={a}>{a}</option>)}
          </Select>
        </Field>
      </Row>
      <Field>
        <Label htmlFor="mensagem">Mensagem *</Label>
        <Textarea id="mensagem" name="mensagem" value={form.mensagem} onChange={handleChange} required />
      </Field>
      <SubmitBtn type="submit" disabled={loading}>
        {loading ? 'Enviando...' : 'Enviar Mensagem'}
      </SubmitBtn>
    </Form>
  );
}
