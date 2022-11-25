import { useCallback } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button, Modal } from 'antd';
import { AiOutlinePlus } from 'react-icons/ai';
import { useRecoilValue } from 'recoil';
import { BsThreeDots } from 'react-icons/bs';
import { RiDeleteBin5Line } from 'react-icons/ri';

import {
  deleteSetsByIdFn,
  ISetsResponse,
  SetsItemDataType,
  updateSetsByIdFn,
} from '../../../../api/setsApi';
import { selectFormattedDate } from '../../../workout/recoil/workouts.recoil';
import SetsData from '../SetsData';
import SetsForm from '../SetsForm';
import useModal from '../../../../hooks/useModal';
import ActionSheet from '../../../../components/ActionSheet';

export type SetsItemCustomProps = {
  data: ISetsResponse;
};

export type SetsItemProps = SetsItemCustomProps;

const SetsItem: React.FC<SetsItemProps> = ({ data, ...props }) => {
  const { _id: id, exercise, list } = data;
  const {
    isShowing: isShowingAddModal,
    showModal: showAddModal,
    hideModal: hideAddModal,
  } = useModal(false);
  const {
    isShowing: isShowingActionSheet,
    showModal: showActionSheet,
    hideModal: hideActionSheet,
  } = useModal(false);
  const formattedDate = useRecoilValue(selectFormattedDate);
  const queryClient = useQueryClient();

  // 세트 목록 삭제 mutation
  const { mutate: deleteSetsById } = useMutation(
    () => deleteSetsByIdFn({ id }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['sets', formattedDate]);
        console.log('Success delete sets');
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );

  const { mutate: updateSets } = useMutation(
    ({ list }: { list: SetsItemDataType[] }) => updateSetsByIdFn({ id, list }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['sets', formattedDate]);
        console.log('Success update sets data');
        hideAddModal();
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );

  // 세트 데이터 추가
  const handleSubmitAddData = useCallback(
    (values: SetsItemDataType) => {
      const updatedList = [...list, values];

      updateSets({
        list: updatedList,
      });
    },
    [list, updateSets]
  );

  // 운동 삭제
  const handleDeleteSets = useCallback(() => {
    hideActionSheet();
    if (window.confirm(`${exercise.exerciseName} 운동 기록을 삭제할까요?`)) {
      deleteSetsById();
    }
  }, [deleteSetsById, exercise.exerciseName, hideActionSheet]);

  return (
    <>
      <div className="py-4">
        {/* 운동 세트 헤더 */}
        <div className="flex justify-between items-center mb-2">
          <span className="font-bold text-xl">{exercise.exerciseName}</span>
          <Button
            type="text"
            className="flex justify-center items-center"
            shape="circle"
            icon={<BsThreeDots />}
            title={`${exercise.exerciseName} 메뉴 버튼`}
            onClick={showActionSheet}
          />
        </div>

        {/* 운동 세트 */}
        <SetsData
          setsId={id}
          title={exercise.exerciseName}
          headers={exercise.recordTypes}
          list={list}
        />

        {/* 세트 추가 버튼 */}
        <Button
          className="w-full flex justify-center items-center my-2"
          icon={<AiOutlinePlus className="mr-2" />}
          onClick={showAddModal}
        >
          세트 추가
        </Button>
      </div>

      {isShowingActionSheet && (
        <ActionSheet
          buttons={[
            {
              buttonProps: {
                danger: true,
                onClick: handleDeleteSets,
              },
              icon: <RiDeleteBin5Line size={16} />,
              text: `${exercise.exerciseName} 삭제`,
            },
          ]}
          onCancel={hideActionSheet}
        />
      )}

      {isShowingAddModal && (
        <Modal
          open={isShowingAddModal}
          title={`${exercise.exerciseName} - ${list.length + 1} 세트`}
          okButtonProps={{
            htmlType: 'submit',
            form: 'addForm',
          }}
          okText="추가하기"
          cancelText="취소"
          onCancel={hideAddModal}
        >
          <SetsForm id="addForm" onFinish={handleSubmitAddData} />
        </Modal>
      )}
    </>
  );
};

export default SetsItem;
