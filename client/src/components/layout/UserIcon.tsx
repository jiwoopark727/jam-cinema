import React from 'react';
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
  p {
    cursor: pointer;
  }
`;

interface UserIconProps {
  closeUserMenu: () => void;
}

export const UserIcon = ({ closeUserMenu }: UserIconProps) => {
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
    navigate('/');
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
        <div>
          <p onClick={goToLogin}>로그인</p>
        </div>
      ) : (
        <div>
          <p onClick={goToMyPage}>마이페이지</p>
          <p onClick={logout}>로그아웃</p>
        </div>
      )}
    </UserIconWrapper>
  );
};
