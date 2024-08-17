import styled from 'styled-components';
import { Join } from '../components/Join';

const JoinViewWrapper = styled.div`
  height: 100%;
`;

export const JoinView = () => {
  return (
    <JoinViewWrapper>
      <Join />
    </JoinViewWrapper>
  );
};
