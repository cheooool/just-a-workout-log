import React from 'react';
import Nav from '../components/Nav/Nav';

const PageLayout: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  ...props
}) => {
  return (
    <div>
      <Nav />
      <section>{children}</section>
    </div>
  );
};

export default PageLayout;
