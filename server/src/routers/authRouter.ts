import { Router, Request, Response } from 'express';

const router = Router();

router.post('/login', (req: Request, res: Response) => {
  // 로그인 로직
});

router.post('/register', (req: Request, res: Response) => {
  // 회원가입 로직
});

export default router;
