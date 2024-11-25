import styled from 'styled-components';

const MPWrapper = styled.div`
  height: 100vh;
`;

const MPTitle = styled.div`
  font-weight: 600;
  font-size: 35px;
  justify-content: center;
  display: flex;
  padding-top: 40px;
`;

const MPContainer = styled.div`
  padding-top: 50px;
  margin-left: 300px;
  margin-right: 300px;
`;

const Tab = styled.div`
  display: flex;
  justify-content: left;

  .modify {
    width: 150px;
    background-color: white;
    font-size: 20px;
    padding-left: 15px;
    padding-right: 15px;
    padding-top: 15px;
    padding-bottom: 10px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    &:hover {
      background: white;
    }
  }

  .post {
    width: 150px;
    background: #e4e4e4;
    font-size: 20px;
    padding-left: 10px;
    padding-right: 15px;
    padding-top: 12px;
    padding-bottom: 10px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    &:hover {
      background: white;
    }
  }
`;

const MPCBox = styled.div`
  background: white;
  width: 1300px;
  height: 800px;
`;

const MyPage = () => {
  return (
    <MPWrapper>
      <MPTitle>마이 페이지</MPTitle>
      <MPContainer>
        <Tab>
          <button className='modify'>개인 정보 수정</button>
          <button className='post'>내가 쓴 글</button>
        </Tab>
        <MPCBox></MPCBox>
      </MPContainer>
    </MPWrapper>
  );
};
export default MyPage;
