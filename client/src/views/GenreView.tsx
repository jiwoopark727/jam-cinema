import React from 'react';
import GenreMovieList from '../components/Genre/GenreMovieList';
import styled from 'styled-components';
import { useLocation } from 'react-router';

const GenreViewWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const GenreView = () => {
  const location = useLocation();
  console.log(location.state);
  return (
    <GenreViewWrapper>
      <GenreMovieList genre={location.state} />
    </GenreViewWrapper>
  );
};

export default GenreView;
