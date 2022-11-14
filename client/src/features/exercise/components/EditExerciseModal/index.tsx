import { Button, Form, Modal, ModalProps } from 'antd';
import { useCallback, useState } from 'react';
import {
  IExerciseRequest,
  IExerciseResponse,
  updateExerciseFn,
} from '../../../../api/exerciseApi';
import { useQueryClient, useMutation } from '@tanstack/react-query';

import ExerciseForm from '../ExerciseForm';

export type EditExerciseModalCustomProps = {
  exerciseData: IExerciseResponse;
  onClose?: () => void;
};
export type EditExerciseModalProps = EditExerciseModalCustomProps & ModalProps;
const EditExerciseModal: React.FC<EditExerciseModalProps> = ({
  exerciseData,
  onClose,
  ...props
}) => {
  const queryClient = useQueryClient();
  const { mutate: updateExercise } = useMutation(
    ({ id, data }: { id: string; data: IExerciseRequest }) =>
      updateExerciseFn({ id, data }),
    {
      onMutate: () => {
        setIsSubmitting(true);
      },
      onSuccess: () => {
        queryClient.invalidateQueries(['exercises']);
        console.log('Success update Success');

        handleCloseModal();
        setIsSubmitting(true);
      },
      onError: () => {
        console.log('Error update exercise');
        setIsSubmitting(true);
      },
    }
  );
  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // 폼 데이터 전송
  const handleSubmit = useCallback(
    ({ formData }: { formData: IExerciseRequest }) => {
      updateExercise({
        id: exerciseData._id,
        data: formData,
      });
    },
    [exerciseData._id, updateExercise]
  );

  const handleCloseModal = () => {
    if (typeof onClose === 'function') {
      onClose();
    }
  };

  return (
    <Modal
      {...props}
      className="max-w-[80%]"
      title="운동 정보 수정"
      onCancel={() => handleCloseModal()}
      centered
      footer={[
        <Button
          key="back"
          onClick={() => handleCloseModal()}
          disabled={isSubmitting}
        >
          취소
        </Button>,
        <Button
          key="submit"
          type="primary"
          htmlType="submit"
          form="exerciseForm"
          disabled={isSubmitting}
          loading={isSubmitting}
        >
          수정 완료
        </Button>,
      ]}
    >
      <ExerciseForm
        form={form}
        exerciseData={exerciseData}
        id="exerciseForm"
        onSubmit={handleSubmit}
        disabled={isSubmitting}
      />
    </Modal>
  );
};

export default EditExerciseModal;
