import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import {
  faChevronLeft,
  faChevronRight,
  faWandMagicSparkles,
} from '@fortawesome/free-solid-svg-icons';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { CustomArrowProps } from 'react-slick';
import { forwardRef, useEffect, useState } from 'react';
import axios, { AxiosRequestConfig } from 'axios';
import { useNavigate } from 'react-router';

const EPSWrapper = styled.div`
  width: 1200px;
  margin: auto;
  color: ${(props) => props.theme.textColor};
  .custom-arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-30%);
    cursor: pointer;
    z-index: 1;
    font-size: 24px;
    padding: 10px;
    border-radius: 50%;
    transition: background 0.3s ease;
  }

  .prev-arrow {
    left: -45px;
  }

  .next-arrow {
    right: -45px;
  }

  .g-title {
    padding-left: 60px;
    padding-bottom: 10px;
    font-size: 18px;
    font-weight: 600;
  }
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 30px;
  padding-bottom: 30px;
  .title {
    font-size: 27px;
    font-weight: 400;
  }
`;

const StyledSlider = styled(Slider)`
  margin-right: 40px;
  margin-left: 40px;
  margin-bottom: 50px;

  .slick-slide {
    display: flex;
    justify-content: center;
  }
`;

const MovieContainer = styled.div``;

const MoviePoster = styled.div<{ bg_photo: string }>`
  background-image: url(${(props) => props.bg_photo});
  background-size: cover;
  background-position: center center;
  height: 300px;
  width: 200px;
  scale: 0.9;
  border-radius: 20px;
  box-shadow: 10px;
  display: block;
  transition: 0.5s;
  &:hover {
    transform: scale(1.07);
    cursor: pointer;
  }
`;

const SkeletonPoster = styled.div`
  background-color: gray;
  height: 300px;
  width: 200px;
  border-radius: 20px;
  scale: 0.9;
  box-shadow: 10px;
  display: block;
  transition: 0.5s;
  &:hover {
    transform: scale(1.07);
    cursor: pointer;
  }
`;

const CustomPrevArrow: React.FC<CustomArrowProps> = (props) => {
  const { onClick } = props;
  return (
    <div className='custom-arrow prev-arrow' onClick={onClick}>
      <FontAwesomeIcon icon={faChevronLeft} />
    </div>
  );
};

const CustomNextArrow: React.FC<CustomArrowProps> = (props) => {
  const { onClick } = props;
  return (
    <div className='custom-arrow next-arrow' onClick={onClick}>
      <FontAwesomeIcon icon={faChevronRight} />
    </div>
  );
};

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

export const EditorPickSection = forwardRef<HTMLDivElement>((_, ref) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 1800,
    slidesToShow: 5,
    slidesToScroll: 3,
    arrows: true,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const [topRatedMovie, setTopRatedMovie] = useState<IMovie[] | null>(null);
  const [trendingMovie, setTrendingMovie] = useState<IMovie[] | null>(null);

  useEffect(() => {
    const TRMoptions: AxiosRequestConfig = {
      method: 'GET',
      url: 'https://api.themoviedb.org/3/movie/top_rated?api_key=033d5d85d42294188dc8888ddadfc21e',
      params: { language: 'ko-KR', page: '1', region: 'KR' },
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMzNkNWQ4NWQ0MjI5NDE4OGRjODg4OGRkYWRmYzIxZSIsIm5iZiI6MTczMjAwMjU0NS4xMTI5Mjk2LCJzdWIiOiI2NmNlOTA1ZDI1YTZhMmM2MzRjZDk2NDkiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.6Uk5mT4s2nWTdH6MAepa1CKYPpeFds5dWJVVxVhPDG4',
      },
    };

    axios
      .request(TRMoptions)
      .then((res) => {
        setTopRatedMovie(res.data.results);
      })
      .catch((err) => {
        console.log(err);
      });

    const WTMoptions: AxiosRequestConfig = {
      method: 'GET',
      url: 'https://api.themoviedb.org/3/trending/movie/week?api_key=033d5d85d42294188dc8888ddadfc21e',
      params: { language: 'ko-KR' },
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMzNkNWQ4NWQ0MjI5NDE4OGRjODg4OGRkYWRmYzIxZSIsIm5iZiI6MTczMjAwMjU0NS4xMTI5Mjk2LCJzdWIiOiI2NmNlOTA1ZDI1YTZhMmM2MzRjZDk2NDkiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.6Uk5mT4s2nWTdH6MAepa1CKYPpeFds5dWJVVxVhPDG4',
      },
    };

    axios
      .request(WTMoptions)
      .then((res) => {
        setTrendingMovie(res.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const navigate = useNavigate();

  return (
    <EPSWrapper ref={ref}>
      <HeaderContainer>
        <div className='title'>
          에디터 PICK
          <FontAwesomeIcon
            style={{
              fontSize: '20px',
              marginBottom: '2.5px',
              marginLeft: '7px',
            }}
            icon={faWandMagicSparkles}
          />
        </div>
      </HeaderContainer>
      <div className='g-title'>주간 인기 영화 🔥🔥 </div>
      <StyledSlider {...settings}>
        {trendingMovie
          ? trendingMovie.map((movie) => (
              <MovieContainer key={movie.id}>
                <MoviePoster
                  onClick={() => navigate(`/detail/${movie.id}`)}
                  bg_photo={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                      : '/images/noImage.png'
                  }
                />
              </MovieContainer>
            ))
          : [...Array(29)].map((_, i) => (
              <MovieContainer key={i}>
                <SkeletonPoster />
              </MovieContainer>
            ))}
      </StyledSlider>
      <div className='g-title'>평점 높은 영화 ★★★★★</div>
      <StyledSlider {...settings}>
        {topRatedMovie
          ? topRatedMovie.map((movie) => (
              <MovieContainer key={movie.id}>
                <MoviePoster
                  onClick={() => navigate(`/detail/${movie.id}`)}
                  bg_photo={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                      : '/images/noImage.png'
                  }
                />
              </MovieContainer>
            ))
          : [...Array(29)].map((_, i) => (
              <MovieContainer key={i}>
                <SkeletonPoster />
              </MovieContainer>
            ))}
      </StyledSlider>
    </EPSWrapper>
  );
});
