import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import styled from 'styled-components';
import { IResultData } from '../Search/ResultSection';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import PaginationNoSlice from '../Pagination/PaginationNoSlice';

interface IGenre {
  genre: string;
}

const GenreWrapper = styled.div`
  width: 1200px;
  min-height: 100vh;
  margin-top: 70px;
`;

const GenreTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  h3 {
    font-size: 28px;
    span {
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

const GenreMovieList = ({ genre }: IGenre) => {
  const params = useParams();
  const navigate = useNavigate();

  const [genreList, setGenreList] = useState<IResultData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [allPage, setAllPage] = useState(0);

  const upToDate = () => {
    setGenreList((prev) =>
      [...prev].sort((a: any, b: any) => b.release_date.localeCompare(a.release_date))
    );
  };

  const alphabet = () => {
    setGenreList((prev) => [...prev].sort((a: any, b: any) => a.title.localeCompare(b.title)));
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
        `https://api.themoviedb.org/3/discover/movie?api_key=878ff909e9f63d6bb3b857c0479816e5&with_genres=${params.genreId}&language=ko&page=${currentPage}`
      )
      .then((res) => {
        setGenreList(res.data.results);
        setAllPage(res.data.total_pages);
      })
      .catch((err) => console.log(err));
  }, [currentPage]);

  return (
    <GenreWrapper>
      <GenreTitle>
        <h3>
          <span>{genre}</span>
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
            key={data.id}
            bg_photo={
              data.poster_path
                ? `https://image.tmdb.org/t/p/w300${data.poster_path}`
                : '/images/noImage.png'
            }
            onClick={() => clickPoster(data)}
          ></GenreData>
        ))}
      </GenreList>
      <PaginationNoSlice currentPage={currentPage} pageMove={pageMove} allPage={allPage} />
    </GenreWrapper>
  );
};

export default GenreMovieList;
