import { Button, Form, Modal, ModalProps } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { selectEditExerciseState } from '../../recoil/exercise.recoil';

import useExerciseModalWithRecoil from '../../hooks/useExerciseModalWithRecoil';
import useExerciseServiceWithRecoil from '../../hooks/useExerciseServiceWithRecoil';

import { ExerciseDataType } from '../../services/ExerciseService';
import ExerciseForm from '../ExerciseForm';

export type EditExerciseProps = ModalProps;
const EditExercise: React.FC<EditExerciseProps> = ({ ...props }) => {
  const [form] = Form.useForm();
  const [selectEditExercise, setSelectEditExercise] = useRecoilState(
    selectEditExerciseState
  );
  const { showing, hideModal } = useExerciseModalWithRecoil();
  const { editExercise } = useExerciseServiceWithRecoil();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Effect Form 기본 값 변경
  useEffect(() => {
    if (selectEditExercise) {
      console.log('effect selectEditExercise');
      form.setFieldsValue(selectEditExercise);
    }
  }, [form, selectEditExercise]);

  // 폼 데이터 전송
  const handleSubmit = useCallback(
    async ({ formData }: { formData: ExerciseDataType }) => {
      try {
        if (!selectEditExercise?._id) {
          throw new Error('운동 Id가 없습니다.');
        }
        setIsSubmitting(true);

        editExercise({
          id: selectEditExercise._id,
          updateData: {
            ...selectEditExercise,
            ...formData,
          },
        });

        // 초기화
        setSelectEditExercise(null);

        // 모달 닫기
        hideModal();
      } catch (error) {
        console.log(error);
      } finally {
        setIsSubmitting(false);
      }
    },
    [selectEditExercise, editExercise, setSelectEditExercise, hideModal]
  );

  if (!showing) {
    return null;
  }

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
        exerciseData={selectEditExercise}
        id="exerciseForm"
        onSubmit={handleSubmit}
        disabled={isSubmitting}
      />
    </Modal>
  );
};

export default EditExercise;
