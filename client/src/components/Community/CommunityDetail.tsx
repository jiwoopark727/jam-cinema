import React from 'react';
import styled from 'styled-components';
import { CommunityTopTitle } from './CommunityTopTitle';
import { Link } from 'react-router-dom';

const CommunityDetailWrapper = styled.div`
  .detail_title {
    margin-top: 40px;
    border-top: 1px solid #000;
    p {
      margin: 30px 0;
      text-align: center;
      font-weight: bold;
    }
  }
  .detail_info {
    display: flex;
    flex-wrap: wrap;
    border-top: 1px solid #929292;
    border-bottom: 1px solid #929292;
    padding: 30px 0;
    span {
      &:first-child {
        padding: 30px 40px;
        background: #d9d9d9;
      }
      &:last-child {
        padding-left: 10px;
      }
    }
    .info_name {
      flex: 0 0 40%;
    }
    .info_date {
      flex: 0 0 40%;
    }
    .info_hit {
      flex: 0 0 20%;
    }
  }
  .detail_content {
    margin: 20px 10px;
    border-bottom: 1px solid #000;
    p {
      margin-bottom: 30px;
    }
  }
  .detail_btn {
    text-align: right;
    margin-right: 20px;
    a {
      background: #4939fc;
      color: #fff;
      padding: 5px 10px;
      border-radius: 5px;
      font-size: 14px;
    }
  }
`;

export const CommunityDetail = () => {
  return (
    <CommunityDetailWrapper className='row'>
      <CommunityTopTitle title={'커뮤니티'} />
      <div className='detail_title'>
        <p>제목</p>
      </div>
      <div className='detail_info'>
        <div className='info_name'>
          <span>작성자</span>
          <span>닉네임</span>
        </div>
        <div className='info_date'>
          <span>작성일</span>
          <span>2024-08-27</span>
        </div>
        <div className='info_hit'>
          <span>조회수</span>
          <span>3</span>
        </div>
      </div>
      <div className='detail_content'>
        <p>
          폭스뉴스와 합의했다고 밝혔다. 트럼프 전 대통령은 2일 소셜미디어
          트루스소셜에 이 같은 계획을 담은 글을 직접 게시했다. 이번 대선토론은
          조 바이든... 트럼프 전 대통령은 폭스뉴스 토론이 펜실베이니아주에서
          개최 이번 대선토론은 조 바이든... 트럼프 전 대통령은 폭스뉴스 토론이
          ... 폭스뉴스와 합의했다고 밝혔다. 트럼프 전 대통령은 2일 소셜미디어
          트루스소셜에 이 같은 계획을 담은 글을 직접 게시했다. 이번 대선토론은
          조 바이든... 트럼프 전 대통령은 폭스뉴스 토론이 펜실베이니아주에서
          개최 이번 대선토론은 조 바이든... 트럼프 전 대통령은 폭스뉴스 토론이
          ... 폭스뉴스와 합의했다고 밝혔다. 트럼프 전 대통령은 2일 소셜미디어
          트루스소셜에 이 같은 계획을 담은 글을 직접 게시했다. 이번 대선토론은
          조 바이든... 트럼프 전 대통령은 폭스뉴스 토론이 펜실베이니아주에서
          개최 이번 대선토론은 조 바이든... 트럼프 전 대통령은 폭스뉴스 토론이
          ...
        </p>
      </div>
      <div className='detail_btn'>
        <Link to='/community'>목록</Link>
      </div>
    </CommunityDetailWrapper>
  );
};
