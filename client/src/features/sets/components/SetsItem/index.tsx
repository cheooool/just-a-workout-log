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
import SetsForm from '../SetsForm';

const RECORD_TYPE_DATA = {
  weight: '무게',
  reps: '횟수',
};

export type SetsItemCustomProps = {
  data: ISetsResponse;
};

export type SetsItemProps = CardProps & SetsItemCustomProps;

const SetsItem: React.FC<SetsItemProps> = ({ data, ...props }) => {
  const { _id: id, exercise, list } = data;
  const [isShowing, setIsShowing] = useState<boolean>(false);
  const formattedDate = useRecoilValue(selectFormattedDate);
  const queryClient = useQueryClient();

  // 세트 목록 삭제 mutation
  const { mutate: deleteSetsById } = useMutation(
    ({ id }: { id: string }) => deleteSetsByIdFn({ id }),
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
    deleteSetsById({ id });
  }, [deleteSetsById, id]);

  // 세트 리스트 수정
  const { mutate: updateSetsById } = useMutation(
    ({ id, list }: { id: string; list: SetsItemDataType[] }) =>
      updateSetsByIdFn({ id, list }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['sets', formattedDate]);
        console.log('Success update sets list');
        setIsShowing(false);
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );

  // 번호에 해당하는 세트 삭제
  const handleDeleteSetsItem = useCallback(
    (itemIndex: number) => {
      if (window.confirm(`세트 ${itemIndex + 1}을 삭제할까요?`)) {
        const updatedList = [
          ...list.slice(0, itemIndex),
          ...list.slice(itemIndex + 1),
        ];
        updateSetsById({ id, list: updatedList });
      }
    },
    [id, list, updateSetsById]
  );

  // 세트 추가하기
  const handleSubmit = useCallback(
    (values: SetsItemDataType) => {
      const updatedList = [...list, values];

      updateSetsById({ id, list: updatedList });
    },
    [id, list, updateSetsById]
  );

  return (
    <>
      <Card
        {...props}
        title={`${exercise.parts} | ${exercise.exerciseName}`}
        extra={
          <Button
            type="text"
            danger
            onClick={() => {
              if (
                window.confirm(
                  `${exercise.exerciseName} 운동 기록을 삭제할까요?`
                )
              ) {
                // 삭제
                handleDeleteSets();
              }
            }}
          >
            삭제
          </Button>
        }
      >
        {!!list.length && (
          <table className="w-full border-collapse text-center">
            <colgroup>
              {new Array(exercise.recordTypes.length + 1)
                .fill(null)
                .map((_, idx, array) => (
                  <col key={idx} width={`${100 / array.length}%`} />
                ))}
            </colgroup>
            <thead>
              <tr>
                <th scope="col">세트</th>
                {exercise.recordTypes.map((recordType) => (
                  <th key={recordType} scope="col">
                    {RECORD_TYPE_DATA[recordType]}
                  </th>
                ))}
                <th></th>
              </tr>
            </thead>
            <tbody>
              {list.map((setData, index) => (
                <tr key={index}>
                  <td>{index + 1}세트</td>
                  {exercise.recordTypes.map((recordType) => (
                    <td key={recordType}>{setData[recordType]}</td>
                  ))}
                  <td>
                    <Button
                      type="text"
                      danger
                      onClick={() => handleDeleteSetsItem(index)}
                    >
                      삭제
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <div className="py-2 px-4">
          <Button className="w-full" onClick={() => setIsShowing(true)}>
            세트 추가
          </Button>
        </div>
      </Card>

      {isShowing && (
        <Modal
          open={isShowing}
          okButtonProps={{
            htmlType: 'submit',
            form: 'addSetsForm',
          }}
          okText="추가"
          cancelText="취소"
          onCancel={() => setIsShowing(false)}
        >
          <SetsForm id="addSetsForm" onFinish={handleSubmit} />
        </Modal>
      )}
    </>
  );
};

export default SetsItem;
