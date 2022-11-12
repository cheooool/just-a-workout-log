import { Button, Modal, ModalProps } from 'antd';
import { useCallback, useState } from 'react';

import ExerciseService, {
  ExerciseDataType,
} from '../../services/ExerciseService';
import ExerciseForm, { ExerciseFormCustomProps } from '../ExerciseForm';

export type EditExerciseCustomProps = {
  exerciseData?: ExerciseFormCustomProps['exerciseData'];
  onCloseModal?: () => void;
};

export type EditExerciseProps = EditExerciseCustomProps & ModalProps;

const EditExercise: React.FC<EditExerciseProps> = ({
  exerciseData,
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
        const updatedData = {
          ...exerciseData,
          ...formData,
        };

        const response = await ExerciseService.updateById({
          id: updatedData._id ?? '',
          data: formData,
        });
        // 수정 완료
        console.log(response);

        handleCloseModal();
      } catch (error) {
        console.log(error);
      } finally {
        setIsSubmitting(false);
      }
    },
    [exerciseData, handleCloseModal]
  );

  return (
    <Modal
      {...props}
      title="운동 정보 수정"
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
          수정 완료
        </Button>,
      ]}
    >
      <ExerciseForm
        id="exerciseForm"
        exerciseData={exerciseData}
        onSubmit={handleSubmit}
        disabled={isSubmitting}
      />
    </Modal>
  );
};

export default EditExercise;
