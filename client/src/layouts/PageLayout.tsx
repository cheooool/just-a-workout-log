import { PageHeader } from 'antd';
import React from 'react';
import Nav from '../components/Nav/Nav';

const PageLayout: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  ...props
}) => {
  return (
    <div {...props}>
      <PageHeader
        className="site-page-header border-0 border-b border-gray-200 border-solid"
        title="운동 목록"
      />
      <Nav />
      <section className="pt-6 pb-12">{children}</section>
    </div>
  );
};

export default PageLayout;
