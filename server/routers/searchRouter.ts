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

// searchRouter.post('/hit', (req, res) => {
//   const communityNumber = req.body.communityNumber;
//   db.query(
//     'UPDATE community SET hit = hit + 1 WHERE communityNumber = ?',
//     [communityNumber],
//     (err, result) => {
//       if (err) {
//         res.status(500).send('커뮤니티 조회수 업데이트 실패');
//         throw err;
//       } else {
//         res.send(result);
//       }
//     }
//   );
// });

// searchRouter.post('/modify', (req, res) => {
//   const { communityNumber, title, content, date } = req.body.communityInfo;
//   const modifyQuery = `
//   UPDATE community
//   SET title = ?, content = ?, date = ?
//   WHERE communityNumber = ?
// `;
//   db.query(modifyQuery, [title, content, date, communityNumber], (err, result) => {
//     if (err) {
//       res.status(500).send('커뮤니티 수정 실패');
//       throw err;
//     } else {
//       res.send(result);
//     }
//   });
// });

export default searchRouter;
