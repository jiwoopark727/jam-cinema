import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Outlet } from 'react-router';
import styled from 'styled-components';

const LayoutWrapper = styled.div`
  background: #e4e4e4;
  main {
    height: 100vh;
  }
`;

export const Layout = () => {
  return (
    <LayoutWrapper>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </LayoutWrapper>
  );
};
