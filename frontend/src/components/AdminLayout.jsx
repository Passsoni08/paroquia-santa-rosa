import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import AdminSidebar from './AdminSidebar';
import AdminTopbar from './AdminTopbar';

const Wrapper = styled.div`
  display: flex;
  min-height: 100vh;
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-left: 240px;

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    margin-left: 0;
  }
`;

const Main = styled.main`
  flex: 1;
  padding: 24px;
  background: ${({ theme }) => theme.admin.content};
`;

export default function AdminLayout() {
  return (
    <Wrapper>
      <AdminSidebar />
      <Content>
        <AdminTopbar />
        <Main>
          <Outlet />
        </Main>
      </Content>
    </Wrapper>
  );
}
