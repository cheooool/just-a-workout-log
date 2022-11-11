import http from '../../../lib/http-common';

export type ExerciseDataType = {
  exerciseName: string;
  exerciseType: '0' | '1' | null; // 웨이트, 맨몸운동
  parts: string;
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
