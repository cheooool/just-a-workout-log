import { Button, Modal, ModalProps } from 'antd';
import { useCallback, useState } from 'react';

import ExerciseService, {
  ExerciseDataType,
} from '../../services/ExerciseService';
import ExerciseForm from '../ExerciseForm';

export type AddExerciseCustomProps = {
  onCloseModal?: () => void;
};

export type AddExerciseProps = AddExerciseCustomProps & ModalProps;

const AddExercise: React.FC<AddExerciseProps> = ({
  onCloseModal,
  ...props
}) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // 모달 닫기 이벤트
  const handleCloseModal = useCallback(() => {
    if (typeof onCloseModal === 'function') {
      onCloseModal();
    }
  }, [onCloseModal]);

  // 폼 데이터 전송
  const handleSubmit = useCallback(
    async ({ formData }: { formData: ExerciseDataType }) => {
      try {
        setIsSubmitting(true);
        const response = await ExerciseService.create(formData);
        // 생성 완료
        console.log(response);

        handleCloseModal();
      } catch (error) {
        console.log(error);
      } finally {
        setIsSubmitting(false);
      }
    },
    [handleCloseModal]
  );
  return (
    <Modal
      {...props}
      title="운동 추가"
      centered
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
        id="exerciseForm"
        onSubmit={handleSubmit}
        disabled={isSubmitting}
      />
    </Modal>
  );
};

export default AddExercise;
