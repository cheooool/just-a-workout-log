import { Request, Response } from 'express';
import { CustomRequest } from '../middlewares/isLoggedIn';
import Sets from '../models/Sets';

// GET 사용자의 전체 운동 세트 불러오기
export const getSets = async (req: Request, res: Response) => {
  try {
    const {
      user,
      query: { date },
    } = req as CustomRequest;
    const { userId } = user;

    const filters: {
      userId: string;
      workoutDate?: string;
    } = {
      userId,
    };

    if (date) {
      filters['workoutDate'] = date as string;
    }

    // userId가 일치하는 세트 목록 가져오기
    const findSets = await Sets.find(filters).populate({
      path: 'exercise',
      select: 'exerciseName exerciseType parts isAssist',
    });

    return res.status(200).json(findSets);
  } catch (error) {
    return res.status(200).json({
      error,
      errorMessage:
        '운동 세트 목록을 불러오는데 실패했습니다. 잠시 후 다시 시도해주세요.',
    });
  }
};

// POST 새로운 운동 세트 생성
// exerciseId string인 경우 한개 배열일 경우 다중 생성
export const createSets = async (req: Request, res: Response) => {
  try {
    const { user } = req as CustomRequest;
    const { userId } = user;
    const { workoutDate, exerciseId } = req.body;

    let newSets;
    if (Array.isArray(exerciseId)) {
      // Sets 배열 생성
      const newSetsList = exerciseId.map((eid) => ({
        userId,
        exercise: eid,
        workoutDate,
      }));

      // Sets 도큐먼트 생성
      newSets = await Sets.create(newSetsList);
    } else {
      // 신규 세트 생성
      newSets = await new Sets({
        userId,
        exercise: exerciseId,
        workoutDate,
      });
      // 세트 저장

      await newSets.save();
    }

    return res.status(200).json(newSets);
  } catch (error) {
    return res.status(500).json({
      error,
      errorMessage: '운동 세트 생성에 실패했습니다. 잠시 후 다시 시도해주세요.',
    });
  }
};

// GET :id 세트 가져오기
export const getSetsById = async (req: Request, res: Response) => {
  try {
    const { user } = req as CustomRequest;
    const { userId } = user;
    const { id } = req.params;

    const findSetsById = await Sets.findOne({
      userId,
      _id: id,
    }).populate({
      path: 'exercise',
      select: '-userId-_id-__v',
    });

    return res.status(200).json(findSetsById);
  } catch (error) {
    return res.status(500).json({
      errorMessage:
        '운동 세트를 가져오지 못했습니다. 잠시 후 다시 시도해주세요.',
    });
  }
};

// 세트 업데이트
export const updateSetsById = async (req: Request, res: Response) => {
  try {
    const { user } = req as CustomRequest;
    const { userId } = user;
    const { id } = req.params;
    const { list } = req.body;

    const updateSets = await Sets.findOneAndUpdate(
      {
        userId,
        _id: id,
      },
      {
        $set: {
          list,
        },
      },
      { new: true }
    );

    return res.status(200).json(updateSets);
  } catch (error) {
    return res
      .status(500)
      .json('세트 수정에 실패했습니다. 잠시 후 다시 시도해주세요.');
  }
};

// DELETE :id 세트 삭제하기
export const deleteSetsById = async (req: Request, res: Response) => {
  try {
    const { user } = req as CustomRequest;
    const { userId } = user;
    const { id } = req.params;

    // 세트 제거
    await Sets.deleteOne({
      userId,
      _id: id,
    });

    return res.status(204).json();
  } catch (error) {
    return res.status(200).json([]);
  }
};
