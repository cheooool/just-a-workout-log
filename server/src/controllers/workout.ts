import { Request, Response } from 'express';
import { CustomRequest } from '../middlewares/isLoggedIn';
import Sets from '../models/Sets';
import Workout from '../models/Workout';

// GET 운동 목록
export const getWorkout = async (req: Request, res: Response) => {
  try {
    const { user } = req as CustomRequest;
    const { userId } = user;

    const findWorkout = await Workout.find({
      userId,
    });
    if (!findWorkout) {
      return res.status(404).json([]);
    }

    return res.status(200).json(findWorkout);
  } catch (error) {
    return res.status(500).json({
      error,
      errorMessage: '오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
    });
  }
};

// GET :workoutDate 운동 기록 불러오기
export const getWorkoutByDate = async (req: Request, res: Response) => {
  try {
    const { workoutDate } = req.params;
    const { user } = req as CustomRequest;
    const { userId } = user;

    const findWorkoutByDate = await Workout.findOne({
      workoutDate,
      userId,
    });

    if (!findWorkoutByDate) {
      const newWorkoutByDate = await new Workout({
        userId,
        workoutDate,
      });
      await newWorkoutByDate.save();
      return res.status(200).json(newWorkoutByDate);
    }

    return res.status(200).json(findWorkoutByDate);
  } catch (error) {
    return res.status(500).json({
      error,
      errorMessage: '오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
    });
  }
};

// GET :workoutDate 운동 세트 불러오기
export const getWorkoutSetsByWorkoutDate = async (
  req: Request,
  res: Response
) => {
  try {
    const { workoutDate } = req.params;
    const { user } = req as CustomRequest;
    const { userId } = user;

    const findSets = await Sets.find({
      workoutDate,
      userId,
    });

    return res.status(200).json(findSets);
  } catch (error) {
    return res.status(500).json({
      error,
      errorMessage: '오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
    });
  }
};
