import http from '../lib/http-common';
import { IExerciseResponse } from './exerciseApi';

export interface ISetsResponse {
  _id: string;
  userId: string;
  exerciseId: string;
  workoutDate: string;
  list: string[];
}

export interface IWorkoutResponse {
  userId: string;
  workoutDate: string;
  list: {
    exercise: IExerciseResponse;
    sets: ISetsResponse;
  }[];
}

// 날짜에 해당하는 Workout 데이터 불러오기
export const getWorkoutByDateFn = async ({
  workoutDate,
}: {
  workoutDate: string;
}): Promise<{ data: IWorkoutResponse }> => {
  return await http.get(`/workouts/${workoutDate}`);
};

// 날짜에 해당하는 Workout 데이터에 실행할 운동 추가
export const addExerciseToWorkoutFn = async ({
  workoutDate,
  exercisesIds,
}: {
  workoutDate: string;
  exercisesIds: string[];
}) => {
  return await http.post(`/workouts/${workoutDate}/exerciseList`, {
    exercisesIds,
  });
};
