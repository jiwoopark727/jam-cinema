import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { CommunityTopTitle } from './CommunityTopTitle';
import { listType } from './CommunityList';
import dayjs from 'dayjs';
import axios from 'axios';
import { useNavigate } from 'react-router';

const CommunityModifyWrapper = styled.div`
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

interface CommunityModifyProps {
  info: listType;
}

export const CommunityModify: React.FC<CommunityModifyProps> = ({ info }) => {
  const navigate = useNavigate();

  const [changedTitle, setChangedTitle] = useState(info.title);
  const [changedContent, setChangedContent] = useState(info.content);
  const [titleErr, setTitleErr] = useState('');
  const [contentErr, setContentErr] = useState('');

  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  const titleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChangedTitle(e.target.value);
  };

  const contentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setChangedContent(e.target.value);
  };

  const changeSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!changedTitle) {
      setTitleErr('제목을 입력해 주세요.');
      titleRef.current!.focus();
      return;
    }
    setTitleErr('');
    if (!changedContent) {
      setContentErr('내용을 입력해 주세요.');
      contentRef.current!.focus();
      return;
    }
    setContentErr('');

    const now = dayjs();
    const communityInfo = {
      communityNumber: info.communityNumber,
      title: changedTitle,
      content: changedContent,
      date: now.format('YYYY-MM-DD HH:mm:ss'),
    };

    axios
      .post('http://localhost:8001/community/modify', { communityInfo })
      .then((res) => {
        if (res.data.affectedRows) {
          alert('수정이 완료되었습니다.');
          navigate('/community');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <CommunityModifyWrapper className='row'>
      <CommunityTopTitle title={'커뮤니티 수정'} />
      <form onSubmit={changeSubmit}>
        <div className='write_title'>
          <p>제목</p>
          <input
            type='text'
            placeholder='제목을 입력하세요.'
            value={changedTitle}
            ref={titleRef}
            onChange={titleChange}
          />
          {titleErr && <p className='err_msg'>{titleErr}</p>}
        </div>
        <div className='write_content'>
          <p>내용</p>
          <textarea
            placeholder='내용을 입력하세요.'
            value={changedContent}
            ref={contentRef}
            onChange={contentChange}
          />
          {contentErr && <p className='err_msg'>{contentErr}</p>}
        </div>
        <div className='write_btn'>
          <button type='button'>취소</button>
          <button type='submit'>수정</button>
        </div>
      </form>
    </CommunityModifyWrapper>
  );
};
