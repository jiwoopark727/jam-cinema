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

const EPSWrapper = styled.div`
  width: 1200px;
  margin: auto;
  padding-top: 70px;

  .custom-arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-30%);
    cursor: pointer;
    z-index: 1;
    font-size: 24px;
    color: black;
    /* background: rgba(255, 255, 255, 1); */
    padding: 10px;
    border-radius: 50%;
    transition: background 0.3s ease;
  }

  /* .custom-arrow:hover {
    background: black;
    color: white;
  } */

  .prev-arrow {
    left: -45px;
  }

  .next-arrow {
    right: -45px;
  }
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
`;

const StyledSlider = styled(Slider)`
  padding-top: 30px;
  margin-right: 40px;
  margin-left: 40px;

  .slick-slide {
    display: flex;
    justify-content: center;
    padding: 10px;
  }
`;

const MovieBox = styled.div`
  width: 185px !important;
  height: 260px !important;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  font-size: 14px;
  color: white;
  background-color: ${(props) => props.color || 'black'};

  .m_img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

// 이전,다음 화살표 커스텀
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

export const EditorPickSection = () => {
  // 슬라이드 설정 옵션
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

  const genres = [
    [
      '드라마',
      '가슴이 뭉클, 눈가가 촉촉💦 우리의 심금을 울리는 영화들',
      '../../public/images/examplePoster/poster1.png',
      '#38D37F',
    ],
    [
      '로맨스',
      '연애 세포 뿜뿜!💞 연애 욕구를 마구 자극!!',
      '../../public/images/examplePoster/poster2.png',
      '#235AE9',
    ],
    [
      '코미디',
      '웃음 폭발! 😂 하루의 스트레스를 시원하게 날리자!!',
      '../../public/images/examplePoster/poster3.png',
      '#FF8383',
    ],
    [
      '스릴러',
      '긴장감 최고! 😱 손에 땀을 쥐게 하는 박진감!!',
      '../../public/images/examplePoster/poster4.png',
      '#4A4A73',
    ],
    [
      '액션',
      '짜릿한 쾌감! 💥 숨막히는 액션, 폭발하는 아드레날린!',
      '../../public/images/examplePoster/poster5.png',
      '#4CAF50',
    ],
    [
      'SF',
      '상상 그 이상의 세계 🌌 미래와 우주를 탐험하는 SF 영화들!!',
      '../../public/images/examplePoster/poster6.png',
      '#00BCD4',
    ],
    [
      '판타지',
      '환상적인 모험! 🧚‍♀️ 동화 속 세상으로 빠져보자!!',
      '../../public/images/examplePoster/poster7.png',
      '#9C27B0',
    ],
    [
      '애니메이션',
      '아이와 어른 모두를 위한 🎨 생동감 넘치는 애니메이션 영화!!',
      '../../public/images/examplePoster/poster8.png',
      '#FFC107',
    ],
  ];

  return (
    <EPSWrapper>
      <HeaderContainer>
        <span className='title'>
          에디터 PICK
          <FontAwesomeIcon
            style={{
              fontSize: '20px',
              marginBottom: '2.5px',
              marginLeft: '7px',
            }}
            icon={faWandMagicSparkles}
          />
        </span>
      </HeaderContainer>
      {/* 1번째 장르 */}
      <StyledSlider {...settings}>
        {genres.map((genre, idx) => {
          return (
            <MovieBox key={idx}>
              <img className='m_img' src={genre[2]} alt='' />
            </MovieBox>
          );
        })}
      </StyledSlider>
      {/* 2번째 장르 */}
      <StyledSlider {...settings}>
        {genres.map((genre, idx) => {
          return (
            <MovieBox key={idx}>
              <img className='m_img' src={genre[2]} alt='' />
            </MovieBox>
          );
        })}
      </StyledSlider>
      {/* 3번째 장르 */}
      <StyledSlider {...settings}>
        {genres.map((genre, idx) => {
          return (
            <MovieBox key={idx}>
              <img className='m_img' src={genre[2]} alt='' />
            </MovieBox>
          );
        })}
      </StyledSlider>
      {/* 4번째 장르 */}
      <StyledSlider {...settings}>
        {genres.map((genre, idx) => {
          return (
            <MovieBox key={idx}>
              <img className='m_img' src={genre[2]} alt='' />
            </MovieBox>
          );
        })}
      </StyledSlider>
    </EPSWrapper>
  );
};
