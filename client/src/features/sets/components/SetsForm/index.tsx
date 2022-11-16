import { Form, Input, FormProps } from 'antd';
import { SetsItemDataType } from '../../../../api/setsApi';
export type SetsFormCustomProps = {
  setsData?: SetsItemDataType;
};
export type SetsFormProps = SetsFormCustomProps & FormProps;
const SetsForm: React.FC<SetsFormProps> = ({ setsData, ...props }) => {
  return (
    <Form {...props} layout="vertical" initialValues={setsData ?? {}}>
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
