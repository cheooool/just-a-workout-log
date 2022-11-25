import classnames from 'classnames';
import { Button, ButtonProps } from 'antd';
import Dimmed from '../Dimmed';
import React from 'react';
import Portal from '../Portal';

const SheetButton: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <Button
      {...props}
      className={classnames(
        'flex justify-center items-center w-full px-6',
        props.className
      )}
      type="text"
    >
      {children}
    </Button>
  );
};

export type ActionSheetCustomProps = {
  // 버튼 배열
  buttons?: {
    // 버튼 props
    buttonProps?: ButtonProps;
    // 버튼 아이콘
    icon?: React.ReactNode;
    // 버튼 텍스트
    text: string;
  }[];
  onCancel?: () => void;
};
export type ActionSheetAttributes = React.HTMLAttributes<HTMLDivElement>;
export type ActionSheetProps = ActionSheetCustomProps & ActionSheetAttributes;

const ActionSheet: React.FC<ActionSheetProps> = ({
  buttons,
  className,
  onCancel,
  ...props
}) => {
  return (
    <Portal>
      <div
        {...props}
        className={classnames(
          'fixed top-0 right-0 bottom-0 left-0 z-20',
          className
        )}
      >
        <div className="absolute bottom-0 left-0 w-full rounded-tl-3xl rounded-tr-3xl bg-white z-20">
          <div className="py-2">
            {buttons &&
              buttons.map((button, index) => {
                const { buttonProps, icon, text } = button;
                return (
                  <SheetButton key={index} {...buttonProps}>
                    {icon && icon}
                    <span className={classnames(icon && 'ml-2')}>{text}</span>
                  </SheetButton>
                );
              })}
            <div className="mx-4 my-2">
              <Button className="w-full px-6 rounded-lg" onClick={onCancel}>
                취소
              </Button>
            </div>
          </div>
        </div>
        <Dimmed onClick={onCancel} />
      </div>
    </Portal>
  );
};

export default ActionSheet;
