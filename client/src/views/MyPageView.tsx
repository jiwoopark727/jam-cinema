import styled from 'styled-components';
import MyPage from '../components/Member/MyPage';

const MyPageWrapper = styled.div`
  height: 100%;
`;

export const MyPageView = () => {
  return (
    <MyPageWrapper>
      <MyPage />
    </MyPageWrapper>
  );
};
