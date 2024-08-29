import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { CommunityTopTitle } from './CommunityTopTitle';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const CommunityListWrapper = styled.div`
  .write_btn {
    display: flex;
    justify-content: right;
    a {
      padding: 6px 10px;
      background: #4939fc;
      color: #fff;
      border-radius: 10px;
      font-size: 12px;
    }
  }
  .list_content {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    margin-top: 20px;
    border-top: 2px solid #000;
    li {
      text-align: center;
      font-weight: bold;
      padding: 20px 0;
      background: #afafaf;
      &:nth-child(1) {
        flex: 0 0 10%;
      }
      &:nth-child(2) {
        flex: 0 0 40%;
      }
      &:nth-child(3) {
        flex: 0 0 20%;
      }
      &:nth-child(4) {
        flex: 0 0 20%;
      }
      &:nth-child(5) {
        flex: 0 0 10%;
      }
    }
  }
`;

export const CommunityList = () => {
  const currentUser = useSelector((state: RootState) => state.members.user);
  return (
    <CommunityListWrapper className='row'>
      <CommunityTopTitle title={'커뮤니티'} />
      {Object.keys(currentUser).length !== 0 && (
        <div className='write_btn'>
          <Link to='/community/write'>글 작성</Link>
        </div>
      )}
      <ul className='list_content'>
        <li>번호</li>
        <li>제목</li>
        <li>작성자</li>
        <li>등록일</li>
        <li>조회수</li>
      </ul>
    </CommunityListWrapper>
  );
};
