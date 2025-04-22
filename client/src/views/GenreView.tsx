import GenreMovieList from '../components/Genre/GenreMovieList';
import styled from 'styled-components';
import { useLocation } from 'react-router';

const GenreViewWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const GenreView = () => {
  const location = useLocation();
  return (
    <GenreViewWrapper>
      <GenreMovieList genre={location.state} />
    </GenreViewWrapper>
  );
};

export default GenreView;
