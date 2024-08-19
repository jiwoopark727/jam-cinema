import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useRef, useState } from 'react';
import styled from 'styled-components';

const JoinWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const InfoBox = styled.form`
  width: 50%;
  background: #fafafa;
  padding: 70px 100px;
  border-radius: 50px;
  h1 {
    text-align: center;
    margin-bottom: 30px;
  }
  input {
    width: 100%;
    border: 1px solid #d7d7d7;
    padding: 10px 15px;
    margin-top: 5px;
    &:focus {
      outline: none;
    }
  }
  .email {
    margin-top: 20px;
    p {
      margin-bottom: 5px;
    }
  }
  .emoji {
    margin-top: 20px;
    p {
      margin-bottom: 5px;
    }
    .emoji_wrapper {
      display: flex;
      justify-content: space-between;
      div {
        display: flex;
        flex-direction: column-reverse;
        font-size: 2vw;
      }
    }
  }
  .nickname {
    margin-top: 20px;
    p {
      margin-bottom: 5px;
    }
  }
  .pw {
    margin-top: 20px;
    p {
      margin-bottom: 5px;
    }
    .standard_check {
      display: flex;
      color: #aeaeae;
      font-size: 12px;
      margin-top: 5px;
      p {
        margin: 0 0 0 3px;
      }
      .length {
        display: flex;
        align-items: center;
        margin-right: 15px;
      }
      .number {
        display: flex;
        align-items: center;
        margin-right: 15px;
      }
      .eng {
        display: flex;
        align-items: center;
        margin-right: 15px;
      }
    }
  }
  .pw_ok {
    margin-top: 20px;
    p {
      margin-bottom: 5px;
    }
  }
  .btn {
    display: flex;
    justify-content: center;
    margin-top: 50px;
    .close {
      margin-right: 20px;
      button {
        background: inherit;
        color: #aeaeae;
        padding: 15px 50px;
        border: 1px solid #aeaeae;
      }
    }
    .join {
      button {
        background: #4939fc;
        color: #fff;
        padding: 16px 150px;
      }
    }
  }
  .err_msg {
    color: red;
    font-size: 12px;
    margin-top: 3px;
  }
  input {
    &.err {
      border-color: #f00;
    }
  }
`;

