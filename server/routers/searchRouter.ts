import express from 'express';
import { db } from '../db';

const searchRouter = express.Router();

searchRouter.get('/list', (req, res) => {
  const userId = req.query.userId;
  db.query('SELECT * FROM recent_search_word where userId = ?', [userId], (err, result) => {
    if (err) {
      res.status(500).send('최근 검색어 불러오기 실패');
      throw err;
    } else {
      res.send(result.sort((a: any, b: any) => b.date - a.date));
    }
  });
});

searchRouter.post('/add', (req, res) => {
  const { userId, keyword, date } = req.body;
  if (!userId || !keyword || !date) {
    return res.status(400).send('잘못된 요청');
  }
  db.query(
    'INSERT INTO recent_search_word (userId, word, date) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE date = VALUES(date)',
    [userId, keyword, date],
    (err, result) => {
      if (err) {
        res.status(500).send('검색어 저장 실패');
        throw err;
      } else {
        res.send(result);
      }
    }
  );
});

searchRouter.delete('/delete', (req, res) => {
  const { userId, word } = req.query;
  const deleteQuery = `DELETE FROM recent_search_word WHERE userId = ? AND word = ?`;
  db.query(deleteQuery, [userId, word], (err, result) => {
    if (err) {
      res.status(500).send('커뮤니티 삭제 실패');
      throw err;
    } else {
      res.send(result);
    }
  });
});

searchRouter.delete('/allDelete', (req, res) => {
  const { userId } = req.query;
  const deleteQuery = `DELETE FROM recent_search_word WHERE userId = ?`;
  db.query(deleteQuery, [userId], (err, result) => {
    if (err) {
      res.status(500).send('커뮤니티 삭제 실패');
      throw err;
    } else {
      res.send(result);
    }
  });
});

export default searchRouter;
