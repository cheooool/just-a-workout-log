import { Button, Form, Modal, ModalProps } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { selectExerciseState } from '../../recoil/exercise.recoil';

import useExerciseModalWithRecoil from '../../hooks/useExerciseModalWithRecoil';
import useExerciseServiceWithRecoil from '../../hooks/useExerciseServiceWithRecoil';

import { ExerciseDataType } from '../../services/ExerciseService';
import ExerciseForm from '../ExerciseForm';

export type EditExerciseProps = ModalProps;
const EditExercise: React.FC<EditExerciseProps> = ({ ...props }) => {
  const [form] = Form.useForm();
  const [selectExercise, setSelectExercise] =
    useRecoilState(selectExerciseState);
  const { showing, hideModal } = useExerciseModalWithRecoil();
  const { editExercise } = useExerciseServiceWithRecoil();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Effect Form 기본 값 변경
  useEffect(() => {
    if (selectExercise) {
      form.setFieldsValue(selectExercise);
    }
  }, [form, selectExercise]);

  // 폼 데이터 전송
  const handleSubmit = useCallback(
    async ({ formData }: { formData: ExerciseDataType }) => {
      try {
        if (!selectExercise?._id) {
          throw new Error('운동 Id가 없습니다.');
        }
        setIsSubmitting(true);

        editExercise({
          id: selectExercise._id,
          updateData: {
            ...selectExercise,
            ...formData,
          },
        });

        // 초기화
        setSelectExercise(null);

        // 모달 닫기
        hideModal();
      } catch (error) {
        console.log(error);
      } finally {
        setIsSubmitting(false);
      }
    },
    [selectExercise, editExercise, setSelectExercise, hideModal]
  );

  return (
    <Modal
      {...props}
      className="max-w-[80%]"
      title="운동 정보 수정"
      centered
      open={showing === 'edit'}
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
          수정 완료
        </Button>,
      ]}
    >
      <ExerciseForm
        form={form}
        exerciseData={selectExercise}
        id="exerciseForm"
        onSubmit={handleSubmit}
        disabled={isSubmitting}
      />
    </Modal>
  );
};

export default EditExercise;
