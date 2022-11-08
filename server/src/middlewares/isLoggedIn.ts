import path from 'path';
import dotenv from 'dotenv';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

dotenv.config({ path: path.resolve(`.env.${process.env.NODE_ENV}`) });

const { SECRET = 'SECRET' } = process.env;

export const isLoggedIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // 인증 헤더 확인
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(' ')[1];

      if (!token) {
        res.status(400).json({
          errorMessage: '잘못된 인증 헤더입니다.',
        });
      }

      const payload = await jwt.verify(token, SECRET);
      if (!payload) {
        res.status(400).json({
          errorMessage: '토큰 인증에 실패했습니다.',
        });
      }

      res.locals.jwtPayload = payload;
      next();
    } else {
      res.status(400).json({
        errorMessage: '인증 헤더가 없습니다.',
      });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
};
