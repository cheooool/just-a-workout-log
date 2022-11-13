import { Button, Checkbox } from 'antd';
import { useCallback, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { selectEditExerciseState } from '../../recoil/exercise.recoil';

import useExerciseServiceWithRecoil from '../../hooks/useExerciseServiceWithRecoil';

import AddItem from '../../../../components/AddItem';
import Exercise from '../Exercise';
import useExerciseModalWithRecoil from '../../hooks/useExerciseModalWithRecoil';
import { ExerciseDataType } from '../../services/ExerciseService';

export type ListModeType = 'edit' | null;

const ExerciseList = () => {
  const setSelectEditExercise = useSetRecoilState(selectEditExerciseState);
  const { deleteExerciseById, deleteManyExercise } =
    useExerciseServiceWithRecoil();
  const { showModal } = useExerciseModalWithRecoil();
  const { exerciseList } = useExerciseServiceWithRecoil();
  const [mode, setMode] = useState<ListModeType>(null);

  const [selectedList, setSelectedList] = useState<ExerciseDataType[]>([]);

  const handleSelectedItem = useCallback(
    (exercise: ExerciseDataType) => {
      // 리스트에 담겨 있지 않을 경우 추가
      if (!selectedList.some((item) => item._id === exercise._id)) {
        setSelectedList((state) => [...state, exercise]);
      } else {
        // 담겨 있을 경우 제거
        const findIndex = selectedList.findIndex(
          (item) => item._id === exercise._id
        );
        setSelectedList((state) => [
          ...state.slice(0, findIndex),
          ...state.slice(findIndex + 1),
        ]);
      }
    },
    [selectedList]
  );

  // 모드 변경
  const handleChangeMode = useCallback((mode: ListModeType) => {
    setMode(mode);
  }, []);

  // 수정 모드로 전환
  const handleChangeEditMode = useCallback(() => {
    handleChangeMode('edit');
  }, [handleChangeMode]);

  // 기본 모드로 전환
  const handleChangeDefaultMode = useCallback(() => {
    handleChangeMode(null);
  }, [handleChangeMode]);

  if (exerciseList.state === 'hasError') {
    return <div>Error</div>;
  }
  if (exerciseList.state === 'loading') {
    return <div>운동 목록 불러오는 중...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center border-0 border-y border-gray-300 border-solid">
        {mode === 'edit' ? (
          <>
            <div>
              <Button type="link">전체 선택</Button>
            </div>
            <Button type="link" onClick={handleChangeDefaultMode}>
              완료
            </Button>
          </>
        ) : (
          <>
            <span></span>
            <Button type="link" onClick={handleChangeEditMode}>
              편집
            </Button>
          </>
        )}
      </div>
      <AddItem
        text="새로운 운동 추가..."
        className="py-2"
        onClick={() => showModal('add')}
      />

      {selectedList.length > 0 && (
        <Button
          type="text"
          danger
          onClick={() => deleteManyExercise({ exerciseList: selectedList })}
        >
          선택 삭제
        </Button>
      )}
      {!exerciseList.contents.length ? (
        <p>추가한 운동이 없습니다.</p>
      ) : (
        <ul className="list-none m-0 p-0">
          {exerciseList.contents.map((exercise, index) => {
            const { exerciseName, exerciseType, parts, recordTypes, isAssist } =
              exercise;
            return (
              <li
                key={index}
                className="flex justify-between items-stretch my-1 py-3 border-0 border-t border-gray-200 border-solid"
              >
                <Checkbox
                  className="px-4"
                  checked={selectedList.some(
                    (item) => item._id === exercise._id
                  )}
                  onChange={() => handleSelectedItem(exercise)}
                />
                <Exercise
                  className="grow"
                  exerciseName={exerciseName}
                  exerciseType={exerciseType}
                  parts={parts}
                  recordTypes={recordTypes}
                  isAssist={isAssist}
                />
                <Button
                  type="text"
                  onClick={() => {
                    setSelectEditExercise(exercise);
                    showModal('edit');
                  }}
                >
                  수정
                </Button>
                <Button
                  type="text"
                  danger
                  onClick={() => {
                    if (
                      window.confirm(`${exerciseName} 항목을 삭제하시겠습니까?`)
                    ) {
                      deleteExerciseById({
                        id: exercise._id as string,
                      });
                    }
                  }}
                >
                  삭제
                </Button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default ExerciseList;
