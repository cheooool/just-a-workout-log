import { Request, Response } from 'express';
import Exercise, { IExercise } from '../models/Exercise';

export const getExercises = async (req: Request, res: Response) => {
  try {
    const data = await Exercise.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      error,
      errorMessage: '오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
    });
  }
};

export const getExerciseById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const findExercise = await Exercise.findById(id);

    if (!findExercise) {
      res.status(404).json({
        errorMessage: '운동을 찾을 수 없습니다.',
      });
    }

    res.status(200).json(findExercise);
  } catch (error) {
    res.status(500).json({
      error,
      errorMessage: '오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
    });
  }
};

export const createExercise = async (
  req: Request<never, never, IExercise>,
  res: Response
) => {
  try {
    const {
      exerciseName,
      recordTypes,
      exerciseType = '',
      parts = '',
      isAssist = false,
      createdAt = new Date(),
    } = req.body;

    const newExercise = await new Exercise({
      exerciseName,
      recordTypes,
      exerciseType,
      parts,
      isAssist,
      createdAt,
    });

    await newExercise.save();

    res.status(201).json(newExercise);
  } catch (error) {
    res.status(500).json({
      error,
      errorMessage: '운동 생성 요청에 실패했습니다. 잠시 후 다시 시도해주세요.',
    });
  }
};

export const updateExercise = async (
  req: Request<never, never, Partial<IExercise>>,
  res: Response
) => {
  try {
    const { id } = req.params;

    const updatedExercise = await Exercise.findByIdAndUpdate(
      id,
      {
        ...req.body,
      },
      // 변경 후 모델 반환
      {
        new: true,
      }
    );

    if (!updatedExercise) {
      res.status(404).json({
        errorMessage: '운동을 찾을 수 없습니다.',
      });
    }

    res.status(200).json(updatedExercise);
  } catch (error) {
    res.status(500).json({
      error,
      errorMessage: '운동 수정 요청에 실패했습니다. 잠시 후 다시 시도해주세요.',
    });
  }
};

export const deleteExercise = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const findExercise = await Exercise.findByIdAndDelete(id);

    if (!findExercise) {
      res.status(404).json({
        errorMessage: '운동을 찾을 수 없습니다.',
      });
    }

    res.status(200).json({
      message: '운동이 삭제되었습니다.',
    });
  } catch (error) {
    res.status(500).json({
      error,
      errorMessage: '운동 삭제 요청에 실패했습니다. 잠시 후 다시 시도해주세요.',
    });
  }
};
