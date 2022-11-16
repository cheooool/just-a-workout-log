import { useCallback, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button, Card, CardProps, Modal } from 'antd';
import { useRecoilValue } from 'recoil';
import {
  deleteSetsByIdFn,
  ISetsResponse,
  SetsItemDataType,
  updateSetsByIdFn,
} from '../../../../api/setsApi';
import { selectFormattedDate } from '../../../workout/recoil/workouts.recoil';
import SetsTable from '../SetsTable';
import SetsForm from '../SetsForm';

export type SetsItemCustomProps = {
  data: ISetsResponse;
};

export type SetsItemProps = CardProps & SetsItemCustomProps;

const SetsItem: React.FC<SetsItemProps> = ({ data, ...props }) => {
  const { _id: id, exercise, list } = data;
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

  const handleDeleteSets = useCallback(() => {
    if (window.confirm(`${exercise.exerciseName} 운동 기록을 삭제할까요?`)) {
      deleteSetsById();
    }
  }, [deleteSetsById, exercise.exerciseName]);

  const [isShowAddModal, setIsShowAddModal] = useState<boolean>(false);
  const { mutate: updateSets } = useMutation(
    ({ list }: { list: SetsItemDataType[] }) => updateSetsByIdFn({ id, list }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['sets', formattedDate]);
        console.log('Success update sets data');
        handleHideAddModal();
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );

  const handleShowAddModal = useCallback(() => {
    setIsShowAddModal(true);
  }, []);
  const handleHideAddModal = useCallback(() => {
    setIsShowAddModal(false);
  }, []);

  const handleSubmitAddData = useCallback(
    (values: SetsItemDataType) => {
      const updatedList = [...list, values];

      updateSets({
        list: updatedList,
      });
    },
    [list, updateSets]
  );

  return (
    <>
      <Card
        {...props}
        title={`${exercise.parts} | ${exercise.exerciseName}`}
        extra={
          <Button type="text" danger onClick={handleDeleteSets}>
            삭제
          </Button>
        }
      >
        <SetsTable
          setsId={id}
          title={exercise.exerciseName}
          headers={exercise.recordTypes}
          list={list}
        />
        <Button
          type="primary"
          className="w-full mt-5"
          onClick={handleShowAddModal}
        >
          세트 추가
        </Button>
      </Card>

      {isShowAddModal && (
        <Modal
          open={isShowAddModal}
          title={`${exercise.exerciseName} - ${list.length + 1} 세트`}
          okButtonProps={{
            htmlType: 'submit',
            form: 'addForm',
          }}
          okText="추가하기"
          cancelText="취소"
          onCancel={handleHideAddModal}
        >
          <SetsForm id="addForm" onFinish={handleSubmitAddData} />
        </Modal>
      )}
    </>
  );
};

export default SetsItem;
