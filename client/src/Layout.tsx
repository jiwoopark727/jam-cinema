import { Header } from './components/Layout/Header';
import { Footer } from './components/Layout/Footer';
import { Outlet } from 'react-router';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from './store';
import SearchView from './views/SearchView';

const LayoutWrapper = styled.div`
  background: ${(props) => props.theme.bgColor};
  main {
  }
`;

interface LayoutProps {
  onScrollToGS: () => void;
}

export const Layout: React.FC<LayoutProps> = ({ onScrollToGS }) => {
  const searchBoolean = useSelector((state: RootState) => state.search.search);

  return (
    <LayoutWrapper>
      <Header onScrollToGS={onScrollToGS} />
      <main>{searchBoolean ? <SearchView /> : <Outlet />}</main>
      <Footer />
    </LayoutWrapper>
  );
};
