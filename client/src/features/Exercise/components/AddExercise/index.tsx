import React, { useCallback, useState } from 'react';
import {
  Form,
  Input,
  Radio,
  Checkbox,
  Button,
  Select,
  RadioChangeEvent,
} from 'antd';
import ExerciseService, {
  ExerciseDataType,
} from '../../services/ExerciseService';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';

const AddExercise = () => {
  const [formData, setFormData] = useState<ExerciseDataType>({
    exerciseName: '',
    exerciseType: null,
    parts: '',
    recordTypes: ['weight', 'reps'],
    isAssist: false,
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // 운동 타입 이벤트
  const handleChangeExerciseType = useCallback((e: RadioChangeEvent) => {
    const { value } = e.target;
    setFormData((state) => ({
      ...state,
      exerciseType: value,
    }));
  }, []);

  // 운동명 input 이벤트
  const handleChangeInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((state) => ({
        ...state,
        [name]: value,
      }));
    },
    []
  );

  // 기록 정보 체크박스 이벤트
  const handleChangeCheckbox = useCallback(
    (checkedValues: CheckboxValueType[]) => {
      setFormData((state) => ({
        ...state,
        recordTypes: [...checkedValues] as ExerciseDataType['recordTypes'],
      }));
    },
    []
  );

  // 운동 부위 셀렉트 이벤트
  const handleChangeSelect = useCallback((value: string) => {
    setFormData((state) => ({
      ...state,
      parts: value,
    }));
  }, []);

  // 폼 밸리데이션 (임시)
  const isValid = useCallback(() => {
    const { exerciseType, exerciseName, parts, recordTypes } = formData;
    if (!exerciseType) {
      alert('운동 타입을 선택해주세요.');
      return false;
    }
    if (!exerciseName) {
      alert('운동명을 입력해주세요.');
      return false;
    }
    if (!parts) {
      alert('운동 부위을 선택해주세요.');
      return false;
    }
    if (!recordTypes.length) {
      alert('기록 정보를 선택해주세요.');
      return false;
    }

    return true;
  }, [formData]);

  // Submit 이벤트
  const handleSubmit = useCallback(async () => {
    try {
      setIsSubmitting(true);
      // 데이터 검사
      if (!isValid()) {
        return false;
      }
      const response = await ExerciseService.create(formData);

      // 생성 완료
      console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, isValid]);

  return (
    <div className="max-w-[420px] mx-auto p-4">
      <Form layout="vertical" onFinish={handleSubmit}>
        <Form.Item label="운동 타입" name="exerciseType" required={true}>
          <Radio.Group
            optionType="button"
            buttonStyle="solid"
            value={formData.exerciseType}
            onChange={handleChangeExerciseType}
          >
            <Radio.Button value="0">웨이트</Radio.Button>
            <Radio.Button value="1">맨몸운동</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="운동명" required={true}>
          <Input
            name="exerciseName"
            placeholder="운동명 ex)데드리프트"
            onChange={handleChangeInput}
          />
        </Form.Item>
        <Form.Item label="운동 부위" required={true}>
          <Select
            placeholder="운동 부위를 선택해주세요"
            onChange={handleChangeSelect}
          >
            <Select.Option value="가슴">가슴</Select.Option>
            <Select.Option value="등">등</Select.Option>
            <Select.Option value="하체">하체</Select.Option>
            <Select.Option value="어깨">어깨</Select.Option>
            <Select.Option value="팔">팔</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="기록 데이터" required={true}>
          <Checkbox.Group
            value={formData.recordTypes}
            onChange={handleChangeCheckbox}
          >
            <Checkbox value="weight">무게</Checkbox>
            <Checkbox value="reps">횟수</Checkbox>
          </Checkbox.Group>
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            block
            disabled={isSubmitting}
            loading={isSubmitting}
          >
            추가하기
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddExercise;
