import styled from 'styled-components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideoCamera } from '@fortawesome/free-solid-svg-icons';

const GENREWrapper = styled.div`
  width: 1200px;
  margin: auto;
  padding-top: 39px;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 20px;

  .title {
    font-size: 27px;
    font-weight: 400;
  }

  .more {
    font-size: 16px;
    margin-top: 20px;
    cursor: pointer;
  }
`;

const StyledSlider = styled(Slider)`
  padding-top: 30px;

  .slick-slide {
    display: flex;
    justify-content: center;
    padding: 10px;
  }
`;

const GenreBox = styled.div`
  width: 380px !important;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  font-size: 14px;
  color: white;
  background-color: ${(props) => props.color || 'black'};
  padding: 20px;

  .g_content {
    display: flex;
    align-items: center;
    gap: 15px;
  }

  .g_img {
    width: 144px;
    height: 120px;
    object-fit: contain;
    margin-left: 20px;
    margin-right: 40px;
  }

  .g_tit {
    font-size: 26px;
    font-weight: bold;
  }

  .g_des {
    text-align: center;
    margin-top: 10px;
    margin-bottom: 40px;
    font-size: 22px;
  }
`;

export const GenreSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // 캐러셀 설정 옵션
  const settings = {
    dots: true,
    infinite: true,
    speed: 1500,
    slidesToShow: 3,
    slidesToScroll: 3,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    beforeChange: (oldIndex: number, newIndex: number) =>
      setCurrentSlide(newIndex),
    customPaging: (i: number) => (
      <div
        style={{
          width: '50px',
          borderRadius: '15px',
          paddingTop: '5px',
          height: '23px',
          display: 'flex',
          backgroundColor: 'white',
          textAlign: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            backgroundColor: i * 3 === currentSlide ? '#0019ff' : 'gray',
          }}
        />
      </div>
    ),
    appendDots: (dots: any) => (
      <div
        style={{
          display: 'flex',
          textAlign: 'center',
          justifyContent: 'center',
          gap: '1px',
        }}
      >
        {dots}
      </div>
    ),
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

  const genres = [
    [
      '드라마',
      '가슴이 뭉클, 눈가가 촉촉💦 우리의 심금을 울리는 영화들',
      '../../public/images/exampleGenre/drama.png',
      '#38D37F',
    ],
    [
      '로맨스',
      '연애 세포 뿜뿜!💞 연애 욕구를 마구 자극!!',
      '../../public/images/exampleGenre/romance.png',
      '#235AE9',
    ],
    [
      '코미디',
      '웃음 폭발! 😂 하루의 스트레스를 시원하게 날리자!!',
      '../../public/images/exampleGenre/comedy.png',
      '#FF8383',
    ],
    [
      '스릴러',
      '긴장감 최고! 😱 손에 땀을 쥐게 하는 박진감!!',
      '../../public/images/exampleGenre/thriller.png',
      '#4A4A73',
    ],
    [
      '액션',
      '짜릿한 쾌감! 💥 숨막히는 액션, 폭발하는 아드레날린!',
      '../../public/images/exampleGenre/action.png',
      '#4CAF50',
    ],
    [
      'SF',
      '상상 그 이상의 세계 🌌 미래와 우주를 탐험하는 SF 영화들!!',
      '../../public/images/exampleGenre/sf.png',
      '#00BCD4',
    ],
    [
      '판타지',
      '환상적인 모험! 🧚‍♀️ 동화 속 세상으로 빠져보자!!',
      '../../public/images/exampleGenre/fantasy.png',
      '#9C27B0',
    ],
    [
      '애니메이션',
      '아이와 어른 모두를 위한 🎨 생동감 넘치는 애니메이션 영화!!',
      '../../public/images/exampleGenre/animation.png',
      '#FFC107',
    ],
    [
      '다큐',
      '현실의 이야기 🌍 팩트와 감동으로 이루어진 이야기들!!',
      '../../public/images/exampleGenre/documentary.png',
      '#8E8E93',
    ],
  ];

  return (
    <GENREWrapper>
      <HeaderContainer>
        <span className='title'>
          장르별 영화, 다양한 콘텐츠를 만나보세요!{' '}
          <FontAwesomeIcon icon={faVideoCamera} />
        </span>
      </HeaderContainer>
      <StyledSlider {...settings}>
        {genres.map((genre, index) => {
          const [beforeEmoji, emoji, afterEmoji] = genre[1].split(
            /(💦|💞|😂|😱|💥|🌌|🧚‍♀️|🎨|🌍)/
          );

          return (
            <GenreBox key={index} color={genre[3]}>
              <div className='g_des'>
                <span>
                  {beforeEmoji}
                  {emoji}
                </span>
                <br />
                <span>{afterEmoji}</span>
              </div>
              <div className='g_content'>
                <img className='g_img' src={genre[2]} alt={genre[0]} />
                <span className='g_tit'>{genre[0]}</span>
              </div>
            </GenreBox>
          );
        })}
      </StyledSlider>
    </GENREWrapper>
  );
};
