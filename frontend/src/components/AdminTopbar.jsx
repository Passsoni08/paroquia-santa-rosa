import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { FaSignOutAlt, FaUserCircle } from 'react-icons/fa';
import { useAuth } from '../hooks/useAuth';

const Topbar = styled.header`
  height: 60px;
  background: ${({ theme }) => theme.admin.topbar};
  border-bottom: 1px solid ${({ theme }) => theme.admin.topbarBorder};
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 24px;
  gap: 16px;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSizes.sm};

  svg { color: ${({ theme }) => theme.colors.textMuted}; font-size: 20px; }
`;

const LogoutBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  background: none;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.fontSizes.sm};

  &:hover { color: ${({ theme }) => theme.colors.error}; }
`;

export default function AdminTopbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  return (
    <Topbar>
      <UserInfo>
        <FaUserCircle />
        {user?.nome || 'Admin'}
      </UserInfo>
      <LogoutBtn onClick={handleLogout}>
        <FaSignOutAlt /> Sair
      </LogoutBtn>
    </Topbar>
  );
}
