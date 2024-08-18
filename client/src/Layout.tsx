import { Header } from './components/Layout/Header';
import { Footer } from './components/Layout/Footer';
import { Outlet } from 'react-router';
import styled from 'styled-components';

const LayoutWrapper = styled.div`
  background: #e4e4e4;
  main {
    height: 3000px;
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
