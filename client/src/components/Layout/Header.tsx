import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useLocation, useNavigate } from 'react-router';
import styled from 'styled-components';
import { UserIcon } from './UserIcon';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useDispatch } from 'react-redux';
import { searchOnOff } from '../../store/search';
import { switchDarkLight } from '../../store/darkMode';

const HeaderWrapper = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'isMain',
})<{ isMain: boolean }>`
  position: relative;
  height: 6rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  .logo {
    display: flex;
    align-items: center;
    margin-left: 10vw;
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
        margin: ${({ isMain }) => (isMain ? '0 50px' : '0 0 0 50px')};
      }
    }
  }
  .search_my {
    position: relative;
    display: flex;
    margin-right: 10vw;
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
  transition: all 0.3s;
  &.light_mode {
    left: 50%;
  }
`;

const Nav = styled.div`
  @media (max-width: 1600px) {
    display: none;
  }
`;

const HamburgerButton = styled.button`
  display: none;
  font-size: 24px;
  background: none;
  border: none;
  color: black;
  position: relative;
  margin-right: 10vw;
  padding-left: 2rem;
  cursor: pointer;

  .my {
    margin-right: 7px;
    margin-left: 17px;
    margin-top: 3px;
    padding: 2px;
    font-size: 19px;
  }

  @media (max-width: 1600px) {
    display: flex;
  }
`;

const HamburgerMenuWrapper = styled.div`
  position: absolute;
  top: 140%;
  right: 0;
  width: 7rem;
  margin-top: 5px;
  overflow: hidden;
  visibility: hidden;
  transition: all 0.5s;

  &.open {
    visibility: visible;
  }
`;

const HamburgerMenu = styled.ul`
  font-size: 14px;
  border-radius: 10px;
  background-color: #fff;
  transform: translateY(-100%);
  transition: all 0.5s;

  &.open {
    transform: translateY(0);
  }

  .h_li {
    background-color: #fff;
    padding: 0.5rem 1rem;
    border-radius: 10px;
    color: #000;

    &:hover {
      background-color: #c0c0c0;
    }
  }
`;

interface HeaderProps {
  onScrollToGS: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onScrollToGS }) => {
  const isDark = useSelector((state: RootState) => state.darkMode.dark);

  const location = useLocation();

  const [isMain, setIsMain] = useState(location.pathname === '/' ? true : false);
  const [isOpen, setIsOpen] = useState(false);
  const [userMenu, setUserMenu] = useState(false);

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
    setIsOpen(false);
  };

  const closeUserMenu = () => {
    setUserMenu(false);
  };

  const changeDark = () => {
    dispatch(switchDarkLight(!isDark));
  };

  const clickSearch = () => {
    dispatch(searchOnOff(!searchBoolean));
    closeUserMenu();
  };

  const handleHamburger = () => {
    setIsOpen(!isOpen);
    closeUserMenu();
  };

  useEffect(() => {
    location.pathname === '/' ? setIsMain(true) : setIsMain(false);
  }, [location.pathname]);

  return (
    <HeaderWrapper isMain={isMain}>
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

      <Nav>
        <ul className='menu'>
          <li onClick={goToNews}>뉴 스</li>
          <li onClick={goToCommunity}>커뮤니티</li>
          {isMain && <li onClick={onScrollToGS}>장르별 영화</li>}
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
            {Object.keys(loginInfo).length ? loginInfo.emoji : <FontAwesomeIcon icon={faUser} />}
          </div>
          <UserIcon closeUserMenu={closeUserMenu} userMenu={userMenu} />
        </div>
      </Nav>

      <HamburgerButton>
        <span onClick={handleHamburger}>☰</span>
        <div className='my' onClick={clickUserMenu}>
          {Object.keys(loginInfo).length ? loginInfo.emoji : <FontAwesomeIcon icon={faUser} />}
        </div>
        <UserIcon closeUserMenu={closeUserMenu} userMenu={userMenu} />
        {/* 햄버거 메뉴 */}
        <HamburgerMenuWrapper className={isOpen ? 'open' : ''}>
          <HamburgerMenu onClick={handleHamburger} className={isOpen ? 'open' : ''}>
            <li className='h_li' onClick={goToNews}>
              뉴 스
            </li>
            <li className='h_li' onClick={goToCommunity}>
              커뮤니티
            </li>
            {isMain && (
              <li className='h_li' onClick={onScrollToGS}>
                장르별 영화
              </li>
            )}
            <li className='h_li'>
              <div className='search'>
                {searchBoolean ? (
                  <span onClick={clickSearch}>검색창 닫기</span>
                ) : (
                  <span onClick={clickSearch}>검색창 열기</span>
                )}
              </div>
            </li>
          </HamburgerMenu>
        </HamburgerMenuWrapper>
      </HamburgerButton>
    </HeaderWrapper>
  );
};
