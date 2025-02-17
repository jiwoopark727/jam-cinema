import styled from 'styled-components';
import NewsPage from '../components/News/NewsPage';

const NewsViewWrapper = styled.div`
  height: 100%;
`;

const NewsView = () => {
  return (
    <NewsViewWrapper>
      <NewsPage />
    </NewsViewWrapper>
  );
};
export default NewsView;
