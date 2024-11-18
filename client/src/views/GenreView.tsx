import React from 'react';
import GenreMovieList from '../components/Genre/GenreMovieList';
import styled from 'styled-components';

const GenreViewWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const GenreView = () => {
  return (
    <GenreViewWrapper>
      <GenreMovieList />
    </GenreViewWrapper>
  );
};

export default GenreView;
