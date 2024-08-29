import express from 'express';
import { db } from '../db';

const communityRouter = express.Router();

communityRouter.post('/write', (req, res) => {
  const { title, content, nickname, date } = req.body.communityInfo;
  db.query(
    'INSERT INTO community (title, content, nickname, date) VALUES (?, ?, ?, ?)',
    [title, content, nickname, date],
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

export default communityRouter;
