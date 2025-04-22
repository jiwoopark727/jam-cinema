import MovieDetail from '../components/Detail/MovieDetail';
import styled from 'styled-components';

const DetailViewWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const DetailView = () => {
  return (
    <DetailViewWrapper>
      <MovieDetail />
    </DetailViewWrapper>
  );
};

export default DetailView;
