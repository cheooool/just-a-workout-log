import { SECRET } from '../config';
import { Request, Response } from 'express';
import UserModel, { IUser } from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

/**
 * 회원 가입
 */
export const signUp = async (
  req: Request<never, never, IUser>,
  res: Response
) => {
  try {
    req.body.password = await bcrypt.hash(req.body.password, 10);

    // 유저 생성
    const user = await new UserModel(req.body);
    await user.save();

    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};

// 로그인 jwt 토큰 반환
export const signIn = async (
  req: Request<never, never, IUser>,
  res: Response
) => {
  try {
    const { username, password } = req.body;
    const user = await UserModel.findOne({
      username,
    });
    if (user) {
      const result = await bcrypt.compare(password, user.password);
      if (result) {
        const token = await jwt.sign(
          {
            userId: user._id,
          },
          SECRET
        );
        res.json({ token });
      } else {
        res.status(400).json({
          error: '이름 또는 비밀번호를 잘못 입력했습니다.',
        });
      }
    } else {
      res.status(400).json({
        errorMessage: '이름 또는 비밀번호를 잘못 입력했습니다.',
      });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
};
