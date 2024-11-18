import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import styled from 'styled-components';
import { IResultData } from '../Search/ResultSection';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';

const GenreWrapper = styled.div`
  width: 1200px;
  min-height: 100vh;
  margin-top: 70px;
`;

const GenreTitle = styled.div`
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

const GenreList = styled.div`
  display: grid;
  gap: 15px;
  row-gap: 40px;
  grid-template-columns: repeat(5, 1fr);
`;

const GenreData = styled.div<{ bg_photo: string }>`
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
  &.size_cover {
    background-size: auto;
    background-repeat: no-repeat;
  }
`;

const GenreMovieList = () => {
  const params = useParams();
  const navigate = useNavigate();
  console.log(params.genreId);

  const [genreList, setGenreList] = useState<IResultData[]>([]);

  const upToDate = () => {
    setGenreList((prev) =>
      [...prev].sort((a: any, b: any) => b.release_date.localeCompare(a.release_date))
    );
  };

  const alphabet = () => {
    setGenreList((prev) => [...prev].sort((a: any, b: any) => a.title.localeCompare(b.title)));
    console.log(genreList);
  };

  const clickPoster = (data: IResultData) => {
    navigate(`/detail/${data.id}`);
  };

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/discover/movie?api_key=878ff909e9f63d6bb3b857c0479816e5&with_genres=${params.genreId}&language=ko&page=1`
      )
      .then((res) => {
        console.log(res);
        setGenreList(res.data.results);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <GenreWrapper>
      <GenreTitle>
        <h3>
          '<span>{`${decodeURIComponent(location.search.split('=')[1])}`}</span>' 관련된 영화
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
      </GenreTitle>
      <GenreList>
        {genreList.map((data) => (
          <GenreData
            bg_photo={
              data.poster_path
                ? `https://image.tmdb.org/t/p/w300${data.poster_path}`
                : '/images/noImage.png'
            }
            onClick={() => clickPoster(data)}
          ></GenreData>
        ))}
      </GenreList>
    </GenreWrapper>
  );
};

export default GenreMovieList;
