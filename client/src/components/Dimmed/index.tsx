import classnames from 'classnames';
import React from 'react';

const Dimmed: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  ...props
}) => {
  return (
    <div
      {...props}
      className={classnames(
        'fixed top-0 right-0 bottom-0 left-0 bg-black opacity-30',
        props.className
      )}
    />
  );
};

export default Dimmed;
