import styled from 'styled-components';

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
    height: 405px;
    border-radius: 15px;
  }
`;

export const CommunitySection = () => {
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
          <div className='post_box'></div>
        </div>
        <div className='sub_title'>
          <span>최근 게시글 🔥</span>
          <hr className='under_line' />
          <div className='post_box'></div>
        </div>
      </COMCotainer>
    </COMWrapper>
  );
};
