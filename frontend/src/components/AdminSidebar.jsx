import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { FaTachometerAlt, FaBullhorn, FaCalendarAlt, FaNewspaper, FaImages, FaVideo, FaEnvelope } from 'react-icons/fa';
import { useAdminPolling } from '../hooks/useAdminPolling';

const Sidebar = styled.aside`
  position: fixed;
  top: 0;
  left: 0;
  width: 240px;
  height: 100vh;
  background: ${({ theme }) => theme.admin.sidebar};
  padding: 20px 0;
  overflow-y: auto;
  z-index: 100;

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    display: none;
  }
`;

const Logo = styled.div`
  padding: 0 20px 20px;
  font-family: ${({ theme }) => theme.fonts.accent};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.secondary};
  border-bottom: 1px solid rgba(255,255,255,0.1);
  margin-bottom: 12px;
`;

const NavItem = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 20px;
  color: rgba(255,255,255,0.7);
  font-size: ${({ theme }) => theme.fontSizes.sm};
  transition: background 0.2s, color 0.2s;

  &:hover {
    background: ${({ theme }) => theme.admin.sidebarHover};
    color: #fff;
  }

  &.active {
    background: ${({ theme }) => theme.admin.sidebarActive};
    color: #fff;
    font-weight: 600;
  }

  svg { font-size: 16px; flex-shrink: 0; }
`;

const Badge = styled.span`
  margin-left: auto;
  background: ${({ theme }) => theme.colors.error};
  color: #fff;
  font-size: 11px;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 10px;
`;

const MENU_ITEMS = [
  { path: '/admin', icon: FaTachometerAlt, label: 'Dashboard', end: true },
  { path: '/admin/avisos', icon: FaBullhorn, label: 'Avisos' },
  { path: '/admin/eventos', icon: FaCalendarAlt, label: 'Eventos' },
  { path: '/admin/noticias', icon: FaNewspaper, label: 'Notícias' },
  { path: '/admin/galeria', icon: FaImages, label: 'Galeria' },
  { path: '/admin/videos', icon: FaVideo, label: 'Vídeos' },
  { path: '/admin/contatos', icon: FaEnvelope, label: 'Contatos' },
];

export default function AdminSidebar() {
  const { unreadCount } = useAdminPolling();

  return (
    <Sidebar>
      <Logo>Paróquia Admin</Logo>
      {MENU_ITEMS.map(({ path, icon: Icon, label, end }) => (
        <NavItem key={path} to={path} end={end}>
          <Icon />
          {label}
          {label === 'Contatos' && unreadCount > 0 && <Badge>{unreadCount}</Badge>}
        </NavItem>
      ))}
    </Sidebar>
  );
}
