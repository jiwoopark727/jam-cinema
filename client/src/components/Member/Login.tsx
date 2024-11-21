import { faSquareCheck } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { userLogin } from '../../store/member';

const LoginWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  .login_box {
    width: 50%;
    background: #fafafa;
    padding: 160px 100px;
    border-radius: 50px;
    h1 {
      text-align: center;
      margin-bottom: 30px;
    }
    form {
      input {
        width: 100%;
        border: 1px solid #d7d7d7;
        padding: 10px 15px;
        margin-top: 5px;
      }
      .email {
      }
      .pw {
        margin: 15px 0 5px;
      }
      .login_keep {
        display: flex;
        align-items: center;
        margin: 10px 0 0 5px;
        cursor: pointer;
        svg {
          color: #aeaeae;
          margin-right: 5px;
          &.checked {
            color: #4939fc;
          }
        }
      }
      .err_msg {
        color: red;
        font-size: 12px;
        margin-top: 6px;
      }
      .login_btn {
        display: flex;
        justify-content: center;
        margin-top: 50px;
        .close {
          background: inherit;
          color: #aeaeae;
          padding: 15px 50px;
          border: 1px solid #aeaeae;
          margin-right: 20px;
        }
        .login {
          background: #4939fc;
          color: #fff;
          padding: 16px 150px;
        }
      }
      .go_join {
        display: flex;
        justify-content: center;
        margin-top: 70px;
        color: #aeaeae;
        font-size: 14px;
        p {
          margin-right: 5px;
        }
        a {
          text-decoration: underline;
        }
      }
    }
  }
`;

export const Login = () => {
  const [userId, setUserId] = useState('');
  const [userPw, setUserPw] = useState('');
  const [errMessage, setErrMessage] = useState('');
  const [keepLogged, setKeepLogged] = useState(false);

  const userIdRef = useRef<HTMLInputElement>(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const closeBtn = () => {
    navigate(-1);
  };

  const checkKeepLogged = () => {
    setKeepLogged((prev) => !prev);
  };

  const loginSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    axios
      .post('http://localhost:8001/auth/login', {
        userId: userId,
        userPw: userPw,
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.message === '로그인 성공') {
          dispatch(userLogin(res.data.user));
          navigate('/');
        } else {
          setErrMessage('아이디 또는 비밀번호를 다시 확인해주세요.');
          userIdRef.current!.focus();
          return false;
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <LoginWrapper>
      <div className='login_box' onSubmit={loginSubmit}>
        <h1>로그인</h1>
        <form>
          <div className='email'>
            <p>이메일</p>
            <input
              type='email'
              placeholder='이메일을 입력해 주세요.'
              ref={userIdRef}
              onChange={(e) => setUserId(e.target.value)}
            />
          </div>
          <div className='pw'>
            <p>비밀번호</p>
            <input
              type='password'
              placeholder='비밀번호를 입력해 주세요.'
              onChange={(e) => setUserPw(e.target.value)}
            />
          </div>
          <div className='login_keep' onClick={checkKeepLogged}>
            <FontAwesomeIcon icon={faSquareCheck} className={keepLogged ? 'checked' : ''} />
            <p>로그인 상태 유지</p>
          </div>
          {errMessage && (
            <div className='err_msg'>
              <p>{errMessage}</p>
            </div>
          )}
          <div className='login_btn'>
            <button className='close' type='button' onClick={closeBtn}>
              닫기
            </button>
            <button className='login' type='submit'>
              로그인하기
            </button>
          </div>
          <div className='go_join'>
            <p>계정이 없으신가요?</p>
            <Link to='/join'>회원가입</Link>
          </div>
        </form>
      </div>
    </LoginWrapper>
  );
};
