import express from 'express';
import { db } from '../db';
import jwt, { JwtPayload, VerifyErrors } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { CustomJwtPayload } from '../types/express/index';

dotenv.config();

if (!process.env.ACCESS_TOKEN_SECRET || !process.env.REFRESH_TOKEN_SECRET) {
  throw new Error('환경 변수가 설정되지 않았습니다.');
}

const authRouter = express.Router();
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

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
  const { userId, userPw, keepLogged } = req.body;

  db.query('SELECT * FROM users WHERE email=?', [userId], async (err, result) => {
    if (err) {
      res.status(500).send('로그인 실패');
      throw err;
    }
    if (result.length === 0) {
      return res.status(404).send('존재하지 않는 사용자입니다.');
    }
    console.log(result);
    const user = result[0];

    try {
      const validPassword = await bcrypt.compare(userPw, user.password);

      if (validPassword) {
        const accessToken = jwt.sign(
          { id: user.id, email: user.email, emoji: user.emoji, nickname: user.nickname },
          ACCESS_TOKEN_SECRET,
          {
            expiresIn: '1h',
          }
        );

        // Refresh Token 발급 (7일 유효)
        const refreshToken = jwt.sign(
          { id: user.id, email: user.email, emoji: user.emoji, nickname: user.nickname },
          REFRESH_TOKEN_SECRET,
          {
            expiresIn: '7d',
          }
        );

        res.cookie('refreshToken', refreshToken, {
          httpOnly: true,
          secure: true, // HTTPS에서만 작동
          sameSite: 'strict', // CSRF 보호
          maxAge: 7 * 24 * 60 * 60 * 1000, // 7일
        });

        res.status(200).send({
          accessToken,
          keepLogged,
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

authRouter.post('/refresh-token', (req, res) => {
  const { refreshToken } = req.cookies;
  if (!refreshToken) return res.status(401).send('Refresh Token이 없습니다.');

  jwt.verify(
    refreshToken,
    REFRESH_TOKEN_SECRET,
    (err: VerifyErrors | null, decoded: JwtPayload | string | undefined) => {
      if (err) return res.status(403).send('유효하지 않은 Refresh Token');

      const user = decoded as CustomJwtPayload; // 타입 단언으로 명시

      // 새로운 Access Token 발급
      const newAccessToken = jwt.sign(
        { id: user.userId, email: user.email, nickname: user.nickname, emoji: user.emoji },
        ACCESS_TOKEN_SECRET,
        {
          expiresIn: '1h',
        }
      );

      res.status(200).send({ accessToken: newAccessToken });
    }
  );
});

const authenticateToken = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // "Bearer <token>"

  if (!token) return res.status(401).send('토큰이 없습니다.');

  jwt.verify(
    token,
    ACCESS_TOKEN_SECRET,
    (err: VerifyErrors | null, decoded: JwtPayload | string | undefined) => {
      if (err) return res.status(403).send('유효하지 않은 토큰');
      console.log(decoded);
      req.user = decoded as CustomJwtPayload; // 유효한 토큰이면 user 정보를 요청 객체에 저장
      next(); // 인증 성공시 요청 처리 계속 진행
    }
  );
};

authRouter.get('/api/protected', authenticateToken, (req, res) => {
  console.log(req.user);
  // 인증된 사용자의 정보 반환
  res.status(200).send({
    message: '인증된 사용자입니다.',
    user: req.user, // JWT에서 가져온 사용자 정보
  });
});

export default authRouter;
