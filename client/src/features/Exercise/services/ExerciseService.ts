import http from '../../../lib/http-common';

export const EXERCISE_DEFAULT_DATA: ExerciseDataType = {
  exerciseName: '',
  exerciseType: null,
  parts: null,
  recordTypes: ['weight', 'reps'],
  isAssist: false,
};

export const EXERCISE_TYPE_DATA = {
  '0': '웨이트',
  '1': '맨몸운동',
};

export type ExerciseDataType = {
  _id?: string;
  exerciseName: string;
  exerciseType: '0' | '1' | null; // 웨이트, 맨몸운동
  parts: string | null;
  recordTypes: ('weight' | 'reps')[];
  isAssist: boolean;
};

export const getAll = () => {
  return http.get('/exercises');
};

export const create = (data: ExerciseDataType) => {
  return http.post('/exercises', data);
};

export const getById = ({ id }: { id: string }) => {
  return http.get(`/exercises/${id}`);
};

export const updateById = ({
  id,
  data,
}: {
  id: string;
  data: ExerciseDataType;
}) => {
  return http.put(`/exercises/${id}`, data);
};

export const removeById = ({ id }: { id: string }) => {
  return http.delete(`/exercises/${id}`);
};

const ExerciseService = {
  getAll,
  getById,
  create,
  updateById,
  removeById,
};

export default ExerciseService;
