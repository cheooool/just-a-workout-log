import { Request, Response } from 'express';
import { CustomRequest } from '../middlewares/isLoggedIn';
import Exercise, { IExercise } from '../models/Exercise';

export const getExercises = async (req: Request, res: Response) => {
  try {
    const { user } = req as CustomRequest;
    const { userId } = user;
    const data = await Exercise.find({
      userId,
    });
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      error,
      errorMessage: '오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
    });
  }
};

export const getExerciseById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { user } = req as CustomRequest;
    const { userId } = user;

    const findExercise = await Exercise.find({
      userId,
      _id: id,
    });

    if (!findExercise) {
      return res.status(404).json({
        errorMessage: '운동을 찾을 수 없습니다.',
      });
    }

    return res.status(200).json(findExercise);
  } catch (error) {
    return res.status(500).json({
      error,
      errorMessage: '오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
    });
  }
};

export const createExercise = async (req: Request, res: Response) => {
  try {
    const { user } = req as CustomRequest;
    const { userId } = user;

    const {
      exerciseName,
      recordTypes,
      exerciseType = '',
      parts = '',
      isAssist = false,
      createdAt = new Date(),
    }: IExercise = req.body;

    const newExercise = await new Exercise({
      userId,
      exerciseName,
      recordTypes,
      exerciseType,
      parts,
      isAssist,
      createdAt,
    });

    await newExercise.save();

    return res.status(201).json(newExercise);
  } catch (error) {
    return res.status(500).json({
      error,
      errorMessage: '운동 생성 요청에 실패했습니다. 잠시 후 다시 시도해주세요.',
    });
  }
};

export const updateExercise = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { user } = req as CustomRequest;
    const { userId } = user;

    const updatedExercise = await Exercise.findOneAndUpdate(
      {
        userId,
        _id: id,
      },
      {
        ...req.body,
      },
      // 변경 후 모델 반환
      {
        new: true,
      }
    );

    if (!updatedExercise) {
      return res.status(404).json({
        errorMessage: '운동을 찾을 수 없습니다.',
      });
    }

    return res.status(200).json(updatedExercise);
  } catch (error) {
    return res.status(500).json({
      error,
      errorMessage: '운동 수정 요청에 실패했습니다. 잠시 후 다시 시도해주세요.',
    });
  }
};

export const deleteExercise = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const { user } = req as CustomRequest;
    const { userId } = user;

    const findExercise = await Exercise.findOneAndDelete({
      userId,
      _id: id,
    });

    if (!findExercise) {
      return res.status(404).json({
        errorMessage: '운동을 찾을 수 없습니다.',
      });
    }

    return res.status(200).json({
      message: '운동이 삭제되었습니다.',
    });
  } catch (error) {
    return res.status(500).json({
      error,
      errorMessage: '운동 삭제 요청에 실패했습니다. 잠시 후 다시 시도해주세요.',
    });
  }
};
