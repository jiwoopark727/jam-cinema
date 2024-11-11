import { faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../../store';
import { searchOnOff } from '../../store/search';

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
  const dispatch = useDispatch();
  const searchBoolean = useSelector((state: RootState) => state.search.search);

  const searchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(searchOnOff(!searchBoolean));
  };

  return (
    <SearchWrapper>
      <SearchForm onSubmit={searchSubmit}>
        <input type='text' />
        <button type='submit'>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </SearchForm>
      <SearchWord>
        <Recent>
          <div className='title'>
            <h3>최근 검색어</h3>
            <span>
              모두 지우기 <FontAwesomeIcon icon={faXmark} />
            </span>
          </div>
          <div className='list'>
            <p>
              검색어1 <FontAwesomeIcon icon={faXmark} />
            </p>
            <p>
              검색어1 <FontAwesomeIcon icon={faXmark} />
            </p>
            <p>
              검색어1 <FontAwesomeIcon icon={faXmark} />
            </p>
            <p>
              검색어1 <FontAwesomeIcon icon={faXmark} />
            </p>
            <p>
              검색어1 <FontAwesomeIcon icon={faXmark} />
            </p>
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
