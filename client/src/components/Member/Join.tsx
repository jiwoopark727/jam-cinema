import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

const JoinWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const InfoBox = styled.div`
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
  .name {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .last {
      flex: 0 0 45%;
    }
    .first {
      flex: 0 0 45%;
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
  .email {
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
`;

export const Join = () => {
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

  return (
    <JoinWrapper>
      <InfoBox>
        <h1>회원가입</h1>
        <div className='name'>
          <div className='last'>
            <p>성</p>
            <input type='text' placeholder='성을 입력해 주세요.' />
          </div>
          <div className='first'>
            <p>이름</p>
            <input type='text' placeholder='이름을 입력해 주세요.' />
          </div>
        </div>
        <div className='emoji'>
          <p>나만의 캐릭터</p>
          <div className='emoji_wrapper'>
            {animalEmoji.map((emo) => (
              <div>
                <input type='radio' id={emo} name='drone' value={emo} />
                <label htmlFor={emo}>{emo}</label>
              </div>
            ))}
          </div>
        </div>
        <div className='email'>
          <p>이메일</p>
          <input type='email' placeholder='이메일을 입력해 주세요.' />
        </div>
        <div className='pw'>
          <p>비밀번호</p>
          <input type='password' placeholder='비밀번호를 입력해 주세요.' />
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
          />
        </div>
        <div className='btn'>
          <div className='close'>
            <button>닫기</button>
          </div>
          <div className='join'>
            <button>가입하기</button>
          </div>
        </div>
      </InfoBox>
    </JoinWrapper>
  );
};
