import { atom, selector } from 'recoil';
import ExerciseService, { ExerciseDataType } from '../services/ExerciseService';

export const allListLoader = selector<ExerciseDataType[]>({
  key: 'allListLoader',
  get: async () => {
    try {
      const response = await ExerciseService.getAll();
      return response.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  },
});

export const exerciseListState = atom<ExerciseDataType[]>({
  key: 'exerciseListState',
  default: allListLoader,
});

export const exerciseModalState = atom<'add' | 'edit' | null>({
  key: 'exerciseModalState',
  default: null,
});

export const selectExerciseState = atom<ExerciseDataType | null>({
  key: 'selectExerciseState',
  default: null,
});
