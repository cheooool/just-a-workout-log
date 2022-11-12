import React, { useCallback } from 'react';
import {
  Form,
  Input,
  Radio,
  Checkbox,
  Select,
  FormProps,
  FormItemProps,
} from 'antd';
import classnames from 'classnames';
import {
  ExerciseDataType,
  EXERCISE_DEFAULT_DATA,
} from '../../services/ExerciseService';

export type ExerciseFormCustomProps = {
  exerciseData?: ExerciseDataType | null;
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
  // 폼 밸리데이션 (임시)
  const isValid = useCallback((values: ExerciseDataType) => {
    const { exerciseType, exerciseName, parts, recordTypes } = values;
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
  }, []);

  const handleSubmit = useCallback(
    (values: ExerciseDataType) => {
      if (!isValid(values)) {
        return false;
      }
      if (typeof onSubmit === 'function') {
        onSubmit({ formData: values });
      }
    },
    [isValid, onSubmit]
  );

  return (
    <Form
      {...props}
      layout="vertical"
      initialValues={exerciseData ?? EXERCISE_DEFAULT_DATA}
      onFinish={handleSubmit}
    >
      <FormField
        label="운동 타입"
        name="exerciseType"
        valuePropName="value"
        required={true}
      >
        <Radio.Group optionType="button" buttonStyle="solid">
          <Radio.Button value="0">웨이트</Radio.Button>
          <Radio.Button value="1">맨몸운동</Radio.Button>
        </Radio.Group>
      </FormField>
      <FormField
        label="운동명"
        name="exerciseName"
        valuePropName="value"
        required={true}
      >
        <Input placeholder="운동명 ex)데드리프트" />
      </FormField>
      <FormField
        label="운동 부위"
        name="parts"
        valuePropName="value"
        required={true}
      >
        <Select placeholder="운동 부위를 선택해주세요">
          <Select.Option value="가슴">가슴</Select.Option>
          <Select.Option value="등">등</Select.Option>
          <Select.Option value="다리">다리</Select.Option>
          <Select.Option value="어깨">어깨</Select.Option>
          <Select.Option value="팔">팔</Select.Option>
        </Select>
      </FormField>
      <FormField
        label="기록 데이터"
        name="recordTypes"
        valuePropName="value"
        required={true}
        className="mb-0"
      >
        <Checkbox.Group>
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
