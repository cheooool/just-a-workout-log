import { SECRET } from '../config';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export interface CustomRequest extends Request {
  user: {
    userId: string;
  };
}
export const isLoggedIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // 인증 헤더 확인
    const token = req.headers?.authorization?.split(' ')[1] || '';

    if (!token) {
      return res.status(401).json({
        errorMessage: '승인 거부됨. 토큰이 없습니다.',
      });
    }

    const payload = (await jwt.verify(token, SECRET)) as {
      userId: string;
    };
    if (!payload) {
      return res.status(401).json({
        errorMessage: '토큰이 유효하지 않습니다.',
      });
    }

    (req as CustomRequest).user = payload;

    next();
  } catch (error) {
    return res.status(500).json({ error, errorMessage: '서버 에러' });
  }
};
