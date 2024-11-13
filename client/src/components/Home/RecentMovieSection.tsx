import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

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
  .tab {
    margin-top: 30px;
  }

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
  }
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

const movieCount = [1, 2, 3, 4, 5, 6, 7, 8];

export const RecentMovieSection = () => {
  return (
    <RMSWrapper>
      <div className='tab'>
        <button className='tab_button'>현재 상영중인 영화</button>
        <button className='tab_button'>개봉 예정 영화</button>
        <button className='tab_button'>에디터 추천★ 영화</button>
      </div>
      <MovieContainer>
        {movieCount.map(function (item, idx) {
          return (
            <Link
              key={idx}
              className='movie_frame'
              to={'/movie/' + item}
              state={item}
              onClick={() => {
                console.log('영화 클릭');
              }}
            >
              <img
                className='movie_poster'
                src={`../../images/examplePoster/poster${idx + 1}.png`}
              ></img>
            </Link>
          );
        })}
      </MovieContainer>
    </RMSWrapper>
  );
};
