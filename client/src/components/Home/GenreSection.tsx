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
  background-color: black;
  width: 380px !important; /* 강제 너비 적용 */
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  font-size: 14px;
  color: white;

  .g_tit {
    display: grid;
  }

  .g_des {
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
    ['드라마', '가슴이 뭉클, 눈가가 촉촉💦 우리의 심금을 울리는 영화들'],
    ['로맨스', '연애 세포 뿜뿜!💞 연애 욕구를 자극 시켜 우리도 솔로 탈출!'],
    ['코미디', ''],
    ['스릴러', ''],
    ['액션', ''],
    ['SF', ''],
    ['판타지', ''],
    ['애니메이션', ''],
    ['다큐', ''],
  ];

  return (
    <GENREWrapper>
      <HeaderContainer>
        <span className='title'>장르별 영화, 다양한 콘텐츠를 만나보세요</span>
      </HeaderContainer>
      <StyledSlider {...settings}>
        {genres.map((genre, index) => (
          <GenreBox key={index}>
            <div className='g_des'>{genre[1]}</div>
            <p>
              <img src='../../public/images/drama.png' alt='' />
              <span className='g_tit'>{genre[0]}</span>
            </p>
          </GenreBox>
        ))}
      </StyledSlider>
    </GENREWrapper>
  );
};
