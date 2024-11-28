import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../../store';
import { useState } from 'react';

const MPWrapper = styled.div`
  height: 100vh;
`;

const MPTitle = styled.div`
  font-weight: 600;
  font-size: 35px;
  justify-content: center;
  display: flex;
  padding-top: 40px;
`;

const MPContainer = styled.div`
  padding-top: 50px;
  margin-left: 300px;
  margin-right: 300px;
`;

const Tab = styled.div`
  display: flex;
  justify-content: left;

  .modify {
    width: 150px;
    background-color: white;
    font-size: 18px;
    padding: 15px 15px 12px 15px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    &:hover {
      background: white;
    }
  }

  .post {
    width: 150px;
    background: #e4e4e4;
    font-size: 18px;
    padding: 12px 15px 12px 10px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    &:hover {
      background: white;
    }
  }
`;

const MPCBox = styled.div`
  background: white;
  width: 1300px;
  height: 800px;
  padding: 50px 20px 20px 50px;
`;

const Label = styled.div`
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
    margin-left: 8px;
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

const MyPage = () => {
  const currentUserInfo = useSelector((state: RootState) => state.members.user);

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

  const [nickname, setNickname] = useState('');

  const [emojiValue, setEmojiValue] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');

  return (
    <MPWrapper>
      <MPTitle>마이 페이지</MPTitle>
      <MPContainer>
        <Tab>
          <button className='modify'>개인 정보 수정</button>
          <button className='post'>내가 쓴 글</button>
        </Tab>
        <MPCBox>
          <Label>닉네임</Label>
          <NicknameInput
            placeholder={currentUserInfo.nickname}
            onChange={(e) => {
              setNickname(e.target.value);
              console.log(nickname);
            }}
          ></NicknameInput>

          <div>
            <Label>나만의 캐릭터</Label>
            <EmojiContainer>
              {animalEmoji.map((emoji, index) => {
                return (
                  <EmojiOption key={index}>
                    {emoji}
                    <input
                      type='radio'
                      name='emoji'
                      value={emojiValue}
                      onChange={() => setEmojiValue(emoji)}
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
            <Label htmlFor='password'>패스워드 </Label>
            <PasswordInput
              placeholder='패스워드 입력'
              onChange={(e) => {
                setPassword(e.target.value);
                console.log(password);
              }}
            ></PasswordInput>
            <br />
            <PasswordInput
              placeholder='패스워드 재입력'
              onChange={(e) => {
                setPasswordCheck(e.target.value);
                console.log(passwordCheck);
              }}
            ></PasswordInput>
          </PasswordContainer>

          <SubmitButton type='submit'>수정</SubmitButton>
        </MPCBox>
      </MPContainer>
    </MPWrapper>
  );
};
export default MyPage;
