import styled, { keyframes } from 'styled-components';

const blinkAnimation = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
`;

const COMWrapper = styled.div`
  width: 1200px;
  margin: auto;
  padding-top: 69px;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 20px;

  .title {
    font-size: 32px;
    font-weight: 400;
  }

  .more {
    font-size: 16px;
    margin-top: 20px;
    cursor: pointer;
  }
`;

const COMCotainer = styled.div`
  text-align: start;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 3rem;
  padding-top: 45px;

  .sub_title {
    padding-bottom: 20px;
  }

  .under_line {
    margin-top: 10px;
    margin-bottom: 22px;
    border: 1.3px black solid;
  }

  .post_box {
    background-color: white;
    width: 584px;
    height: 305px;
    border-radius: 15px;
    padding: 20px;
  }

  .post {
    padding-top: 14px;
    padding-bottom: 15px;
    border-bottom: 1px black solid;
    display: flex;
    justify-content: space-between;
  }

  .post_title {
    text-align: start;
  }

  .post_viewCount {
    font-size: 14px;
    color: gray;
  }

  .hot_text {
    color: red;
    font-size: 12px;
    padding-left: 5px;
    animation: ${blinkAnimation} 0.7s infinite;
  }

  .new_text {
    color: red;
    font-size: 12px;
    padding-left: 5px;
    animation: ${blinkAnimation} 0.7s infinite;
  }
`;

export const CommunitySection = () => {
  const newsArray = [
    ['별이 지는 하늘, 영화가 뜨는 바다', 12943],
    ['나의 과거를 반성합니다', 11245],
    ['어쩌라고 난 피자가 먹고 싶은데', 9299],
    ['롤드컵 T1 V5, 대상혁', 7822],
    ['커플링이 오고 있대요', 6234],
  ];
  return (
    <COMWrapper>
      <HeaderContainer>
        <span className='title'>커뮤니티</span>
        <span className='more'>더보기 +</span>
      </HeaderContainer>
      <COMCotainer>
        <div className='sub_title'>
          <span>인기 게시글 👀</span>
          <hr className='under_line' />
          <div className='post_box'>
            {newsArray.map((val, idx) => {
              return (
                <div className='post'>
                  <span className='post_title'>
                    <span>{val[0]}</span>
                    <span className='hot_text'>HOT</span>
                  </span>
                  <span className='post_viewCount'>{val[1]}회</span>
                </div>
              );
            })}
          </div>
        </div>
        <div className='sub_title'>
          <span>최근 게시글 🔥</span>
          <hr className='under_line' />
          <div className='post_box'>
            {newsArray.map((val, idx) => {
              return (
                <div className='post'>
                  <span className='post_title'>
                    <span>{val[0]}</span>
                    <span className='new_text'>NEW</span>
                  </span>
                  <span className='post_viewCount'>{val[1]}회</span>
                </div>
              );
            })}
          </div>
        </div>
      </COMCotainer>
    </COMWrapper>
  );
};
