import axios, { AxiosRequestConfig } from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

interface RMSProps {
  onScrollToEPS: () => void; // 스크롤 함수 전달
}

// const MovieHoverAnimation = keyframes`
//   from{
//     transform: scale(1);
//   }
//   to{
//     transform: scale(1.05);
//     cursor: pointer;
//   }

// `;

/* const TabHoverAnimation = keyframes`
  from{
    transform: scale(1);
  }
  to{
    transform: scale(1.05);
    cursor: pointer;
  }

`; */

const RMSWrapper = styled.div`
  width: 1200px;
  margin: auto;
  /* .tab {
    margin-top: 30px;
  } */

  .tab_button {
    margin-left: 10px;
    background-color: white;
    color: black;
    font-size: 15px;
    font-weight: 500;
    padding-left: 15px;
    padding-right: 15px;
    padding-top: 9px;
    padding-bottom: 9px;
    margin-bottom: 15px;
    border-radius: 10px;
    transition: 0.2s;
    &:hover {
      background-color: #4939fc;
      color: white;
    }

    &.clicked {
      background-color: #4939fc;
      color: white;
    }
  }
`;

const Tab = styled.div`
  margin-top: 30px;
`;

const MovieContainer = styled.div`
  text-align: center;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  .movie_frame {
    overflow: hidden;
    border-radius: 20px;
    box-shadow: 10px;
  }
  .movie_poster {
    width: 100%;
    display: block;
    transition: 0.5s;
    &:hover {
      transform: scale(1.03);
      cursor: pointer;
    }
  }
`;

interface INowPlayingMovie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export const RecentMovieSection: React.FC<RMSProps> = ({ onScrollToEPS }) => {
  const [tabNum, setTabNum] = useState(0);

  const handleTabNum = (val: number) => {
    setTabNum(val);
  };

  const [nowPlayingMovie, setNowPlayingMovie] = useState<INowPlayingMovie[]>();

  useEffect(() => {
    // 요청 옵션 정의
    const options: AxiosRequestConfig = {
      method: 'GET',
      url: 'https://api.themoviedb.org/3/movie/now_playing?api_key=033d5d85d42294188dc8888ddadfc21e',
      params: { language: 'ko-KR', page: '1' },
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMzNkNWQ4NWQ0MjI5NDE4OGRjODg4OGRkYWRmYzIxZSIsIm5iZiI6MTczMjAwMjU0NS4xMTI5Mjk2LCJzdWIiOiI2NmNlOTA1ZDI1YTZhMmM2MzRjZDk2NDkiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.6Uk5mT4s2nWTdH6MAepa1CKYPpeFds5dWJVVxVhPDG4',
      },
    };

    axios
      .request(options)
      .then((res) => {
        console.log(res);
        setNowPlayingMovie(res.data.results);
        console.log(nowPlayingMovie);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <RMSWrapper>
      <Tab>
        <button
          className={`tab_button ${tabNum === 0 ? 'clicked' : ''}`}
          onClick={() => handleTabNum(0)}
        >
          현재 상영중인 영화
        </button>
        <button
          className={`tab_button ${tabNum === 1 ? 'clicked' : ''}`}
          onClick={() => handleTabNum(1)}
        >
          개봉 예정 영화
        </button>
        <button
          className={`tab_button ${tabNum === 2 ? 'clicked' : ''}`}
          onClick={() => {
            onScrollToEPS();
            handleTabNum(2);
          }}
        >
          에디터 추천★ 영화
        </button>
      </Tab>
      <MovieContainer>
        {nowPlayingMovie?.map(function (item, idx) {
          return (
            <Link
              key={idx}
              className='movie_frame'
              to={'/detail/' + item.id}
              state={item}
              onClick={() => {
                console.log('영화 클릭');
              }}
            >
              <img
                className='movie_poster'
                src={`https://image.tmdb.org/t/p/w300${item.poster_path}`}
              ></img>
            </Link>
          );
        })}
      </MovieContainer>
    </RMSWrapper>
  );
};
