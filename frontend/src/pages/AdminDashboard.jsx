import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaBullhorn, FaCalendarAlt, FaNewspaper, FaEnvelope } from 'react-icons/fa';
import { useAuth } from '../hooks/useAuth';
import { fetchAvisos } from '../services/avisosService';
import { fetchEventos } from '../services/eventosService';
import { fetchNoticias } from '../services/noticiasService';
import { countNaoLidas } from '../services/contatoService';

const Title = styled.h1`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 24px;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 32px;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const StatCard = styled.div`
  background: ${({ theme }) => theme.admin.card};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: 20px;
  box-shadow: ${({ theme }) => theme.shadows.sm};
  display: flex;
  align-items: center;
  gap: 16px;
`;

const StatIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: ${({ theme }) => theme.colors.textLight};
  background: ${({ $color }) => $color};
`;

const StatInfo = styled.div`
  h3 { font-size: 1.5rem; font-weight: 700; color: ${({ theme }) => theme.colors.text}; }
  p { font-size: ${({ theme }) => theme.fontSizes.sm}; color: ${({ theme }) => theme.colors.textMuted}; }
`;

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Bom dia';
  if (h < 18) return 'Boa tarde';
  return 'Boa noite';
}

export default function AdminDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({ avisos: 0, eventos: 0, noticias: 0, mensagens: 0 });

  useEffect(() => {
    document.title = 'Dashboard — Admin';
    const controller = new AbortController();

    Promise.allSettled([
      fetchAvisos({ ativo: true, limite: 100 }, controller.signal),
      fetchEventos({ limite: 100 }, controller.signal),
      fetchNoticias({ limite: 100 }, controller.signal),
      countNaoLidas(controller.signal),
    ]).then(([a, e, n, m]) => {
      setStats({
        avisos: a.status === 'fulfilled' ? a.value.length : 0,
        eventos: e.status === 'fulfilled' ? e.value.length : 0,
        noticias: n.status === 'fulfilled' ? n.value.length : 0,
        mensagens: m.status === 'fulfilled' ? m.value : 0,
      });
    });

    return () => controller.abort();
  }, []);

  return (
    <>
      <Title>{getGreeting()}, {user?.nome || 'Admin'}</Title>

      <StatsGrid>
        <StatCard>
          <StatIcon $color="#E74C3C"><FaBullhorn /></StatIcon>
          <StatInfo><h3>{stats.avisos}</h3><p>Avisos ativos</p></StatInfo>
        </StatCard>
        <StatCard>
          <StatIcon $color="#3498DB"><FaCalendarAlt /></StatIcon>
          <StatInfo><h3>{stats.eventos}</h3><p>Eventos</p></StatInfo>
        </StatCard>
        <StatCard>
          <StatIcon $color="#27AE60"><FaNewspaper /></StatIcon>
          <StatInfo><h3>{stats.noticias}</h3><p>Notícias</p></StatInfo>
        </StatCard>
        <StatCard>
          <StatIcon $color="#F39C12"><FaEnvelope /></StatIcon>
          <StatInfo><h3>{stats.mensagens}</h3><p>Mensagens não lidas</p></StatInfo>
        </StatCard>
      </StatsGrid>
    </>
  );
}
