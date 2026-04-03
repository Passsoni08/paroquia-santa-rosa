import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { FaBars, FaTimes } from 'react-icons/fa';

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 0 24px;
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${({ $scrolled, theme }) =>
    $scrolled ? theme.colors.primary : 'transparent'};
  transition: background 0.3s ease;
`;

const Logo = styled(Link)`
  font-family: ${({ theme }) => theme.fonts.accent};
  font-size: ${({ theme }) => theme.fontSizes['xl']};
  color: ${({ theme }) => theme.colors.textLight};
  font-weight: 600;
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    position: fixed;
    top: 0;
    right: 0;
    height: 100vh;
    width: 280px;
    flex-direction: column;
    background: ${({ theme }) => theme.colors.primary};
    padding: 80px 32px 32px;
    transform: ${({ $open }) => ($open ? 'translateX(0)' : 'translateX(100%)')};
    transition: transform 0.3s ease;
    gap: 16px;
  }
`;

const NavLink = styled(Link)`
  color: ${({ theme }) => theme.colors.textLight};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 500;
  opacity: ${({ $active }) => ($active ? 1 : 0.85)};
  border-bottom: ${({ $active, theme }) =>
    $active ? `2px solid ${theme.colors.secondary}` : '2px solid transparent'};
  padding-bottom: 4px;
  transition: opacity 0.2s, border-color 0.2s;

  &:hover {
    opacity: 1;
    color: ${({ theme }) => theme.colors.textLight};
  }
`;

const DoacoesBtn = styled(Link)`
  background: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.text};
  padding: 8px 20px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-weight: 700;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  transition: background 0.2s;

  &:hover {
    background: ${({ theme }) => theme.colors.secondaryLight};
    color: ${({ theme }) => theme.colors.text};
  }
`;

const MenuBtn = styled.button`
  display: none;
  background: none;
  color: ${({ theme }) => theme.colors.textLight};
  font-size: 24px;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: block;
    z-index: 1001;
  }
`;

const Overlay = styled.div`
  display: none;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: ${({ $open }) => ($open ? 'block' : 'none')};
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 999;
  }
`;

const NAV_ITEMS = [
  { path: '/sobre', label: 'Sobre' },
  { path: '/sacramentos', label: 'Sacramentos' },
  { path: '/horarios', label: 'Horários' },
  { path: '/eventos', label: 'Eventos' },
  { path: '/noticias', label: 'Notícias' },
  { path: '/galeria', label: 'Galeria' },
  { path: '/contato', label: 'Contato' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <Nav $scrolled={scrolled || pathname !== '/'}>
        <Logo to="/">Paróquia Santa Rosa</Logo>

        <NavLinks $open={menuOpen}>
          {NAV_ITEMS.map(({ path, label }) => (
            <NavLink key={path} to={path} $active={pathname === path}>
              {label}
            </NavLink>
          ))}
          <DoacoesBtn to="/contato">Doações</DoacoesBtn>
        </NavLinks>

        <MenuBtn onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          {menuOpen ? <FaTimes /> : <FaBars />}
        </MenuBtn>
      </Nav>
      <Overlay $open={menuOpen} onClick={() => setMenuOpen(false)} />
    </>
  );
}
