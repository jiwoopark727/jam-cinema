import { faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../../store';
import { searchOnOff } from '../../store/search';
import { useNavigate } from 'react-router';
import axios from 'axios';
import dayjs from 'dayjs';
import { IResultData } from './ResultSection';
import { API_URL } from '../../utils/api';

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
  color: ${(props) => props.theme.textColor};
`;

const SearchForm = styled.form`
  position: relative;
  width: 50%;
  margin: 80px 0 60px;
  color: ${(props) => props.theme.textColor};
  input {
    width: 100%;
    background-color: inherit;
    border-bottom: 1px solid black;
    border-color: ${(props) => props.theme.textColor};
    color: ${(props) => props.theme.textColor};
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
    color: ${(props) => props.theme.textColor};
  }
`;

const SearchWord = styled.div`
  width: 50%;
  display: flex;
  justify-content: flex-start;
`;

const Recent = styled.div`
  width: 50%;
  .title {
    display: flex;
    margin-bottom: 10px;
    align-items: center;
    h3 {
      margin-right: 15px;
    }
    span {
      font-size: 14px;
      cursor: pointer;
    }
  }
  .list {
    margin-left: 7px;
    p {
      margin-bottom: 5px;
      & > span {
        cursor: pointer;
        transition: all 0.3s;
        &:hover {
          color: #4939fc;
        }
      }
      svg {
        font-size: 14px;
        color: ${(props) => props.theme.textColor};
        cursor: pointer;
        margin-left: 5px;
      }
    }
  }
  .need_login {
    p {
      margin-top: 10px;
      cursor: pointer;
    }
  }
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
  .title {
    margin-bottom: 10px;
  }
  .list {
    display: grid;
    gap: 15px;
    row-gap: 40px;
    grid-template-columns: repeat(3, 1fr);
  }
`;

const RelatedImg = styled.div<{ img: string }>`
  background-image: url(${(props) => props.img});
  background-size: cover;
  background-position: center center;
  height: 200px;
  border-radius: 10px;
  cursor: pointer;
`;

const SearchSection = () => {
  const [keyword, setKeyword] = useState('');
  const [recentKeywordList, setRecentKeywordList] = useState<IRecent[]>([]);
  const [relatedWord, setRelatedWord] = useState<IResultData[]>([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const searchBoolean = useSelector((state: RootState) => state.search.search);
  const userId = useSelector((state: RootState) => state.members.user.userId);

  const searchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(searchOnOff(false));
    navigate(`/results?search_query=${keyword}`);
    const date = dayjs().format('YYYY-MM-DD HH:mm:ss');
    axios
      .post(`${API_URL}/search/add`, {
        keyword: keyword,
        userId: userId,
        date: date,
      })
      .then((_) => {})
      .catch((err) => console.log(err));
  };

  const clickRecent = (keyword: string) => {
    dispatch(searchOnOff(false));
    navigate(`/results?search_query=${keyword}`);
    const date = dayjs().format('YYYY-MM-DD HH:mm:ss');
    axios
      .post(`${API_URL}/search/add`, {
        keyword: keyword,
        userId: userId,
        date: date,
      })
      .then((_) => {})
      .catch((err) => console.log(err));
  };

  const changeKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?query=${e.target.value}&api_key=878ff909e9f63d6bb3b857c0479816e5&include_adult=false&language=ko-KR&page=1`
      )
      .then((res) => {
        setRelatedWord(res.data.results);
      })
      .catch((err) => console.log(err));
  };

  const allDeleteRecent = () => {
    axios
      .delete(`${API_URL}/search/allDelete?userId=${userId}`)
      .then((_) => {})
      .catch((err) => console.log(err));
    setRecentKeywordList([]);
  };

  const deleteRecent = (word: string) => {
    axios
      .delete(`${API_URL}/search/delete?userId=${userId}&word=${word}`)
      .then((_) => {})
      .catch((err) => console.log(err));
    setRecentKeywordList((prevList) => prevList.filter((item) => item.word !== word));
  };

  const goToLogin = () => {
    navigate('/login');
    dispatch(searchOnOff(!searchBoolean));
  };

  const clickRelated = (data: IResultData) => {
    navigate(`/detail/${data.id}`);
    dispatch(searchOnOff(false));
  };

  useEffect(() => {
    axios
      .get(`${API_URL}/search/list?userId=${userId}`)
      .then((res) => {
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
          {userId ? (
            <>
              <div className='title'>
                <h3>최근 검색어</h3>
                {userId ? (
                  <span onClick={allDeleteRecent}>
                    모두 지우기 <FontAwesomeIcon icon={faXmark} />
                  </span>
                ) : (
                  ''
                )}
              </div>
              <div className='list'>
                {recentKeywordList?.map((data) => (
                  <p key={data.word}>
                    <span onClick={() => clickRecent(data.word)}>{data.word} </span>
                    <FontAwesomeIcon icon={faXmark} onClick={() => deleteRecent(data.word)} />
                  </p>
                ))}
              </div>
            </>
          ) : (
            <div className='need_login'>
              <h3>최근 검색어</h3>
              <p onClick={goToLogin}>로그인을 해주세요.</p>
            </div>
          )}
        </Recent>
        <DivideLine>
          <div></div>
        </DivideLine>
        <Relate>
          <div className='title'>
            <h3>연관 검색어</h3>
          </div>
          <div className='list'>
            {relatedWord?.slice(0, 6).map((data) => (
              <div key={data.id} onClick={() => clickRelated(data)}>
                <RelatedImg img={`https://image.tmdb.org/t/p/w200${data.poster_path}`}></RelatedImg>
                <p>{data.title}</p>
              </div>
            ))}
          </div>
        </Relate>
      </SearchWord>
    </SearchWrapper>
  );
};

export default SearchSection;
