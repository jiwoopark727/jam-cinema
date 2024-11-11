import { Header } from './components/Layout/Header';
import { Footer } from './components/Layout/Footer';
import { Outlet } from 'react-router';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from './store';
import SearchSection from './components/Search/SearchSection';

const LayoutWrapper = styled.div`
  background: #e4e4e4;
  main {
  }
`;

export const Layout = () => {
  const searchBoolean = useSelector((state: RootState) => state.search.search);

  return (
    <LayoutWrapper>
      <Header />
      <main>{searchBoolean ? <SearchSection /> : <Outlet />}</main>
      <Footer />
    </LayoutWrapper>
  );
};
