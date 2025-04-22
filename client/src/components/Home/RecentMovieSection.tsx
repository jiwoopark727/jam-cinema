import axios, { AxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';

interface RMSProps {
  onScrollToEPS: () => void;
}

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
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
`;

const MoviePoster = styled.div<{ bg_photo: string }>`
  background-image: url(${(props) => props.bg_photo});
  background-size: cover;
  background-position: center center;
  height: 415px;
  width: 275px;
  scale: 0.9;
  border-radius: 20px;
  box-shadow: 10px;
  display: block;
  transition: 0.5s;
  transform: scale(1.1);
  &:hover {
    transform: scale(1.14);
    cursor: pointer;
  }
`;

const SkeletonPoster = styled.div`
  background-color: gray;
  width: 275px;
  height: 415px;
  border-radius: 20px;
  scale: 0.9;
  box-shadow: 10px;
  display: block;
  transition: 0.5s;
  transform: scale(1.1);
  &:hover {
    transform: scale(1.16);
    cursor: pointer;
  }
`;

interface IMovie {
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

  const navigate = useNavigate();

  const handleTabNum = (val: number) => {
    setTabNum(val);
  };

  const [nowPlayingMovie, setNowPlayingMovie] = useState<IMovie[] | null>(null);
  const [upcomingMovie, setUpcomingMovie] = useState<IMovie[] | null>(null);

  useEffect(() => {
    const NPMoptions: AxiosRequestConfig = {
      method: 'GET',
      url: 'https://api.themoviedb.org/3/movie/now_playing?api_key=033d5d85d42294188dc8888ddadfc21e',
      params: { language: 'ko-KR', page: '1', region: 'KR' },
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMzNkNWQ4NWQ0MjI5NDE4OGRjODg4OGRkYWRmYzIxZSIsIm5iZiI6MTczMjAwMjU0NS4xMTI5Mjk2LCJzdWIiOiI2NmNlOTA1ZDI1YTZhMmM2MzRjZDk2NDkiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.6Uk5mT4s2nWTdH6MAepa1CKYPpeFds5dWJVVxVhPDG4',
      },
    };

    axios
      .request(NPMoptions)
      .then((res) => {
        setNowPlayingMovie(res.data.results.slice(0, 12));
      })
      .catch((err) => {
        console.log(err);
      });

    const UMoptions: AxiosRequestConfig = {
      method: 'GET',
      url: 'https://api.themoviedb.org/3/movie/upcoming?api_key=033d5d85d42294188dc8888ddadfc21e',
      params: { language: 'ko-KR', page: '1', region: 'KR' },
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMzNkNWQ4NWQ0MjI5NDE4OGRjODg4OGRkYWRmYzIxZSIsIm5iZiI6MTczMjAwMjU0NS4xMTI5Mjk2LCJzdWIiOiI2NmNlOTA1ZDI1YTZhMmM2MzRjZDk2NDkiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.6Uk5mT4s2nWTdH6MAepa1CKYPpeFds5dWJVVxVhPDG4',
      },
    };

    axios
      .request(UMoptions)
      .then((res) => {
        setUpcomingMovie(res.data.results.slice(0, 12));
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
          onClick={() => {
            handleTabNum(0);
          }}
        >
          현재 상영중인 영화
        </button>
        <button
          className={`tab_button ${tabNum === 1 ? 'clicked' : ''}`}
          onClick={() => {
            handleTabNum(1);
          }}
        >
          개봉 예정 영화
        </button>
        <button
          className='tab_button'
          onClick={() => {
            onScrollToEPS();
          }}
        >
          에디터 추천★ 영화
        </button>
      </Tab>
      <MovieContainer>
        {tabNum === 0 &&
          (nowPlayingMovie
            ? nowPlayingMovie.map((item, idx) => (
                <MoviePoster
                  key={idx}
                  onClick={() => navigate(`/detail/${item.id}`)}
                  bg_photo={
                    item.poster_path
                      ? `https://image.tmdb.org/t/p/w300${item.poster_path}`
                      : '/images/noImage.png'
                  }
                />
              ))
            : [...Array(12)].map((_, i) => <SkeletonPoster key={i} />))}
        {tabNum === 1 &&
          (upcomingMovie
            ? upcomingMovie.map((item, idx) => (
                <MoviePoster
                  key={idx}
                  onClick={() => navigate(`/detail/${item.id}`)}
                  bg_photo={
                    item.poster_path
                      ? `https://image.tmdb.org/t/p/w300${item.poster_path}`
                      : '/images/noImage.png'
                  }
                />
              ))
            : [...Array(12)].map((_, i) => <SkeletonPoster key={i} />))}
      </MovieContainer>
    </RMSWrapper>
  );
};
