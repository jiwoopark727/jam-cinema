import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import styled from 'styled-components';
import NoResult from './NoResult';

interface IResultData {
  id: number;
  backdrop_path: string;
  poster_path: string;
  name: string;
  title: string;
  overview: string;
  first_air_date: string;
  release_date: string;
  vote_average: string;
  media_type: string;
}

const ResultWrapper = styled.div`
  width: 1200px;
  min-height: 100vh;
  margin-top: 70px;
`;

const ResultTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 35px;
  h3 {
    font-size: 24px;
    span {
      color: #3863ff;
    }
  }
  div {
    span {
      cursor: pointer;
    }
    svg {
      margin-left: 3px;
      font-size: 14px;
    }
  }
`;

const ResultList = styled.div`
  display: grid;
  gap: 15px;
  row-gap: 40px;
  grid-template-columns: repeat(5, 1fr);
`;

const ResultData = styled.div<{ bg_photo: string }>`
  background-color: white;
  background-image: url(${(props) => props.bg_photo});
  background-size: cover;
  background-position: center center;
  height: 330px;
  border-radius: 10px;
  cursor: pointer;
  &:hover {
    transform: scale(1.1);
    transition: 0.5s;
  }
`;

const ResultSection = () => {
  const location = useLocation();
  // console.log(location.search.split('=')[1]);

  const [movieData, setMovieData] = useState<IResultData[]>([]);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?query=${
          location.search.split('=')[1]
        }&api_key=878ff909e9f63d6bb3b857c0479816e5&include_adult=false&language=ko-KR&page=1`
      )
      .then((res) => {
        console.log(res.data.results);
        setMovieData(res.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <ResultWrapper>
      {movieData?.length ? (
        <>
          <ResultTitle>
            <h3>
              '
              <span>{`${decodeURIComponent(
                location.search.split('=')[1]
              )}`}</span>
              ' 관련된 영화
            </h3>
            <div>
              <span>
                최신순
                <FontAwesomeIcon icon={faArrowDown} />
              </span>{' '}
              |{' '}
              <span>
                가나다순
                <FontAwesomeIcon icon={faArrowUp} />
              </span>
            </div>
          </ResultTitle>
          <ResultList>
            {movieData?.map((data) => (
              <ResultData
                bg_photo={`https://image.tmdb.org/t/p/w300${data.poster_path}`}
              ></ResultData>
            ))}
          </ResultList>{' '}
        </>
      ) : (
        <NoResult title={decodeURIComponent(location.search.split('=')[1])} />
      )}
    </ResultWrapper>
  );
};

export default ResultSection;