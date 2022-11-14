import { Button, Checkbox } from 'antd';
import { useState } from 'react';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  getAllExercisesFn,
  removeExercisesFn,
} from '../../../../api/exerciseApi';

import { useRecoilState } from 'recoil';
import { selectedExercisesState } from '../../recoil/exercise.recoil';

import AddItem from '../../../../components/AddItem';
import ExerciseItem from '../ExerciseItem';
import AddExerciseModal from '../AddExerciseModal';

export type ListModeType = 'edit' | null;

const ExerciseList = () => {
  const { isLoading, data: exercises } = useQuery(
    ['exercises'],
    () => getAllExercisesFn(),
    {
      select: (data) => data.data,
      onSuccess: () => {
        console.log('Success exercises query');
      },
      onError: () => {
        console.log('Error exercises query');
      },
    }
  );

  const queryClient = useQueryClient();
  const { mutate: removeExercises } = useMutation(
    ({ exercisesIds }: { exercisesIds: string[] }) =>
      removeExercisesFn({ exercisesIds }),
    {
      onMutate: () => {
        console.log('Mutate remove exercises');
      },
      onSuccess: () => {
        queryClient.invalidateQueries(['exercises']);
        console.log('Success remove exercises');
        setSelectedExercises([]);
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );

  const [isShowing, setIsShowing] = useState<boolean>(false);

  const handleShowingModal = (value: boolean) => {
    setIsShowing(value);
  };

  const [selectedExercises, setSelectedExercises] = useRecoilState(
    selectedExercisesState
  );
  // 전체 선택 여부
  const isAllSelected =
    exercises &&
    !!exercises.length &&
    selectedExercises.length === exercises.length;

  // 한개이상 선택한 경우 indeterminate
  const isIndeterminate =
    exercises &&
    !!exercises.length &&
    !!selectedExercises.length &&
    !isAllSelected;

  // 전체 선택 or 전체 선택 해제
  const handleAllSelected = () => {
    // 운동 데이터가 있을 때
    if (exercises) {
      if (!isAllSelected) {
        setSelectedExercises(exercises);
      } else {
        setSelectedExercises([]);
      }
    }
  };

  const handleRemoveSelectedExercises = () => {
    if (
      window.confirm(
        `운동 목록에서 ${selectedExercises.length}개의 운동을 삭제할까요?`
      )
    ) {
      const exercisesIds = selectedExercises.map((exercise) => exercise._id);

      removeExercises({
        exercisesIds,
      });
    }
  };

  if (isLoading) {
    return <div>운동 목록 불러오는 중...</div>;
  }

  return (
    <div>
      {/* 리스트 헤더 (임시) */}
      <div className="flex justify-between items-center h-10">
        <div>
          <Checkbox
            className="pl-4"
            indeterminate={isIndeterminate}
            checked={isAllSelected}
            onChange={handleAllSelected}
          >
            전체 선택
          </Checkbox>
          {!!selectedExercises.length && (
            <span className="font-bold">
              {selectedExercises.length}개 선택됨
            </span>
          )}
        </div>

        {!!selectedExercises.length && (
          <Button type="text" danger onClick={handleRemoveSelectedExercises}>
            선택 삭제
          </Button>
        )}
      </div>

      {/* 리스트 */}
      {!exercises?.length ? (
        <p>추가한 운동이 없습니다.</p>
      ) : (
        <ul className="list-none m-0 p-0">
          {exercises.map((exercise, index) => {
            return (
              <li
                key={index}
                className="my-1 py-3 border-0 border-t border-gray-200 border-solid"
              >
                <ExerciseItem exerciseData={exercise} />
              </li>
            );
          })}
        </ul>
      )}

      {isShowing && (
        <AddExerciseModal
          open={isShowing}
          onClose={() => handleShowingModal(false)}
        />
      )}
    </div>
  );
};

export default ExerciseList;
