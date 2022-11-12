import { Button } from 'antd';
import { useCallback, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { selectExerciseState } from '../../recoil/exercise.recoil';

import useExerciseServiceWithRecoil from '../../hooks/useExerciseServiceWithRecoil';

import AddItem from '../../../../components/AddItem';
import Exercise from '../Exercise';
import useExerciseModalWithRecoil from '../../hooks/useExerciseModalWithRecoil';

export type ListModeType = 'edit' | null;

const ExerciseList = () => {
  const setSelectExercise = useSetRecoilState(selectExerciseState);
  const { deleteExerciseById } = useExerciseServiceWithRecoil();
  const { showModal } = useExerciseModalWithRecoil();
  const { exerciseList } = useExerciseServiceWithRecoil();
  const [mode, setMode] = useState<ListModeType>(null);

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

  if (!exerciseList.contents.length) {
    return <span>운동 목록이 없습니다.</span>;
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
      <AddItem text="새로운 운동 추가..." onClick={() => showModal('add')} />
      <ul className="list-none m-0 p-0">
        {exerciseList.contents.map((exercise, index) => {
          const { exerciseName, exerciseType, parts, recordTypes, isAssist } =
            exercise;
          return (
            <li
              key={index}
              className="flex justify-between items-center py-4 border-0 border-t border-gray-200 border-solid"
            >
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
                  setSelectExercise(exercise);
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
    </div>
  );
};

export default ExerciseList;
