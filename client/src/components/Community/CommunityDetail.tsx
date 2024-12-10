import React, { useEffect } from 'react';
import styled from 'styled-components';
import { CommunityTopTitle } from './CommunityTopTitle';
import { Link, useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import axios from 'axios';
import { listType } from './CommunityList';

const CommunityDetailWrapper = styled.div`
  color: ${(props) => props.theme.textColor};
  .detail_title {
    margin-top: 40px;
    border-top: 1px solid #000;
    border-color: ${(props) => props.theme.textColor};
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
      & > span {
        &:first-child {
          color: #000;
        }
      }
    }
    .info_date {
      flex: 0 0 40%;
      & > span {
        &:first-child {
          color: #000;
        }
      }
    }
    .info_hit {
      flex: 0 0 20%;
      & > span {
        &:first-child {
          color: #000;
        }
      }
    }
  }
  .detail_content {
    margin: 20px 10px;
    border-bottom: 1px solid #000;
    border-color: ${(props) => props.theme.textColor};
    p {
      margin-bottom: 30px;
    }
  }
  .detail_btn {
    text-align: right;
    margin-right: 20px;
    a,
    button {
      background: #4939fc;
      color: #fff;
      padding: 5px 10px;
      border-radius: 5px;
      font-size: 14px;
      &:first-child {
        margin-right: 10px;
      }
    }
    button {
      margin-right: 10px;
    }
  }
`;

interface CommunityDetailProps {
  info: listType;
  currentUser: string;
}

export const CommunityDetail: React.FC<CommunityDetailProps> = ({ info, currentUser }) => {
  const navigate = useNavigate();

  const deleteCommunity = (communityNumber: number) => {
    if (confirm('정말 삭제하시겠습니까?')) {
      axios
        .delete('http://localhost:8001/community/delete', {
          data: { communityNumber: communityNumber },
        })
        .then((res) => {
          if (res.data.affectedRows) {
            alert('삭제가 완료되었습니다.');
            navigate('/community');
          }
        })
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    axios
      .post('http://localhost:8001/community/hit', {
        communityNumber: info.communityNumber,
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }, []);

  return (
    <CommunityDetailWrapper className='row'>
      <CommunityTopTitle title={'커뮤니티'} />
      <div className='detail_title'>
        <p>{info.title}</p>
      </div>
      <div className='detail_info'>
        <div className='info_name'>
          <span>작성자</span>
          <span>{info.nickname}</span>
        </div>
        <div className='info_date'>
          <span>작성일</span>
          <span>{dayjs(info.date).format('YYYY-MM-DD HH:mm:ss')}</span>
        </div>
        <div className='info_hit'>
          <span>조회수</span>
          <span>{info.hit + 1}</span>
        </div>
      </div>
      <div className='detail_content'>
        <p>{info.content}</p>
      </div>
      <div className='detail_btn'>
        {currentUser === info.nickname && (
          <>
            <Link to={`/community/modify/${info.communityNumber}`} state={{ info: info }}>
              수정
            </Link>
            <button type='button' onClick={() => deleteCommunity(info.communityNumber)}>
              삭제
            </button>
          </>
        )}
        <Link to={'/community'}>목록</Link>
      </div>
    </CommunityDetailWrapper>
  );
};
