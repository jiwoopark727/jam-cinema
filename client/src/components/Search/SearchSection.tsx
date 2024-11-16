import { faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../../store';
import { searchOnOff } from '../../store/search';
import { useNavigate } from 'react-router';
import axios from 'axios';
import dayjs from 'dayjs';

interface IRecent {
  userId: number;
  word: string;
  date: string;
}

const SearchWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  .title {
    display: flex;
    margin-bottom: 10px;
    align-items: center;
    h3 {
      margin-right: 15px;
    }
    span {
      font-size: 14px;
      color: #8d8d8d;
      cursor: pointer;
    }
  }
  .list {
    margin-left: 7px;
    p {
      margin-bottom: 5px;
      svg {
        font-size: 14px;
        color: #8d8d8d;
        cursor: pointer;
        margin-left: 5px;
      }
    }
  }
`;

const SearchForm = styled.form`
  position: relative;
  width: 50%;
  margin: 80px 0 60px;
  input {
    width: 100%;
    background-color: inherit;
    border-bottom: 1px solid black;
    margin-right: 5px;
    padding: 5px;
    outline: none;
    font-size: 24px;
  }
  button {
    position: absolute;
    top: 5px;
    right: 10px;
    cursor: pointer;
    font-size: 21px;
    background-color: inherit;
  }
`;

const SearchWord = styled.div`
  width: 50%;
  display: flex;
  justify-content: flex-start;
`;

const Recent = styled.div`
  width: 50%;
`;

const DivideLine = styled.div`
  height: calc(100vh - 186px);
  div {
    width: 100%;
    height: 100%;
    border-left: 1px solid #b2b2b2;
  }
`;

const Relate = styled.div`
  width: 49%;
  padding-left: 35px;
`;

const SearchSection = () => {
  const [keyword, setKeyword] = useState('');
  const [recentKeywordList, setRecentKeywordList] = useState<IRecent[]>([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const searchBoolean = useSelector((state: RootState) => state.search.search);
  const userId = useSelector((state: RootState) => state.members.user.userId);

  const searchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(searchOnOff(!searchBoolean));
    navigate(`/results?search_query=${keyword}`);
    const date = dayjs().format('YYYY-MM-DD HH:mm:ss');
    axios
      .post('http://localhost:8001/search/add', {
        keyword: keyword,
        userId: userId,
        date: date,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  const changeKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const allDeleteRecent = () => {
    console.log('모두 지우기 클릭');
    axios
      .delete(`http://localhost:8001/search/allDelete?userId=${userId}`)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    setRecentKeywordList([]);
  };

  const deleteRecent = (word: string) => {
    console.log('하나 지우기 클릭');
    axios
      .delete(`http://localhost:8001/search/delete?userId=${userId}&word=${word}`)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    setRecentKeywordList((prevList) => prevList.filter((item) => item.word !== word));
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8001/search/list?userId=${userId}`)
      .then((res) => {
        console.log(res);
        setRecentKeywordList(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <SearchWrapper>
      <SearchForm onSubmit={searchSubmit}>
        <input type='text' value={keyword} onChange={changeKeyword} />
        <button type='submit'>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </SearchForm>
      <SearchWord>
        <Recent>
          <div className='title'>
            <h3>최근 검색어</h3>
            <span onClick={allDeleteRecent}>
              모두 지우기 <FontAwesomeIcon icon={faXmark} />
            </span>
          </div>
          <div className='list'>
            {recentKeywordList?.map((data) => (
              <p>
                {data.word}{' '}
                <FontAwesomeIcon icon={faXmark} onClick={() => deleteRecent(data.word)} />
              </p>
            ))}
          </div>
        </Recent>
        <DivideLine>
          <div></div>
        </DivideLine>
        <Relate>
          <div className='title'>
            <h3>연관 검색어</h3>
          </div>
          <div className='list'>
            <p>검색어2</p>
            <p>검색어2</p>
            <p>검색어2</p>
            <p>검색어2</p>
            <p>검색어2</p>
          </div>
        </Relate>
      </SearchWord>
    </SearchWrapper>
  );
};

export default SearchSection;
