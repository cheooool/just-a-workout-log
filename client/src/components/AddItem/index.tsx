import { Button, ButtonProps } from 'antd';
import { BiPlus } from 'react-icons/bi';
import classnames from 'classnames';

export type AddItemCustomProps = {
  text?: React.ReactNode;
};

export type AddItemProps = AddItemCustomProps & ButtonProps;
const AddItem: React.FC<AddItemProps> = ({ text, ...props }) => {
  return (
    <Button
      type="text"
      className={classnames(
        'flex w-full items-center px-0 py-4 h-auto',
        props.className
      )}
    >
      <div className="basis-[80px]">
        <div className="inline-flex justify-center items-center p-3 border border-solid border-gray-300 rounded-lg bg-gray-50">
          <BiPlus size={24} color="#1890ff" />
        </div>
      </div>
      <span className="text-[#1890ff]">{text}</span>
    </Button>
  );
};

export default AddItem;
