import { Button, Checkbox } from 'antd';

import {
  IExerciseResponse,
  removeExerciseFn,
} from '../../../../api/exerciseApi';
import { useQueryClient, useMutation } from '@tanstack/react-query';

import ExerciseInfo from '../ExerciseInfo';
import { useCallback, useMemo, useState } from 'react';
import EditExerciseModal from '../EditExerciseModal';
import { useRecoilState } from 'recoil';
import { selectedExercisesState } from '../../recoil/exercise.recoil';

export type ExerciseCustomProps = {
  exerciseData: IExerciseResponse;
};
export type ExerciseAttributes = React.HTMLAttributes<HTMLDivElement>;
export type ExerciseProps = ExerciseCustomProps & ExerciseAttributes;
const Exercise: React.FC<ExerciseProps> = ({ exerciseData, ...props }) => {
  const queryClient = useQueryClient();
  const { mutate: removeExercise } = useMutation(
    (id: string) => removeExerciseFn({ id }),
    {
      onSuccess() {
        queryClient.invalidateQueries(['exercises']);
        console.log('Success delete exercise');
      },
      onError(error) {
        console.log(error);
      },
    }
  );
  // 모달 state
  const [isShowing, setIsShowing] = useState<boolean>(false);
  const [selectedExercises, setSelectedExercises] = useRecoilState(
    selectedExercisesState
  );

  // 삭제 핸들러
  const handleDeleteBtn = useCallback(() => {
    if (
      window.confirm(
        `운동 목록에서 ${exerciseData.exerciseName} 운동을 삭제할까요?`
      )
    ) {
      removeExercise(exerciseData._id);
    }
  }, [exerciseData._id, exerciseData.exerciseName, removeExercise]);

  // 모달 핸들러
  const handleShowingModal = useCallback((value: boolean) => {
    setIsShowing(value);
  }, []);

  const isChecked = useMemo(() => {
    return selectedExercises.some((item) => item._id === exerciseData._id);
  }, [exerciseData._id, selectedExercises]);

  // 체크 핸들러
  const handleSelectedItem = useCallback(() => {
    // 리스트에 담겨 있지 않을 경우 추가
    if (!isChecked) {
      setSelectedExercises((state) => [...state, exerciseData]);
    } else {
      // 담겨 있을 경우 제거
      const findIndex = selectedExercises.findIndex(
        (item) => item._id === exerciseData._id
      );
      setSelectedExercises((state) => [
        ...state.slice(0, findIndex),
        ...state.slice(findIndex + 1),
      ]);
    }
  }, [exerciseData, isChecked, selectedExercises, setSelectedExercises]);

  return (
    <div {...props}>
      <div className="flex justify-between">
        <Checkbox
          className="px-4"
          checked={isChecked}
          onChange={handleSelectedItem}
        />
        <ExerciseInfo className="grow" info={exerciseData} />

        <div>
          <Button type="text" onClick={() => handleShowingModal(true)}>
            수정
          </Button>
          <Button type="text" danger onClick={handleDeleteBtn}>
            삭제
          </Button>
        </div>
      </div>

      {isShowing && (
        <EditExerciseModal
          open={isShowing}
          exerciseData={exerciseData}
          onClose={() => handleShowingModal(false)}
        />
      )}
    </div>
  );
};

export default Exercise;
