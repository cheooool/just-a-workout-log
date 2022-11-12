import { Button } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import AddItem from '../../../../components/AddItem';
import ExerciseService, {
  ExerciseDataType,
} from '../../services/ExerciseService';
import EditExercise from '../EditExercise';
import Exercise from '../Exercise';
import { ExerciseFormCustomProps } from '../ExerciseForm';

export type ListModeType = 'edit' | null;

const ExerciseList = () => {
  const [list, setList] = useState<ExerciseDataType[]>([]);
  const [mode, setMode] = useState<ListModeType>(null);
  const [editOpen, setEditOpen] = useState<boolean>(false);
  const [editData, setEditData] =
    useState<ExerciseFormCustomProps['exerciseData']>(null);

  useEffect(() => {
    const getAllExercise = async () => {
      try {
        const response = await ExerciseService.getAll();
        const data: ExerciseDataType[] = response.data;

        setList(data);
      } catch (error) {
        console.log(error);
      }
    };
    getAllExercise();
  }, []);

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

  // Edit Modal 열기
  const handleOpenEditModal = useCallback(
    ({ editData }: { editData: ExerciseDataType }) => {
      setEditData(editData);
      setEditOpen(true);
    },
    []
  );

  // Edit Modal 닫기
  const handleCloseEditModal = useCallback(() => {
    setEditData(null);
    setEditOpen(false);
  }, []);

  if (!list.length) {
    return <span>운동 목록이 없습니다.</span>;
  }
  return (
    <div>
      {editOpen && (
        <EditExercise
          open={editOpen}
          exerciseData={editData}
          onCancel={handleCloseEditModal}
          onCloseModal={handleCloseEditModal}
        />
      )}

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

      {mode !== 'edit' && <AddItem text="새로운 운동 추가..." />}

      <ul className="list-none m-0 p-0">
        {list.map((exercise, index) => {
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
                onClick={() =>
                  handleOpenEditModal({
                    editData: exercise,
                  })
                }
              >
                수정
              </Button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ExerciseList;
