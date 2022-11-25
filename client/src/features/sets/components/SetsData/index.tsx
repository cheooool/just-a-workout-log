import { useCallback, useState } from 'react';
import { Button, Checkbox, Form, Modal } from 'antd';
import { RiDeleteBin5Line, RiEditBoxLine } from 'react-icons/ri';

import { IExerciseResponse } from '../../../../api/exerciseApi';
import {
  ISetsResponse,
  SetsItemDataType,
  updateSetsByIdFn,
} from '../../../../api/setsApi';
import SetsForm from '../SetsForm';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRecoilValue } from 'recoil';
import { selectFormattedDate } from '../../../workout/recoil/workouts.recoil';
import useModal from '../../../../hooks/useModal';

export type SetsDataCustomProps = {
  setsId: string;
  title: string;
  headers: IExerciseResponse['recordTypes'];
  list: ISetsResponse['list'];
};
export type SetsDataProps = SetsDataCustomProps;
const SetsData: React.FC<SetsDataProps> = ({
  setsId,
  title,
  headers,
  list,
  ...props
}) => {
  const [editForm] = Form.useForm();
  const {
    isShowing: isShowingEditModal,
    showModal: showEditModal,
    hideModal: hideEditModal,
  } = useModal(false);

  const [updateIndex, setUpdateIndex] = useState<number>(-1);

  const queryClient = useQueryClient();
  const formatted = useRecoilValue(selectFormattedDate);
  const { mutate: updateSets } = useMutation(
    ({ list }: { list: SetsItemDataType[] }) =>
      updateSetsByIdFn({ id: setsId, list }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['sets', formatted]);
        console.log('Success update sets data');
        handleHideEditModal();
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );

  // Edit modal show
  const handleShowEditModal = useCallback(
    ({ idx, data }: { idx: number; data: SetsItemDataType }) => {
      showEditModal();
      setUpdateIndex(idx);
      editForm.setFieldsValue(data);
    },
    [editForm, showEditModal]
  );

  // Edit modal hide
  const handleHideEditModal = useCallback(() => {
    hideEditModal();
    setUpdateIndex(-1);
  }, [hideEditModal]);

  // Delete Sets list with query
  const handleDeleteSetsData = useCallback(
    ({ idx }: { idx: number }) => {
      if (window.confirm(`${title} - ${idx + 1}세트를 삭제할까요?`)) {
        const deletedList = [...list.slice(0, idx), ...list.slice(idx + 1)];

        updateSets({ list: deletedList });
      }
    },
    [list, title, updateSets]
  );

  // Update sets list with query
  const handleSubmitUpdate = useCallback(
    (values: SetsItemDataType) => {
      const updatedList = list.map((data, idx) => {
        if (idx === updateIndex) {
          return {
            ...data,
            ...values,
          };
        }
        return data;
      });
      updateSets({ list: updatedList });
    },
    [list, updateIndex, updateSets]
  );

  if (!list || !list.length) {
    return null;
  }
  return (
    <>
      {list.map((data, index) => {
        const numb = index + 1;
        return (
          <div
            key={index}
            className="flex flex-wrap justify-between items-center py-1 text-sm"
          >
            <div className="flex grow items-center">
              <div className="basis-[24px]">
                <Checkbox />
              </div>
              <div className="font-bold">{numb}세트</div>
              <div className="flex items-center px-4 font-bold [&>span]:text-right [&>span]:basis-[60px] [&>span]:w-[60px] [&>span:first-child]:mr-6 ">
                {data.weight && <span>{data.weight}kg</span>}
                {data.reps && <span>{data.reps}회</span>}
              </div>
            </div>
            <div className="flex items-center">
              <Button
                className="flex justify-center items-center"
                type="text"
                shape="circle"
                icon={<RiEditBoxLine />}
                title={`${title} - ${numb} 세트 수정 버튼`}
                onClick={() => handleShowEditModal({ idx: index, data })}
              />
              <Button
                className="flex justify-center items-center"
                type="text"
                danger
                shape="circle"
                icon={<RiDeleteBin5Line />}
                title={`${title} - ${numb} 세트 삭제 버튼`}
                onClick={() => handleDeleteSetsData({ idx: index })}
              />
            </div>
          </div>
        );
      })}

      {isShowingEditModal && (
        <Modal
          open={isShowingEditModal}
          title={`${title} - ${updateIndex + 1} 세트`}
          okButtonProps={{
            htmlType: 'submit',
            form: 'editForm',
          }}
          okText="수정하기"
          cancelText="취소"
          onCancel={hideEditModal}
        >
          <SetsForm
            id="editForm"
            form={editForm}
            onFinish={handleSubmitUpdate}
          />
        </Modal>
      )}
    </>
  );
};

export default SetsData;
