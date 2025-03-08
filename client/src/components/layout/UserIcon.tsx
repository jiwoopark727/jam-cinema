import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../../store';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { userLogout } from '../../store/member';
import { searchOnOff } from '../../store/search';

const UserIconWrapper = styled.div`
  position: absolute;
  top: 140%;
  right: 0;
  text-align: center;
  overflow: hidden;
  margin-top: 5px;
  div {
    background-color: #fff;
    border-radius: 10px;
    transform: translateY(-100%);
    transition: all 0.5s;
    &.show {
      transform: translateY(0);
    }
    p {
      transition: all 0.3s;
      border-radius: 10px;
      padding: 10px 12px;
      cursor: pointer;
      font-size: 16px;
      &:hover {
        background-color: #c0c0c0;
      }
    }
  }
`;

interface UserIconProps {
  closeUserMenu: () => void;
  userMenu: boolean;
}

export const UserIcon = ({ closeUserMenu, userMenu }: UserIconProps) => {
  const loginData = useSelector((state: RootState) => state.members.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const goToLogin = () => {
    navigate('/login');
    closeUserMenu();
    dispatch(searchOnOff(false));
  };

  const goToMyPage = () => {
    // 경로 추가 예정
    navigate('/mypage');
    closeUserMenu();
  };

  const logout = () => {
    dispatch(userLogout({}));
    navigate('/');
    closeUserMenu();
  };

  return (
    <UserIconWrapper>
      {!Object.keys(loginData).length ? (
        <div className={userMenu ? 'show' : ''}>
          <p onClick={goToLogin}>로그인</p>
        </div>
      ) : (
        <div className={userMenu ? 'show' : ''}>
          <p onClick={goToMyPage}>마이페이지</p>
          <p onClick={logout}>로그아웃</p>
        </div>
      )}
    </UserIconWrapper>
  );
};
