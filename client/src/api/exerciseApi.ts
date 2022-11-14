import http from '../lib/http-common';

export const EXERCISE_TYPE_DATA = {
  '0': '웨이트',
  '1': '맨몸',
};
export interface IExerciseRequest {
  // 운동 타입 (0: 웨이트, 1: 맨몸)
  exerciseType: string;
  // 운동 부위 (가슴, 어깨, 팔, 등, 다리, 복근)
  parts: string;
  // 운동명
  exerciseName: string;
  // 기록 타입 무게+개수 / 무게 / 개수
  recordTypes: ('weight' | 'reps')[];
  // 어시스트 머신 사용 어부
  isAssist: boolean;
}

export interface IExerciseResponse {
  // Object id
  _id: string;
  // user Object id
  userId: string;
  // 운동 타입 (웨이트, 맨몸)
  exerciseType: string;
  // 운동 부위 (0: 웨이트, 1: 맨몸)
  parts: string;
  // 운동명
  exerciseName: string;
  // 기록 타입 무게+개수 / 무게 / 개수
  recordTypes: ('weight' | 'reps')[];
  // 어시스트 머신 사용 어부
  isAssist: boolean;
  // 생성 시간
  createdAt: Date;
}

export const getAllExercisesFn = (): Promise<{ data: IExerciseResponse[] }> => {
  return http.get('/exercises');
};

export const createExerciseFn = ({ data }: { data: IExerciseRequest }) => {
  return http.post('/exercises', data);
};

export const getExerciseFn = ({ id }: { id: string }) => {
  return http.get(`/exercises/${id}`);
};

export const updateExerciseFn = ({
  id,
  data,
}: {
  id: string;
  data: IExerciseRequest;
}) => {
  return http.put(`/exercises/${id}`, data);
};

export const removeExerciseFn = ({ id }: { id: string }) => {
  return http.delete(`/exercises/${id}`);
};

export const removeExercisesFn = ({
  exercisesIds,
}: {
  exercisesIds: string[];
}) => {
  return http.delete(`/exercises`, {
    data: {
      exercisesIds,
    },
  });
};
