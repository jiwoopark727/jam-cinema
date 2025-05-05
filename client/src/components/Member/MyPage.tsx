import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../../store';
import { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { userLogin } from '../../store/member';
import Pagination from '../Pagination/Pagination';
import dayjs from 'dayjs';
import { API_URL } from '../../utils/api';

const MPWrapper = styled.div`
  height: 110vh;
`;

const MPTitle = styled.div`
  font-weight: 600;
  font-size: 35px;
  justify-content: center;
  display: flex;
  padding-top: 40px;
  color: ${(props) => props.theme.textColor};
`;

const MPContainer = styled.div`
  padding-top: 50px;
  margin-left: 300px;
  margin-right: 300px;
`;

const Tab = styled.div`
  display: flex;
  justify-content: left;

  .TButton {
    width: 150px;
    background-color: #e4e4e4;
    font-size: 18px;
    padding: 15px 15px 12px 15px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    &:hover {
      background: white;
    }
  }

  .modify {
    background-color: white;
    &:hover {
      background: white;
    }
  }

  .post {
    background: white;
    &:hover {
      background: white;
    }
  }
`;

const MPCBox = styled.form`
  background: white;
  width: 1300px;
  height: 800px;
  padding: 50px 50px 50px 50px;
  .err_msg {
    color: red;
    font-size: 12px;
    margin-left: 7px;
  }
`;

const Label = styled.label`
  display: block;
  font-size: 17px;
  font-weight: bold;
  padding: 10px;
`;

const NicknameInput = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-left: 7px;
  margin-top: 3px;
  margin-bottom: 20px;
  width: 200px;
  &.err {
    border-color: #f00;
    margin-bottom: 3px;
  }

  &:focus {
    outline: none;
    border-color: #4939fc;
  }
`;

const PasswordInput = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-left: 7px;
  margin-top: 3px;
  margin-bottom: 7px;
  width: 300px;
  &.err {
    border-color: #f00;
  }

  &:focus {
    outline: none;
    border-color: #4939fc;
  }
`;

const UnChangableBox = styled.div`
  padding: 10px;
  font-size: 16px;
  margin-left: 3px;
`;

const EmojiContainer = styled.div`
  display: flex;
  padding-left: 10px;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
`;

const EmojiOption = styled.div`
  display: flex;
  font-size: 35px;
  flex-direction: column;
  align-items: center;
  gap: 5px;
`;

const PasswordContainer = styled.div`
  margin-bottom: 20px;
  .standard_check {
    margin: 0 0 10px 8px;
    display: flex;
    color: #aeaeae;
    font-size: 12px;
    p {
      margin: 0 0 0 3px;
    }
  }
`;

const SubmitButton = styled.button`
  width: 100px;
  padding: 10px;
  margin-top: 20px;
  margin-left: 6px;
  font-size: 16px;
  color: white;
  background-color: #4939fc;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #4939fc;
  }
`;

const PwStandard = styled.div`
  display: flex;
  align-items: center;
  margin-right: 15px;
  &.check {
    color: #3949fc;
  }
`;

const Modify = styled.div``;

const MyPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUserInfo = useSelector((state: RootState) => state.members.user);

  const userNicknameRef = useRef<HTMLInputElement>(null);
  const userPwRef = useRef<HTMLInputElement>(null);
  const userPwOkRef = useRef<HTMLInputElement>(null);
  const currentPwRef = useRef<HTMLInputElement>(null);

  const animalEmoji = ['🐶', '🐷', '🐯', '🐰', '🐱', '🐻', '🐹', '🐼', '🐮', '🦊', '🐵', '🦁'];

  const [userInfo, setUserInfo] = useState({
    userEmoji: currentUserInfo.emoji,
    userNickName: currentUserInfo.nickname,
    userPw: '',
    userPwOk: '',
  });
  const [nicknameErrMsg, setNicknameErrMsg] = useState('');
  const [pwErrMsg, setPwErrMsg] = useState('');
  const [pwOkErrMsg, setPwOkErrMsg] = useState('');
  const [currentPw, setCurrentPw] = useState('');
  const [pwLength, setPwLength] = useState(false);
  const [pwNum, setPwNum] = useState(false);
  const [pwEng, setPwEng] = useState(false);
  const [state, setState] = useState('modify');
  const [list, setList] = useState<listType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  const goToDetail = (info: listType) => {
    navigate(`/community/detail/${info.communityNumber}`, {
      state: { info: info, currentUser: currentUserInfo.nickname },
    });
  };

  const pageMove = (page: number) => {
    setCurrentPage(page);
  };

  const modifyInfo = (e: React.FormEvent) => {
    e.preventDefault();

    axios
      .post(`${API_URL}/auth/pwCheck`, {
        currentPw: currentPw,
        userId: currentUserInfo.userId,
      })
      .then((res) => {
        if (!res.data) {
          alert('현재 비밀번호를 확인해주세요.');
        } else {
          if (nicknameErrMsg) {
            userNicknameRef.current!.focus();
            return;
          }

          if (userInfo.userPw && (!pwLength || !pwNum || !pwEng)) {
            setPwErrMsg('8자 이상의 영문, 숫자를 사용해 주세요.');
            userPwRef.current!.focus();
            return;
          } else {
            setPwErrMsg('');
          }

          if (userInfo.userPw !== userInfo.userPwOk) {
            setPwOkErrMsg('비밀번호가 일치하지 않습니다.');
            userPwOkRef.current!.focus();
            return;
          }

          const modifyMember = {
            userId: currentUserInfo.userId,
            emoji: userInfo.userEmoji,
            nickname: userInfo.userNickName,
            password: userInfo.userPw,
          };

          axios
            .patch(`${API_URL}/auth/modify`, { modifyMember })
            .then((res) => {
              dispatch(userLogin(res.data.data));
              alert(res.data.message);
              navigate('/');
            })
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => console.log(err));
  };

  const nicknameCheck = (nickname: string) => {
    nickname !== currentUserInfo.nickname
      ? axios
          .post(`${API_URL}/auth/nicknamecheck`, {
            nickname: nickname,
          })
          .then((res) => {
            res.data[0] ? setNicknameErrMsg('중복된 닉네임입니다.') : setNicknameErrMsg('');
          })
          .catch((err) => console.log(err))
      : setNicknameErrMsg('');
  };

  const userPw = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentPw(e.target.value);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setUserInfo((userInfo) => ({ ...userInfo, [name]: value }));
  };

  const pwChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pw = e.target.value;
    const numCheck = /^(?=.*\d).+$/;
    const engCheck = /^(?=.*[a-zA-Z]).+$/;
    pw.length >= 8 ? setPwLength(true) : setPwLength(false);
    numCheck.test(pw) ? setPwNum(true) : setPwNum(false);
    engCheck.test(pw) ? setPwEng(true) : setPwEng(false);
    setUserInfo((userInfo) => ({ ...userInfo, userPw: pw }));
  };

  useEffect(() => {
    if (currentUserInfo.nickname) {
      axios
        .get(`${API_URL}/community/list/my?nickname=${currentUserInfo?.nickname}`)
        .then((res) => setList(res.data))
        .catch((err) => console.log(err));
    }
  }, [currentUserInfo]);

  return (
    <MPWrapper>
      <MPTitle>마이 페이지</MPTitle>
      <MPContainer>
        <Tab>
          <button
            className={state === 'modify' ? 'modify TButton' : 'TButton'}
            onClick={() => setState('modify')}
          >
            개인 정보 수정
          </button>
          <button
            className={state === 'modify' ? 'TButton' : 'post TButton'}
            onClick={() => setState('post')}
          >
            내가 쓴 글
          </button>
        </Tab>
        <MPCBox onSubmit={modifyInfo}>
          {state === 'modify' ? (
            <Modify>
              <Label>닉네임</Label>
              <NicknameInput
                placeholder={currentUserInfo.nickname}
                onChange={handleChange}
                maxLength={8}
                name='userNickName'
                onBlur={(e) => nicknameCheck(e.target.value)}
                className={nicknameErrMsg ? 'err' : ''}
                ref={userNicknameRef}
              ></NicknameInput>
              <div className='err_msg'>{nicknameErrMsg}</div>
              <div>
                <Label>나만의 캐릭터</Label>
                <EmojiContainer>
                  {animalEmoji.map((emoji, index) => {
                    return (
                      <EmojiOption key={index}>
                        {emoji}
                        <input
                          id={emoji}
                          type='radio'
                          name='userEmoji'
                          value={emoji}
                          onChange={handleChange}
                          style={{ marginTop: '4px' }}
                        />
                      </EmojiOption>
                    );
                  })}
                </EmojiContainer>
              </div>

              <div>
                <Label htmlFor='email' style={{ paddingRight: '25.5px' }}>
                  이메일
                </Label>
                <UnChangableBox>{currentUserInfo.email}</UnChangableBox>
              </div>

              <br />

              <PasswordContainer>
                <Label htmlFor='password'>비밀번호</Label>
                <div>
                  <PasswordInput
                    type='password'
                    name='userCurrentPw'
                    placeholder='현재 비밀번호'
                    onChange={userPw}
                    ref={currentPwRef}
                  ></PasswordInput>
                </div>
                <PasswordInput
                  type='password'
                  name='userPw'
                  placeholder='새 비밀번호'
                  onChange={pwChange}
                  ref={userPwRef}
                ></PasswordInput>
                <div className='err_msg'>{pwErrMsg}</div>
                <div className='standard_check'>
                  <PwStandard className={pwLength ? 'check' : ''}>
                    <FontAwesomeIcon icon={faCircleCheck} />
                    <p>8자리 이상</p>
                  </PwStandard>
                  <PwStandard className={pwNum ? 'check' : ''}>
                    <FontAwesomeIcon icon={faCircleCheck} />
                    <p>숫자 포함</p>
                  </PwStandard>
                  <PwStandard className={pwEng ? 'check' : ''}>
                    <FontAwesomeIcon icon={faCircleCheck} />
                    <p>영문 포함</p>
                  </PwStandard>
                </div>
                <PasswordInput
                  type='password'
                  name='userPwOk'
                  placeholder='새 비밀번호 확인'
                  onChange={handleChange}
                  ref={userPwOkRef}
                  className={pwOkErrMsg ? 'err' : ''}
                ></PasswordInput>
                <div className='err_msg'>{pwOkErrMsg}</div>
              </PasswordContainer>

              <SubmitButton type='submit'>수정</SubmitButton>
            </Modify>
          ) : (
            <CommunityListWrapper className='row'>
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
          )}
        </MPCBox>
      </MPContainer>
    </MPWrapper>
  );
};
export default MyPage;

const CommunityListWrapper = styled.div`
  color: ${(props) => props.theme.textColor};
  .list_title {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    border-top: 2px solid #000;
    border-bottom: 1px solid #000;
    border-color: ${(props) => props.theme.textColor};
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
