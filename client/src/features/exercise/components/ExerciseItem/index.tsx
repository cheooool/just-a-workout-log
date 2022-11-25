import { Button, Checkbox } from 'antd';
import { RiDeleteBin5Line, RiEditBoxLine } from 'react-icons/ri';
import { BsThreeDots } from 'react-icons/bs';

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
import useModal from '../../../../hooks/useModal';
import ActionSheet from '../../../../components/ActionSheet';

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

        // 체크 상태에서 삭제했을 경우 선택 해제
        if (isChecked) {
          handleUnselected();
        }
      },
      onError(error) {
        console.log(error);
      },
    }
  );
  const {
    isShowing: isShowingActionSheet,
    showModal: showActionSheet,
    hideModal: hideActionSheet,
  } = useModal();

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

  // 체크 여부
  const isChecked = useMemo(() => {
    return selectedExercises.some((item) => item._id === exerciseData._id);
  }, [exerciseData._id, selectedExercises]);

  // 셀렉트 이벤트
  const handleSelected = useCallback(() => {
    setSelectedExercises((state) => [...state, exerciseData]);
  }, [exerciseData, setSelectedExercises]);

  // 언셀렉트 이벤트
  const handleUnselected = useCallback(() => {
    // 담겨 있을 경우 제거
    const findIndex = selectedExercises.findIndex(
      (item) => item._id === exerciseData._id
    );
    setSelectedExercises((state) => [
      ...state.slice(0, findIndex),
      ...state.slice(findIndex + 1),
    ]);
  }, [exerciseData, selectedExercises, setSelectedExercises]);

  // 토글 셀렉트 이벤트
  const toggleSelected = useCallback(() => {
    // 리스트에 담겨 있지 않을 경우 추가
    if (!isChecked) {
      handleSelected();
    } else {
      handleUnselected();
    }
  }, [handleSelected, handleUnselected, isChecked]);

  return (
    <div {...props}>
      <div className="flex justify-between">
        <Checkbox
          className="px-4"
          checked={isChecked}
          onChange={toggleSelected}
        />
        <ExerciseInfo className="grow" info={exerciseData} />

        <div className="flex">
          <Button
            className="flex justify-center items-center"
            size="small"
            icon={<BsThreeDots />}
            type="text"
            shape="circle"
            onClick={showActionSheet}
          />
        </div>
      </div>

      {isShowing && (
        <EditExerciseModal
          open={isShowing}
          exerciseData={exerciseData}
          onClose={() => handleShowingModal(false)}
        />
      )}

      {isShowingActionSheet && (
        <ActionSheet
          buttons={[
            {
              buttonProps: {
                danger: true,
                onClick: () => {
                  hideActionSheet();
                  handleDeleteBtn();
                },
              },
              icon: <RiDeleteBin5Line size={16} />,
              text: '삭제',
            },
            {
              buttonProps: {
                onClick: () => {
                  hideActionSheet();
                  handleShowingModal(true);
                },
              },
              icon: <RiEditBoxLine size={16} />,
              text: '수정',
            },
          ]}
          onCancel={hideActionSheet}
        />
      )}
    </div>
  );
};

export default Exercise;
