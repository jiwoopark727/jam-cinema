import axios from 'axios';
import React, { useEffect } from 'react';
import { useLocation } from 'react-router';
import styled from 'styled-components';

const ResultWrapper = styled.div`
  height: 100vh;
`;

const ResultSection = () => {
  const location = useLocation();
  // console.log(location.search.split('=')[1]);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?query=${
          location.search.split('=')[1]
        }&api_key=878ff909e9f63d6bb3b857c0479816e5&include_adult=false&language=ko-KR&page=1`
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return <ResultWrapper></ResultWrapper>;
};

export default ResultSection;
