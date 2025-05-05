import { Header } from './components/Layout/Header';
import { Footer } from './components/Layout/Footer';
import { Outlet } from 'react-router';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from './store';
import SearchView from './views/SearchView';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';

const LayoutWrapper = styled.div`
  background: ${(props) => props.theme.bgColor};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
  main {
  }
`;

const TopBtn = styled.div`
  position: fixed;
  right: 3rem;
  bottom: 2rem;
  width: 3rem;
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: #4939fc;
  cursor: pointer;
  animation: fadeInUp 0.5s;
  &.disappear {
    opacity: 0;
    animation: fadeInDown 0.5s;
  }
  @keyframes fadeInUp {
    0% {
      opacity: 0;
      transform: translate3d(0, 100%, 0);
    }
    100% {
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }
  }

  @keyframes fadeInDown {
    0% {
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }
    100% {
      opacity: 0;
      transform: translate3d(0, 100%, 0);
    }
  }
  svg {
    color: #fff;
  }
`;

interface LayoutProps {
  onScrollToGS: () => void;
}

export const Layout: React.FC<LayoutProps> = ({ onScrollToGS }) => {
  const searchBoolean = useSelector((state: RootState) => state.search.search);
  const [scrollPosition, setScrollPosition] = useState(0);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScroll = () => {
    const position = window.scrollY;
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <LayoutWrapper>
      <Header onScrollToGS={onScrollToGS} />
      <main>{searchBoolean ? <SearchView /> : <Outlet />}</main>
      <TopBtn onClick={scrollToTop} className={scrollPosition ? '' : 'disappear'}>
        <FontAwesomeIcon icon={faChevronUp} />
      </TopBtn>
      <Footer />
    </LayoutWrapper>
  );
};
