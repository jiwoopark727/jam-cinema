import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import { UserIcon } from './UserIcon';
import { useEffect, useState } from 'react';
import axios from 'axios';

const HeaderWrapper = styled.div`
  position: relative;
  height: 5vw;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  .logo {
    display: flex;
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
    li {
      font-weight: bold;
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
    }
    .my {
      svg {
        cursor: pointer;
      }
    }
  }
`;

export const Header = () => {
  const [userMenu, setUserMenu] = useState(false);

  const navigate = useNavigate();

  const clickLogo = () => {
    navigate('/');
  };

  const goToCommunity = () => {
    navigate('/community');
  };

  const clickUserMenu = () => {
    setUserMenu(!userMenu);
  };

  const closeUserMenu = () => {
    setUserMenu(false);
  };

  // useEffect(() => {
  //   axios
  //     .get(
  //       'http://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp?collection=kmdb_new2&releaseDts=20240801&nation=대한민국&listCount=20&ServiceKey=0WNF03ALRTCN83536BN5'
  //     )
  //     .then((res) => {
  //       console.log(res.data.Data[0].Result);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  return (
    <HeaderWrapper>
      <div className='logo'>
        <img src='../../images/logo.png' alt='logo' onClick={clickLogo} />
        <div className='dark_mode'>
          <p>다크</p>
          <p>라이트</p>
        </div>
      </div>
      <ul className='menu'>
        <li>뉴스</li>
        <li onClick={goToCommunity}>커뮤니티</li>
        <li>장르별 영화</li>
      </ul>
      <div className='search_my'>
        <div className='search'>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </div>
        <div className='my'>
          <FontAwesomeIcon icon={faUser} onClick={clickUserMenu} />
        </div>
        {userMenu && <UserIcon closeUserMenu={closeUserMenu} />}
      </div>
    </HeaderWrapper>
  );
};
