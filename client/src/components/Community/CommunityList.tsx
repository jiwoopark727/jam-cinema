import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { CommunityTopTitle } from './CommunityTopTitle';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import axios from 'axios';
import dayjs from 'dayjs';
import Pagination from '../Pagination/Pagination';

const CommunityListWrapper = styled.div`
  .write_btn {
    display: flex;
    justify-content: right;
    margin-bottom: -30px;
    a {
      padding: 6px 10px;
      background: #4939fc;
      color: #fff;
      border-radius: 10px;
      font-size: 12px;
    }
  }
  .list_title {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    margin-top: 40px;
    border-top: 2px solid #000;
    border-bottom: 1px solid #000;
    li {
      text-align: center;
      font-weight: bold;
      padding: 20px 0;
      background: inherit;
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
  .list_content {
    margin-bottom: 60px;
    li {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      border-bottom: 1px solid #989898;
      cursor: pointer;
      div {
        text-align: center;
        padding: 30px 0;
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
      &:last-child {
        margin-bottom: 40px;
      }
    }
  }
`;

export interface listType {
  communityNumber: number;
  title: string;
  content: string;
  nickname: string;
  date: string;
  hit: number;
}

export const CommunityList = () => {
  const currentUser = useSelector((state: RootState) => state.members.user);
  const navigate = useNavigate();

  const [list, setList] = useState<listType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const goToDetail = (info: listType) => {
    navigate(`/community/detail/${info.communityNumber}`, {
      state: { info: info, currentUser: currentUser.nickname },
    });
  };

  const pageMove = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    axios
      .get('http://localhost:8001/community/list')
      .then((res) => setList(res.data))
      .catch((err) => console.log(err));
  }, []);

  const options = {
    method: 'GET',
    url: 'https://api.themoviedb.org/3/movie/popular',
    params: { language: 'ko', page: '1' },
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NzhmZjkwOWU5ZjYzZDZiYjNiODU3YzA0Nzk4MTZlNSIsIm5iZiI6MTcyNTYxNDExNi45NDY3MzksInN1YiI6IjY1ZTdkMDZlZWE0MjYzMDE3YjIxOGVkOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.0Yni4SNifcsb_G93C-6G_wFWW7SyWULY_m_krg7DaJg',
    },
  };

  useEffect(() => {
    axios
      .request(options)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }, []);

  return (
    <CommunityListWrapper className='row'>
      <CommunityTopTitle title={'커뮤니티'} />
      {Object.keys(currentUser).length !== 0 && (
        <div className='write_btn'>
          <Link to='/community/write'>글 작성</Link>
        </div>
      )}
      <ul className='list_title'>
        <li>번호</li>
        <li>제목</li>
        <li>작성자</li>
        <li>등록일</li>
        <li>조회수</li>
      </ul>
      <ul className='list_content'>
        {list
          ?.slice(itemsPerPage * (currentPage - 1), itemsPerPage * currentPage)
          .map((val, idx) => (
            <li key={idx} onClick={() => goToDetail(val)}>
              <div>{list.length - idx - (currentPage - 1) * itemsPerPage}</div>
              <div>{val.title}</div>
              <div>{val.nickname}</div>
              <div>{dayjs(val.date).format('YYYY-MM-DD')}</div>
              <div>{val.hit}</div>
            </li>
          ))}
      </ul>
      <Pagination
        currentPage={currentPage}
        totalItems={list.length}
        itemsPerPage={itemsPerPage}
        pageMove={pageMove}
      />
    </CommunityListWrapper>
  );
};
