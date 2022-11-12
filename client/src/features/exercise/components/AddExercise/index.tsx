import { useCallback, useState } from 'react';
import { Button, Form, Modal, ModalProps } from 'antd';
import useExerciseModalWithRecoil from '../../hooks/useExerciseModalWithRecoil';
import useExerciseServiceWithRecoil from '../../hooks/useExerciseServiceWithRecoil';

import { ExerciseDataType } from '../../services/ExerciseService';
import ExerciseForm from '../ExerciseForm';

export type AddExerciseModalProps = ModalProps;

const AddExerciseModal: React.FC<AddExerciseModalProps> = ({ ...props }) => {
  const [form] = Form.useForm();
  const { showing, hideModal } = useExerciseModalWithRecoil();
  const { createExercise } = useExerciseServiceWithRecoil();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // 폼 데이터 전송
  const handleSubmit = useCallback(
    async ({ formData }: { formData: ExerciseDataType }) => {
      try {
        setIsSubmitting(true);
        // 운동 생성
        await createExercise({
          exerciseData: formData,
        });
        // 폼 초기화
        form.resetFields();
        // 모달 닫기
        hideModal();
      } catch (error) {
        console.log(error);
      } finally {
        setIsSubmitting(false);
      }
    },
    [form, createExercise, hideModal]
  );

  return (
    <Modal
      {...props}
      className="max-w-[80%]"
      title="운동 추가"
      centered
      open={showing === 'add'}
      onCancel={hideModal}
      footer={[
        <Button key="back" onClick={hideModal} disabled={isSubmitting}>
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
