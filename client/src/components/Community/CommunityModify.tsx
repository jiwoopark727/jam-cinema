import React from 'react';
import styled from 'styled-components';
import { CommunityTopTitle } from './CommunityTopTitle';

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
`;

export const CommunityModify = () => {
  return (
    <CommunityModifyWrapper className='row'>
      <CommunityTopTitle title={'커뮤니티 수정'} />
      <form>
        <div className='write_title'>
          <p>제목</p>
          <input type='text' placeholder='제목을 입력하세요.' />
        </div>
        <div className='write_content'>
          <p>내용</p>
          <textarea placeholder='내용을 입력하세요.' />
        </div>
        <div className='write_btn'>
          <button type='button'>취소</button>
          <button type='submit'>수정</button>
        </div>
      </form>
    </CommunityModifyWrapper>
  );
};
