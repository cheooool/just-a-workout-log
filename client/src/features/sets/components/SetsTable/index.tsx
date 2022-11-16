import { useCallback, useState } from 'react';
import { Button, Form, Modal } from 'antd';

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

const RECORD_TYPE_DATA = {
  weight: '무게',
  reps: '횟수',
};

export type SetsTableCustomProps = {
  setsId: string;
  title: string;
  headers: IExerciseResponse['recordTypes'];
  list: ISetsResponse['list'];
};
export type SetsTableProps = SetsTableCustomProps;
const SetsTable: React.FC<SetsTableProps> = ({
  setsId,
  title,
  headers,
  list,
  ...props
}) => {
  const [editForm] = Form.useForm();
  const [isShowEditModal, setIsShowEditModal] = useState<boolean>(false);
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
      setIsShowEditModal(true);
      setUpdateIndex(idx);
      editForm.setFieldsValue(data);
    },
    [editForm]
  );

  // Edit modal hide
  const handleHideEditModal = useCallback(() => {
    setIsShowEditModal(false);
    setUpdateIndex(-1);
  }, []);

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
    <div className="px-5">
      <table className="w-full border-collapse text-center">
        <colgroup>
          {new Array(headers.length + 1).fill(null).map((_, idx, array) => (
            <col key={idx} width={`${100 / array.length}%`} />
          ))}
        </colgroup>
        <thead>
          <tr>
            <th scope="col">세트</th>
            {headers.map((recordType) => (
              <th key={recordType} scope="col">
                {RECORD_TYPE_DATA[recordType]}
              </th>
            ))}
            <th></th>
          </tr>
        </thead>
        <tbody>
          {list.map((data, index) => (
            <tr key={index}>
              <td>{index + 1}세트</td>
              {headers.map((recordType) => (
                <td key={recordType}>{data[recordType]}</td>
              ))}
              <td>
                <div className="flex">
                  <Button
                    type="text"
                    onClick={() => handleShowEditModal({ idx: index, data })}
                  >
                    수정
                  </Button>
                  <Button
                    type="text"
                    danger
                    onClick={() => handleDeleteSetsData({ idx: index })}
                  >
                    삭제
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isShowEditModal && (
        <Modal
          open={isShowEditModal}
          title={`${title} - ${updateIndex + 1} 세트`}
          okButtonProps={{
            htmlType: 'submit',
            form: 'editForm',
          }}
          okText="수정하기"
          cancelText="취소"
          onCancel={handleHideEditModal}
        >
          <SetsForm
            id="editForm"
            form={editForm}
            onFinish={handleSubmitUpdate}
          />
        </Modal>
      )}
    </div>
  );
};

export default SetsTable;
