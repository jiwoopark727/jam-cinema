import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

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
      &:nth-child(2) {
        margin: 0 50px;
      }
    }
  }
  .search_my {
    display: flex;
    margin-right: 20vh;
    font-size: 18px;
    .search {
      margin-right: 30px;
    }
  }
`;

export const Header = () => {
  return (
    <HeaderWrapper>
      <div className='logo'>
        <img src='../../images/logo.png' alt='logo' />
        <div className='dark_mode'>
          <p>다크</p>
          <p>라이트</p>
        </div>
      </div>
      <ul className='menu'>
        <li>뉴스</li>
        <li>커뮤니티</li>
        <li>장르별 영화</li>
      </ul>
      <div className='search_my'>
        <div className='search'>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </div>
        <div className='my'>
          <FontAwesomeIcon icon={faUser} />
        </div>
      </div>
    </HeaderWrapper>
  );
};
