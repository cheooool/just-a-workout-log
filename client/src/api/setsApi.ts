import http from '../lib/http-common';
import { IExerciseResponse } from './exerciseApi';

export type SetsItemDataType = {
  weight: string | number;
  reps: string | number;
};

export interface ISetsRequest {
  exerciseId: string | string[];
  workoutDate: string;
}

export interface ISetsResponse {
  _id: string;
  userId: string;
  exercise: Pick<
    IExerciseResponse,
    'exerciseName' | 'parts' | 'exerciseType' | 'isAssist' | 'recordTypes'
  >;
  workoutDate: string;
  list: SetsItemDataType[];
}

// 전체 운동 세트 목록 불러오기
export const getSetsFn = async (): Promise<{ data: ISetsResponse[] }> => {
  return await http.get(`/sets`);
};

// 날짜에 해당하는 운동 세트 목록 불러오기
export const getSetsByDateFn = async ({
  workoutDate,
}: {
  workoutDate: string;
}): Promise<{ data: ISetsResponse[] }> => {
  return await http.get(`/sets?date=${workoutDate}`);
};

// 운동 세트 목록 생성하기
export const createSetsFn = async ({
  workoutDate,
  exerciseId,
}: ISetsRequest) => {
  return await http.post(`/sets`, {
    workoutDate,
    exerciseId,
  });
};

// 운동 세트 수정 (set1, set2...)
export const updateSetsByIdFn = async ({
  id,
  list,
}: {
  id: string;
  list: SetsItemDataType[];
}) => {
  return await http.post(`/sets/${id}`, {
    list,
  });
};

// 운동 세트 목록 삭제
export const deleteSetsByIdFn = async ({ id }: { id: string }) => {
  return await http.delete(`/sets/${id}`);
};
