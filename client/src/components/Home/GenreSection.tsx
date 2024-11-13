import styled from 'styled-components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useState } from 'react';

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
    width: 120px;
    height: 100px;
    object-fit: contain;
    margin-left: 20px;
    margin-right: 40px;
  }

  .g_tit {
    font-size: 32px;
    font-weight: bold;
  }

  .g_des {
    text-align: center;
    margin-top: 10px;
    margin-bottom: 30px;
    font-size: 24px;
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
    // autoplay: true,
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
      '연애 세포 뿜뿜!💞 연애 욕구를 자극 시켜 우리도 솔로 탈출!',
      '../../public/images/exampleGenre/romance.png',
      '#235AE9',
    ],
    [
      '코미디',
      '웃음 폭발! 😂 하루의 스트레스를 시원하게 날려줄 코미디 영화!',
      '../../public/images/exampleGenre/comedy.png',
      '#FF8383',
    ],
    [
      '스릴러',
      '긴장감 최고! 😱 손에 땀을 쥐게 하는 스릴 넘치는 영화들',
      '../../public/images/exampleGenre/thriller.png',
      '#38D37F',
    ],
    [
      '액션',
      '짜릿한 쾌감! 💥 숨막히는 액션과 함께 아드레날린을 폭발시켜요!',
      '../../public/images/exampleGenre/action.png',
      '#38D37F',
    ],
    [
      'SF',
      '상상 그 이상의 세계 🌌 미래와 우주를 탐험하는 SF 영화들',
      '../../public/images/exampleGenre/sf.png',
      '#38D37F',
    ],
    [
      '판타지',
      '환상적인 모험! 🧚‍♀️ 동화 속 세상으로 빠져드는 판타지 영화!',
      '../../public/images/exampleGenre/fantasy.png',
      '#38D37F',
    ],
    [
      '애니메이션',
      '아이와 어른 모두를 위한 🎨 생동감 넘치는 애니메이션 영화!',
      '../../public/images/exampleGenre/animation.png',
      '#38D37F',
    ],
    [
      '다큐',
      '현실의 이야기 🌍 사실과 감동이 어우러진 다큐멘터리 영화들',
      '../../public/images/exampleGenre/documentary.png',
      '#38D37F',
    ],
  ];

  return (
    <GENREWrapper>
      <HeaderContainer>
        <span className='title'>장르별 영화, 다양한 콘텐츠를 만나보세요</span>
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
