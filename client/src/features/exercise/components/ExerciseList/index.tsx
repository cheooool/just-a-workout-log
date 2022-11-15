import { Button, Checkbox } from 'antd';
import { useState } from 'react';

import { useRecoilState, useRecoilValue } from 'recoil';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  getAllExercisesFn,
  removeExercisesFn,
} from '../../../../api/exerciseApi';
import { selectedExercisesState } from '../../recoil/exercise.recoil';

import { selectFormattedDate } from '../../../workouts/recoil/workouts.recoil';

import classnames from 'classnames';

import ExerciseItem from '../ExerciseItem';
import AddExerciseModal from '../AddExerciseModal';

import { createSetsFn, ISetsRequest } from '../../../../api/setsApi';

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
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );

  // YYYYMMDD 날짜 포맷
  const formattedDate = useRecoilValue(selectFormattedDate);
  // 오늘 할 운동 추가 mutation
  const { mutate: createSets } = useMutation(
    ({ exerciseId }: { exerciseId: ISetsRequest['exerciseId'] }) =>
      createSetsFn({ workoutDate: formattedDate, exerciseId }),
    {
      onSuccess: () => {
        setSelectedExercises([]);
        console.log('오늘 할 운동이 추가되었습니다.');
        // 운동 추가 후 sets query refetch
        queryClient.refetchQueries(['sets', formattedDate]);
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

  const handleCreateSets = () => {
    createSets({
      exerciseId: selectedExercises.map((exercise) => exercise._id),
    });
  };

  if (isLoading) {
    return <div>운동 목록 불러오는 중...</div>;
  }

  return (
    <div>
      {/* 리스트 헤더 (임시) */}
      <div
        className={classnames('px-4 pb-2 bg-white', {
          'sticky top-0 left-0 w-full z-10': !!selectedExercises.length,
        })}
      >
        {!!selectedExercises.length && (
          <div className="flex justify-between items-center py-4">
            <div>
              <span className="text-2xl font-bold">
                {selectedExercises.length}개 선택됨
              </span>
            </div>
            <Button type="primary" onClick={handleCreateSets}>
              운동 추가
            </Button>
          </div>
        )}
        <div>
          <Checkbox
            indeterminate={isIndeterminate}
            checked={isAllSelected}
            onChange={handleAllSelected}
          >
            전체 선택
          </Checkbox>
          {!!selectedExercises.length && (
            <Button
              type="text"
              danger
              onClick={() => handleRemoveSelectedExercises()}
            >
              선택 삭제
            </Button>
          )}
        </div>
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
