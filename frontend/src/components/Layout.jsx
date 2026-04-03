import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from './Navbar';
import Footer from './Footer';
import ScrollToTop from './ScrollToTop';

const Main = styled.main`
  min-height: calc(100vh - 160px);
`;

export default function Layout() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Main>
        <Outlet />
      </Main>
      <Footer />
    </>
  );
}
