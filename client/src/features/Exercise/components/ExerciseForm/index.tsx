import React, { useCallback, useState } from 'react';
import {
  Form,
  Input,
  Radio,
  Checkbox,
  Select,
  RadioChangeEvent,
  FormProps,
  FormItemProps,
} from 'antd';
import classnames from 'classnames';
import { ExerciseDataType } from '../../services/ExerciseService';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';

export type ExerciseFormCustomProps = {
  exerciseData?: ExerciseDataType;
  onSubmit?: ({ formData }: { formData: ExerciseDataType }) => void;
};
export type ExerciseFormAttributes = FormProps;

export type ExerciseFormProps = ExerciseFormCustomProps &
  ExerciseFormAttributes;

const ExerciseForm: React.FC<ExerciseFormProps> = ({
  exerciseData,
  onSubmit,
  ...props
}) => {
  const [formData, setFormData] = useState<ExerciseDataType>(
    exerciseData ?? {
      exerciseName: '',
      exerciseType: null,
      parts: '',
      recordTypes: ['weight', 'reps'],
      isAssist: false,
    }
  );

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

  const handleSubmit = useCallback(() => {
    if (!isValid()) {
      return false;
    }

    if (typeof onSubmit === 'function') {
      onSubmit({ formData });
    }
  }, [formData, isValid, onSubmit]);

  return (
    <Form {...props} layout="vertical" onFinish={handleSubmit}>
      <FormField label="운동 타입" required={true}>
        <Radio.Group
          optionType="button"
          buttonStyle="solid"
          value={formData.exerciseType}
          onChange={handleChangeExerciseType}
        >
          <Radio.Button value="0">웨이트</Radio.Button>
          <Radio.Button value="1">맨몸운동</Radio.Button>
        </Radio.Group>
      </FormField>
      <FormField label="운동명" required={true}>
        <Input
          name="exerciseName"
          placeholder="운동명 ex)데드리프트"
          onChange={handleChangeInput}
        />
      </FormField>
      <FormField label="운동 부위" required={true}>
        <Select
          placeholder="운동 부위를 선택해주세요"
          onChange={handleChangeSelect}
        >
          <Select.Option value="가슴">가슴</Select.Option>
          <Select.Option value="등">등</Select.Option>
          <Select.Option value="다리">다리</Select.Option>
          <Select.Option value="어깨">어깨</Select.Option>
          <Select.Option value="팔">팔</Select.Option>
        </Select>
      </FormField>
      <FormField label="기록 데이터" required={true} className="mb-0">
        <Checkbox.Group
          value={formData.recordTypes}
          onChange={handleChangeCheckbox}
        >
          <Checkbox name="recordTypes" value="weight">
            무게
          </Checkbox>
          <Checkbox name="recordTypes" value="reps">
            횟수
          </Checkbox>
        </Checkbox.Group>
      </FormField>
    </Form>
  );
};

const FormField: React.FC<FormItemProps> = ({ children, ...props }) => {
  return (
    <Form.Item {...props} className={classnames('mb-4', props.className)}>
      {children}
    </Form.Item>
  );
};

export default ExerciseForm;
