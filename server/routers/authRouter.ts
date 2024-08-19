import express from 'express';
import { db } from '../db';

const authRouter = express.Router();

authRouter.post('/join', (req, res) => {
  const { email, emoji, nickname, password } = req.body.addMember;
  db.query(
    'INSERT INTO users (email, emoji, nickname, password) VALUES (?, ?, ?, ?)',
    [email, emoji, nickname, password],
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
      throw err;
    } else {
      res.send(result);
    }
  });
});

authRouter.post('/nicknamecheck', (req, res) => {
  const nickname = req.body.nickname;
  db.query(
    'SELECT * FROM users WHERE nickname=?',
    [nickname],
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

authRouter.post('/login', (req, res) => {
  // 로그인 로직
});

export default authRouter;
