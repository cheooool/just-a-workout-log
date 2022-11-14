import { useCallback, useState } from 'react';
import { Button, Form, Modal, ModalProps } from 'antd';

import { useQueryClient, useMutation } from '@tanstack/react-query';
import {
  createExerciseFn,
  IExerciseRequest,
} from '../../../../api/exerciseApi';

import ExerciseForm from '../ExerciseForm';

export type AddExerciseModalCustomProps = {
  onClose?: () => void;
};

export type AddExerciseModalProps = AddExerciseModalCustomProps & ModalProps;

const AddExerciseModal: React.FC<AddExerciseModalProps> = ({
  onClose,
  ...props
}) => {
  const queryClient = useQueryClient();
  const { mutate: createExercise } = useMutation(
    (data: IExerciseRequest) => createExerciseFn({ data }),
    {
      onMutate: () => {
        setIsSubmitting(true);
      },
      onSuccess: () => {
        queryClient.invalidateQueries(['exercises']);
        console.log('Success create exercise');

        // Form 초기화
        form.resetFields();

        // 모달 닫기
        handleCloseModal();
        setIsSubmitting(false);
      },
      onError: (error) => {
        console.log(error);
        setIsSubmitting(false);
      },
    }
  );
  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // 폼 데이터 전송
  const handleSubmit = useCallback(
    ({ formData }: { formData: IExerciseRequest }) => {
      createExercise(formData);
    },
    [createExercise]
  );

  const handleCloseModal = () => {
    if (typeof onClose === 'function') {
      onClose();
    }
  };

  return (
    // EditExerciseModal과 공통부분 리팩토링 필요
    <Modal
      {...props}
      className="max-w-[80%]"
      title="운동 추가"
      centered
      onCancel={handleCloseModal}
      footer={[
        <Button key="back" onClick={handleCloseModal} disabled={isSubmitting}>
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
          추가하기
        </Button>,
      ]}
    >
      <ExerciseForm
        form={form}
        id="exerciseForm"
        onSubmit={handleSubmit}
        disabled={isSubmitting}
      />
    </Modal>
  );
};

export default AddExerciseModal;
