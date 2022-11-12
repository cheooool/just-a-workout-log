import { useRecoilStateLoadable } from 'recoil';
import { exerciseListState } from '../recoil/exercise.recoil';
import ExerciseService, { ExerciseDataType } from '../services/ExerciseService';

function useExerciseServiceWithRecoil() {
  const [exerciseList, setExerciseList] =
    useRecoilStateLoadable(exerciseListState);

  // 운동 추가
  const createExercise = async ({
    exerciseData,
  }: {
    exerciseData: ExerciseDataType;
  }) => {
    try {
      const response = await ExerciseService.create(exerciseData);

      setExerciseList((oldExerciseList) => [response.data, ...oldExerciseList]);
    } catch (error) {
      console.log(error);
    }
  };

  // 운동 데이터 변경
  const editExercise = async ({
    id,
    updateData,
  }: {
    id: string;
    updateData: ExerciseDataType;
  }) => {
    try {
      // update
      await ExerciseService.updateById({
        id,
        data: updateData,
      });

      // state data 변경
      setExerciseList((oldExerciseList) => {
        const findIndex = oldExerciseList.findIndex(
          (exercise) => exercise._id === id
        );

        return [
          ...oldExerciseList.slice(0, findIndex),
          updateData,
          ...oldExerciseList.slice(findIndex + 1),
        ];
      });
    } catch (error) {
      console.log(error);
    }
  };

  // 운동 삭제
  const deleteExerciseById = async ({ id }: { id: string }) => {
    try {
      await ExerciseService.removeById({
        id,
      });

      setExerciseList((oldExerciseList) => {
        const findIndex = oldExerciseList.findIndex(
          (exercise) => exercise._id === id
        );

        return [
          ...oldExerciseList.slice(0, findIndex),
          ...oldExerciseList.slice(findIndex + 1),
        ];
      });
    } catch (error) {
      console.log(error);
    }
  };

  return {
    exerciseList,
    createExercise,
    editExercise,
    deleteExerciseById,
  };
}
export default useExerciseServiceWithRecoil;
