import express from 'express';
import { db } from '../db';
import bcrypt from 'bcrypt';

const authRouter = express.Router();

authRouter.post('/join', async (req, res) => {
  const { email, emoji, nickname, password } = req.body.addMember;
  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(password, salt);
  console.log(hashed);

  db.query(
    'INSERT INTO users (email, emoji, nickname, password) VALUES (?, ?, ?, ?)',
    [email, emoji, nickname, hashed],
    (err, result) => {
      if (err) {
        res.status(500).send('회원가입 실패');
        throw err;
      } else {
        res.send(result);
      }
    }
  );
});

authRouter.post('/emailcheck', (req, res) => {
  const email = req.body.email;
  db.query('SELECT * FROM users WHERE email=?', [email], (err, result) => {
    if (err) {
      res.status(500).send('회원가입 실패');
      console.log(err);
      throw err;
    } else {
      res.send(result);
    }
  });
});

authRouter.post('/nicknamecheck', (req, res) => {
  const nickname = req.body.nickname;
  db.query('SELECT * FROM users WHERE nickname=?', [nickname], (err, result) => {
    if (err) {
      res.status(500).send('회원가입 실패');
      throw err;
    } else {
      res.send(result);
    }
  });
});

authRouter.post('/login', async (req, res) => {
  const { userId, userPw } = req.body;

  db.query('SELECT * FROM users WHERE email=?', [userId], async (err, result) => {
    if (err) {
      res.status(500).send('로그인 실패');
      throw err;
    }
    if (result.length === 0) {
      return res.status(404).send('존재하지 않는 사용자입니다.');
    }

    const user = result[0];

    try {
      const validPassword = await bcrypt.compare(userPw, user.password);
      console.log(validPassword);

      if (validPassword) {
        res.status(200).send({
          message: '로그인 성공',
          user: {
            userId: user.userId,
            email: user.email,
            nickname: user.nickname,
            emoji: user.emoji,
          },
        });
      } else {
        res.status(401).send('비밀번호가 올바르지 않습니다.');
      }
    } catch (err) {
      res.status(500).send('서버 오류가 발생했습니다.');
      console.error(err);
    }
  });
});

export default authRouter;
