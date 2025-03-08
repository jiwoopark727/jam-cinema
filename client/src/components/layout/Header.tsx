import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useLocation, useNavigate } from 'react-router';
import styled from 'styled-components';
import { UserIcon } from './UserIcon';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useDispatch } from 'react-redux';
import { searchOnOff } from '../../store/search';
import { switchDarkLight } from '../../store/darkMode';

const HeaderWrapper = styled.div`
  position: relative;
  height: 5vw;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  .logo {
    display: flex;
    align-items: center;
    margin-left: 20vh;
    img {
      width: 131px;
      height: 55px;
      margin-right: 39px;
      cursor: pointer;
    }
    .dark_mode {
      display: flex;
      p {
        line-height: 55px;
      }
    }
  }
  .menu {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    color: ${(props) => props.theme.textColor};
    li {
      font-weight: semibold;
      cursor: pointer;
      &:nth-child(2) {
        margin: 0 50px;
      }
    }
  }
  .search_my {
    position: relative;
    display: flex;
    margin-right: 20vh;
    padding-left: 2rem;
    font-size: 18px;
    .search {
      margin-right: 30px;
      color: ${(props) => props.theme.textColor};
      svg {
        cursor: pointer;
      }
    }
    .my {
      font-weight: 600;
      color: ${(props) => props.theme.textColor};
      cursor: pointer;
      svg {
      }
    }
  }
`;

const DarkMode = styled.button`
  position: relative;
  height: 30px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-radius: 15px;
  border: none;
  cursor: pointer;
  div {
    span {
      position: relative;
      z-index: 12;
      margin: 0 30px;
      transition: all 0.3s;
      &.light_mode {
        color: white;
      }
    }
  }
`;

const OnDarkMode = styled.div`
  position: absolute;
  width: 50%;
  height: 30px;
  top: 0;
  left: 0;
  border-radius: 15px;
  background-color: #4939fc;
  /* z-index: 0; */
  transition: all 0.3s;
  &.light_mode {
    left: 50%;
  }
`;

interface HeaderProps {
  onScrollToGS: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onScrollToGS }) => {
  const isDark = useSelector((state: RootState) => state.darkMode.dark);

  const location = useLocation();
  const isMainPage = location.pathname === '/'; // 메인 페이지 여부 확인

  const [userMenu, setUserMenu] = useState(false);
  // const [isDark, setIsDark] = useState(true);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loginInfo = useSelector((state: RootState) => state.members.user);
  const searchBoolean = useSelector((state: RootState) => state.search.search);

  const clickLogo = () => {
    navigate('/');
    dispatch(searchOnOff(false));
    closeUserMenu();
  };

  const goToNews = () => {
    navigate('/news');
    dispatch(searchOnOff(false));
    closeUserMenu();
  };

  const goToCommunity = () => {
    navigate('/community');
    dispatch(searchOnOff(false));
    closeUserMenu();
  };

  const clickUserMenu = () => {
    setUserMenu(!userMenu);
  };

  const closeUserMenu = () => {
    setUserMenu(false);
  };

  const changeDark = () => {
    // setIsDark((prev) => !prev);
    dispatch(switchDarkLight(!isDark));
  };

  const clickSearch = () => {
    dispatch(searchOnOff(!searchBoolean));
    closeUserMenu();
  };

  return (
    <HeaderWrapper>
      <div className='logo'>
        <img src='../../images/logo.png' alt='logo' onClick={clickLogo} />
        <DarkMode onClick={changeDark}>
          <div>
            <span className={isDark ? 'light_mode' : ''}>다크</span>
            <span className={isDark ? '' : 'light_mode'}>라이트</span>
          </div>
          <OnDarkMode className={isDark ? '' : 'light_mode'}></OnDarkMode>
        </DarkMode>
      </div>
      <ul className='menu'>
        <li onClick={goToNews}>뉴스</li>
        <li onClick={goToCommunity}>커뮤니티</li>
        {isMainPage && <li onClick={onScrollToGS}>장르별 영화</li>}
      </ul>
      <div className='search_my'>
        <div className='search'>
          {searchBoolean ? (
            <FontAwesomeIcon icon={faXmark} onClick={clickSearch} />
          ) : (
            <FontAwesomeIcon icon={faMagnifyingGlass} onClick={clickSearch} />
          )}
        </div>
        <div className='my' onClick={clickUserMenu}>
          {Object.keys(loginInfo).length ? (
            loginInfo.emoji
          ) : (
            <FontAwesomeIcon icon={faUser} />
          )}
        </div>
        <UserIcon closeUserMenu={closeUserMenu} userMenu={userMenu} />
      </div>
    </HeaderWrapper>
  );
};
