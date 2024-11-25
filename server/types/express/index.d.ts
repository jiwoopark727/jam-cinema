import { JwtPayload } from 'jsonwebtoken';

interface CustomJwtPayload extends JwtPayload {
  email: string;
  emoji: string;
  nickname: string;
  userId: number;
}

declare global {
  namespace Express {
    interface Request {
      user?: CustomJwtPayload; // JWT payload 타입을 그대로 사용하거나 CustomJwtPayload로 변경 가능
    }
  }
}
