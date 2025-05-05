import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router';
import styled from 'styled-components';

const JoinCompleteWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 50px;
  svg {
    color: #4939fc;
    font-size: 64px;
    margin: 100px 0 30px;
  }
  p {
    font-size: 24px;
    margin-bottom: 40px;
  }
  button {
    background: #4939fc;
    color: #fff;
    padding: 15px 70px;
    margin-bottom: 100px;
  }
`;

interface nickProps {
  nickname: string;
}

const JoinComplete = ({ nickname }: nickProps) => {
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate('/login');
  };

  return (
    <JoinCompleteWrapper>
      <FontAwesomeIcon icon={faCircleCheck} />
      <p>{nickname}님 가입을 축하합니다!</p>
      <button onClick={goToLogin}>로그인하고 잼 시네마 즐기기</button>
    </JoinCompleteWrapper>
  );
};

export default JoinComplete;
