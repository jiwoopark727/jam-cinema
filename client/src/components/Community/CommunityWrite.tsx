import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { CommunityTopTitle } from './CommunityTopTitle';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router';

const CommunityWriteWrapper = styled.div`
  input,
  textarea {
    width: 100%;
    background: inherit;
    color: #000;
    border: 1px solid #797979;
    border-radius: 5px;
    margin: 10px 0 20px;
    padding: 10px 0 10px 10px;
  }
  .write_title {
    margin-top: 20px;
  }
  .write_content {
    textarea {
      height: 60vh;
    }
  }
  .write_btn {
    display: flex;
    justify-content: center;
    button {
      margin: 0 10px 30px;
      padding: 7px 15px;
      border-radius: 5px;
      background: #4939fc;
      color: #fff;
    }
  }
  .err_msg {
    color: red;
    font-size: 12px;
    margin: -17px 0 8px;
  }
`;

export const CommunityWrite = () => {
  const navigate = useNavigate();

  const currentUser = useSelector(
    (state: RootState) => state.members.user.nickname
  );

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [titleErr, setTitleErr] = useState('');
  const [contentErr, setContentErr] = useState('');

  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  const titleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const contentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) {
      setTitleErr('제목을 입력해 주세요.');
      titleRef.current!.focus();
      return;
    }
    setTitleErr('');
    if (!content) {
      setContentErr('내용을 입력해 주세요.');
      contentRef.current!.focus();
      return;
    }
    setContentErr('');

    const now = dayjs();
    const communityInfo = {
      title: title,
      content: content,
      nickname: currentUser,
      date: now.format('YYYY-MM-DD HH:mm:ss'),
    };

    axios
      .post('http://localhost:8001/community/write', { communityInfo })
      .then((res) => {
        if (res.data.affectedRows) {
          alert('등록이 완료되었습니다.');
          navigate('/community');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const cancel = () => {
    navigate(-1);
  };

  return (
    <CommunityWriteWrapper className='row'>
      <CommunityTopTitle title={'커뮤니티 작성'} />
      <form onSubmit={handleSubmit}>
        <div className='write_title'>
          <p>제목</p>
          <input
            type='text'
            placeholder='제목을 입력하세요.'
            ref={titleRef}
            onChange={titleChange}
          />
          {titleErr && <p className='err_msg'>{titleErr}</p>}
        </div>
        <div className='write_content'>
          <p>내용</p>
          <textarea
            placeholder='내용을 입력하세요.'
            ref={contentRef}
            onChange={contentChange}
          />
          {contentErr && <p className='err_msg'>{contentErr}</p>}
        </div>
        <div className='write_btn'>
          <button type='button' onClick={cancel}>
            취소
          </button>
          <button type='submit'>등록</button>
        </div>
      </form>
    </CommunityWriteWrapper>
  );
};
