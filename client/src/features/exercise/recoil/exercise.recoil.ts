import { atom } from 'recoil';
import { IExerciseResponse } from '../../../api/exerciseApi';

export const selectedExercisesState = atom<IExerciseResponse[]>({
  key: 'selectedExercisesState',
  default: [],
});
