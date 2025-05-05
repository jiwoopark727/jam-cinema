import express from 'express';
import { db } from '../db';

const communityRouter = express.Router();

communityRouter.get('/list', (_, res) => {
  db.query('SELECT * FROM community', [], (err, result) => {
    if (err) {
      res.status(500).send('커뮤니티 리스트 불러오기 실패');
      throw err;
    } else {
      res.send(result.sort((a: any, b: any) => b.communityNumber - a.communityNumber));
    }
  });
});

communityRouter.post('/write', (req, res) => {
  const { title, content, nickname, date } = req.body.communityInfo;
  db.query(
    'INSERT INTO community (title, content, nickname, date) VALUES (?, ?, ?, ?)',
    [title, content, nickname, date],
    (err, result) => {
      if (err) {
        res.status(500).send('커뮤니티 작성 실패');
        throw err;
      } else {
        res.send(result);
      }
    }
  );
});

communityRouter.post('/hit', (req, res) => {
  const communityNumber = req.body.communityNumber;
  db.query(
    'UPDATE community SET hit = hit + 1 WHERE communityNumber = ?',
    [communityNumber],
    (err, result) => {
      if (err) {
        res.status(500).send('커뮤니티 조회수 업데이트 실패');
        throw err;
      } else {
        res.send(result);
      }
    }
  );
});

communityRouter.post('/modify', (req, res) => {
  const { communityNumber, title, content, date } = req.body.communityInfo;
  const modifyQuery = `
  UPDATE community
  SET title = ?, content = ?, date = ?
  WHERE communityNumber = ?
`;
  db.query(modifyQuery, [title, content, date, communityNumber], (err, result) => {
    if (err) {
      res.status(500).send('커뮤니티 수정 실패');
      throw err;
    } else {
      res.send(result);
    }
  });
});

communityRouter.delete('/delete', (req, res) => {
  const communityNumber = req.body.communityNumber;
  const deleteQuery = `DELETE FROM community WHERE communityNumber = ?`;
  db.query(deleteQuery, [communityNumber], (err, result) => {
    if (err) {
      res.status(500).send('커뮤니티 삭제 실패');
      throw err;
    } else {
      res.send(result);
    }
  });
});

communityRouter.get('/list/popular', (_, res) => {
  db.query('SELECT * FROM community ORDER BY hit DESC LIMIT 5', [], (err, result) => {
    if (err) {
      res.status(500).send('커뮤니티 리스트 불러오기 실패');
      throw err;
    } else {
      res.send(result);
    }
  });
});

communityRouter.get('/list/recent', (_, res) => {
  db.query('SELECT * FROM community ORDER BY date DESC LIMIT 5', [], (err, result) => {
    if (err) {
      res.status(500).send('커뮤니티 리스트 불러오기 실패');
      throw err;
    } else {
      res.send(result);
    }
  });
});

communityRouter.get('/list/my', (req, res) => {
  const nickname = req.query.nickname;
  if (nickname) {
    db.query('SELECT * FROM community WHERE nickname = ?', [nickname], (err, result) => {
      if (err) {
        res.status(500).send('내가 쓴 글을 불러오지 못했습니다.');
        throw err;
      } else {
        res.send(result);
      }
    });
  }
});

export default communityRouter;
