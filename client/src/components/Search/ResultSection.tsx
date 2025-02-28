import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import styled from 'styled-components';
import NoResult from './NoResult';
import PaginationNoSlice from '../Pagination/PaginationNoSlice';

export interface IResultData {
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
  color: ${(props) => props.theme.textColor};
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
  background-color: gray;
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
  &.size_cover {
    background-size: auto;
    background-repeat: no-repeat;
  }
`;

const ResultSection = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // console.log(location.search.split('=')[1]);

  const [movieData, setMovieData] = useState<IResultData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [allPage, setAllPage] = useState(0);

  const upToDate = () => {
    setMovieData((prev) =>
      [...prev].sort((a: any, b: any) =>
        b.release_date.localeCompare(a.release_date)
      )
    );
  };

  const alphabet = () => {
    setMovieData((prev) =>
      [...prev].sort((a: any, b: any) => a.title.localeCompare(b.title))
    );
    console.log(movieData);
  };

  const clickPoster = (data: IResultData) => {
    navigate(`/detail/${data.id}`);
  };

  const pageMove = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?query=${
          location.search.split('=')[1]
        }&api_key=878ff909e9f63d6bb3b857c0479816e5&include_adult=false&language=ko-KR&page=${currentPage}`
      )
      .then((res) => {
        console.log(res.data.results);
        setMovieData(res.data.results);
        setAllPage(res.data.total_pages);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [currentPage]);

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
              <span onClick={upToDate}>
                최신순
                <FontAwesomeIcon icon={faArrowDown} />
              </span>{' '}
              |{' '}
              <span onClick={alphabet}>
                가나다순
                <FontAwesomeIcon icon={faArrowUp} />
              </span>
            </div>
          </ResultTitle>
          <ResultList>
            {movieData?.map((data) => (
              <ResultData
                className={data.poster_path ? '' : 'size_cover'}
                bg_photo={
                  data.poster_path
                    ? `https://image.tmdb.org/t/p/w300${data.poster_path}`
                    : '/images/noImage.png'
                }
                onClick={() => clickPoster(data)}
              ></ResultData>
            ))}
          </ResultList>{' '}
        </>
      ) : (
        <NoResult title={decodeURIComponent(location.search.split('=')[1])} />
      )}
      <PaginationNoSlice
        currentPage={currentPage}
        pageMove={pageMove}
        allPage={allPage}
      />
    </ResultWrapper>
  );
};

export default ResultSection;
