import { Form, Input, FormProps } from 'antd';

export type SetsFormProps = FormProps;
const SetsForm: React.FC<SetsFormProps> = ({ ...props }) => {
  return (
    <Form {...props} layout="vertical">
      <Form.Item
        label="무게"
        name="weight"
        valuePropName="value"
        rules={[
          {
            required: true,
            message: '무게를 입력해주세요.',
          },
        ]}
      >
        <Input type="number" />
      </Form.Item>
      <Form.Item
        label="횟수"
        name="reps"
        valuePropName="value"
        rules={[
          {
            required: true,
            message: '횟수를 입력해주세요.',
          },
        ]}
      >
        <Input type="number" />
      </Form.Item>
    </Form>
  );
};

export default SetsForm;
