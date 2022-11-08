import { Request, Response } from 'express';
import { CustomRequest } from '../middlewares/isLoggedIn';
import Routine, { IRoutine } from '../models/Routine';

/**
 * 루틴 목록 불러오기
 * @param req
 * @param res
 */
export const getRoutines = async (req: Request, res: Response) => {
  try {
    const { userId } = (req as CustomRequest).user;
    const findRoutines = await Routine.find({ userId });

    if (!findRoutines) {
      return res.status(404).json({
        errorMessages: '등록된 루틴이 없습니다.',
      });
    }
    return res.status(200).json(findRoutines);
  } catch (error) {
    return res.status(500).json({
      error,
      errorMessage: '오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
    });
  }
};

/**
 * 루틴 생성
 * @param req
 * @param res
 */
export const createRoutine = async (req: Request, res: Response) => {
  try {
    // 루틴 정보
    const { routineName }: IRoutine = req.body;
    // jwt decode data
    const { userId } = (req as CustomRequest).user;

    // 루틴 생성
    const newRoutine = await new Routine({
      userId,
      routineName,
    });

    // 저장
    await newRoutine.save();

    // 반환
    return res.status(200).json(newRoutine);
  } catch (error) {
    return res.status(500).json({
      error,
      errorMessage: '루틴 생성 요청에 실패했습니다. 잠시 후 다시 시도해주세요.',
    });
  }
};

/**
 * 루틴 :id 가져오기
 * @param req
 * @param res
 */
export const getRoutineById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // jwt decode data
    const { userId } = (req as CustomRequest).user;

    const findRoutine = await Routine.findOne({
      userId,
      _id: id,
    });

    if (!findRoutine) {
      return res.status(404).json({
        errorMessage: '루틴을 찾을 수 없습니다.',
      });
    }

    return res.status(200).json(findRoutine);
  } catch (error) {
    return res.status(500).json({
      error,
      errorMessage: '오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
    });
  }
};

/**
 * 루틴 :id 수정하기
 * @param req
 * @param res
 */
export const updateRoutineById = async (req: Request, res: Response) => {
  try {
    const { routineName }: IRoutine = req.body;
    const { id } = req.params;

    // jwt decode data
    const { userId } = (req as CustomRequest).user;

    const updateRoutine = await Routine.findOneAndUpdate(
      {
        userId,
        _id: id,
      },
      {
        routineName,
      },
      {
        new: true,
      }
    );

    if (!updateRoutine) {
      return res.status(404).json({
        errorMessage: '루틴을 찾을 수 없습니다.',
      });
    }

    return res.status(200).json(updateRoutine);
  } catch (error) {
    return res.status(500).json({
      error,
      errorMessage: '오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
    });
  }
};

/**
 * 루틴 :id 삭제하기
 * @param req
 * @param res
 */
export const deleteRoutineById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // jwt decode data
    const { userId } = (req as CustomRequest).user;

    const deleteRoutine = await Routine.findOneAndDelete({
      userId,
      _id: id,
    });

    return res.status(200).json(deleteRoutine);
  } catch (error) {
    return res.status(500).json({
      error,
      errorMessage: '루틴 삭제에 실패했습니다. 잠시 후 다시 시도해주세요.',
    });
  }
};