export const Join = () => {
  const [userInfo, setUserInfo] = useState({
    userEmail: '',
    userEmoji: '',
    userNickName: '',
    userPw: '',
    userPwOk: '',
  });
  const [emailErrMsg, setEmailErrMsg] = useState('');
  const [emojiErrMsg, setEmojiErrMsg] = useState('');
  const [nicknameErrMsg, setNicknameErrMsg] = useState('');
  const [pwErrMsg, setPwErrMsg] = useState('');
  const [pwOkErrMsg, setPwOkErrMsg] = useState('');

  const userEmailRef = useRef<HTMLInputElement>(null);
  const userNicknameRef = useRef<HTMLInputElement>(null);
  const userPwRef = useRef<HTMLInputElement>(null);
  const userPwOkRef = useRef<HTMLInputElement>(null);

  const animalEmoji = [
    '🐶',
    '🐷',
    '🐯',
    '🐰',
    '🐱',
    '🐻',
    '🐹',
    '🐼',
    '🐮',
    '🦊',
    '🐵',
    '🦁',
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setUserInfo((userInfo) => ({ ...userInfo, [name]: value }));
  };

  const emojiChange = (idx: number) => {
    setUserInfo((userInfo) => ({
      ...userInfo,
      userEmoji: String(idx),
    }));
    setEmojiErrMsg('');
  };

  const joinSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // input 창에 값이 비어있거나 비밀번호가 일치하지 않으면 에러메세지 저장
    if (!userInfo.userEmail) {
      setEmailErrMsg('이메일을 입력해 주세요.');
      userEmailRef.current!.focus();
      return;
    }
    if (!userInfo.userEmoji) {
      setEmojiErrMsg('캐릭터를 선택해 주세요.');
      return;
    }
    if (!userInfo.userNickName) {
      setNicknameErrMsg('닉네임을 입력해 주세요.');
      userNicknameRef.current!.focus();
      return;
    }
    if (!userInfo.userPw) {
      setPwErrMsg('비밀번호를 입력해 주세요.');
      userPwRef.current!.focus();
      return;
    }
    if (!userInfo.userPwOk) {
      setPwOkErrMsg('비밀번호를 입력해 주세요.');
      userPwOkRef.current!.focus();
      return;
    }
    if (userInfo.userPw !== userInfo.userPwOk) {
      setPwOkErrMsg('비밀번호가 일치하지 않습니다.');
      userPwOkRef.current!.focus();
      return;
    }
    if (emailErrMsg || nicknameErrMsg) {
      emailErrMsg
        ? userEmailRef.current!.focus()
        : userNicknameRef.current!.focus();
      return;
    }

    const addMember = {
      email: userInfo.userEmail,
      emoji: userInfo.userEmoji,
      nickname: userInfo.userNickName,
      password: userInfo.userPw,
    };

    axios
      .post('http://localhost:8001/auth/join', { addMember })
      .then((res) => {
        if (res.data.affectedRows === 1) {
          alert('회원가입이 완료되었습니다.');
        } else {
          alert('회원가입 실패');
          return;
        }
      })
      .catch((err) => console.log(err));
  };

  const emailCheck = (email: string) => {
    email
      ? axios
          .post('http://localhost:8001/auth/emailcheck', { email: email })
          .then((res) => {
            res.data[0]
              ? setEmailErrMsg('중복된 이메일입니다.')
              : setEmailErrMsg('');
          })
          .catch((err) => console.log(err))
      : setEmailErrMsg('이메일을 입력해 주세요.');
  };

  const nicknameCheck = (nickname: string) => {
    nickname
      ? axios
          .post('http://localhost:8001/auth/nicknamecheck', {
            nickname: nickname,
          })
          .then((res) => {
            res.data[0]
              ? setNicknameErrMsg('중복된 닉네임입니다.')
              : setNicknameErrMsg('');
          })
          .catch((err) => console.log(err))
      : setNicknameErrMsg('닉네임을 입력해 주세요.');
  };

  return (
    <JoinWrapper>
      <InfoBox onSubmit={joinSubmit}>
        <h1>회원가입</h1>
        <div className='email'>
          <p>이메일</p>
          <input
            type='email'
            placeholder='이메일을 입력해 주세요.'
            name='userEmail'
            onChange={handleChange}
            ref={userEmailRef}
            onBlur={(e) => emailCheck(e.target.value)}
            className={emailErrMsg ? 'err' : ''}
          />
          <div className='err_msg'>{emailErrMsg}</div>
        </div>
        <div className='emoji'>
          <p>나만의 캐릭터</p>
          <div className='emoji_wrapper'>
            {animalEmoji.map((emo, idx) => (
              <div>
                <input
                  type='radio'
                  id={emo}
                  name='userEmoji'
                  value={emo}
                  onChange={() => emojiChange(idx)}
                />
                <label htmlFor={emo}>{emo}</label>
              </div>
            ))}
          </div>
          <div className='err_msg'>{emojiErrMsg}</div>
        </div>
        <div className='nickname'>
          <p>닉네임</p>
          <input
            type='text'
            placeholder='닉네임을 입력해 주세요.'
            name='userNickName'
            maxLength={8}
            onChange={handleChange}
            ref={userNicknameRef}
            onBlur={(e) => nicknameCheck(e.target.value)}
            className={nicknameErrMsg ? 'err' : ''}
          />
          <div className='err_msg'>{nicknameErrMsg}</div>
        </div>
        <div className='pw'>
          <p>비밀번호</p>
          <input
            type='password'
            placeholder='비밀번호를 입력해 주세요.'
            name='userPw'
            onChange={handleChange}
            ref={userPwRef}
            onBlur={() =>
              userInfo.userPw
                ? setPwErrMsg('')
                : setPwErrMsg('비밀번호를 입력해 주세요.')
            }
            className={pwErrMsg ? 'err' : ''}
          />
          <div className='err_msg'>{pwErrMsg}</div>
          <div className='standard_check'>
            <div className='length'>
              <FontAwesomeIcon icon={faCircleCheck} />
              <p>8자리 이상</p>
            </div>
            <div className='number'>
              <FontAwesomeIcon icon={faCircleCheck} />
              <p>숫자 포함</p>
            </div>
            <div className='eng'>
              <FontAwesomeIcon icon={faCircleCheck} />
              <p>영문 포함</p>
            </div>
          </div>
        </div>
        <div className='pw_ok'>
          <p>비밀번호 확인</p>
          <input
            type='password'
            placeholder='비밀번호를 한번 더 입력해 주세요.'
            name='userPwOk'
            onChange={handleChange}
            ref={userPwOkRef}
            onBlur={() =>
              userInfo.userPwOk
                ? setPwOkErrMsg('')
                : setPwOkErrMsg('비밀번호를 입력해 주세요.')
            }
            className={pwOkErrMsg ? 'err' : ''}
          />
          <div className='err_msg'>{pwOkErrMsg}</div>
        </div>
        <div className='btn'>
          <div className='close'>
            <button>닫기</button>
          </div>
          <div className='join'>
            <button type='submit'>가입하기</button>
          </div>
        </div>
      </InfoBox>
    </JoinWrapper>
  );
};
