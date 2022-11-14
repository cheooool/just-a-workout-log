import { PageHeader, PageHeaderProps } from 'antd';
import classnames from 'classnames';
import React from 'react';
import Nav from '../components/Nav/Nav';

export type PageLayoutCustomProps = {
  pageHeaderProps?: PageHeaderProps;
};
export type PageLayoutAttributes = React.HTMLAttributes<HTMLDivElement>;
export type PagelayoutProps = PageLayoutCustomProps & PageLayoutAttributes;
const PageLayout: React.FC<PagelayoutProps> = ({
  pageHeaderProps,
  children,
  ...props
}) => {
  return (
    <div {...props}>
      <PageHeader
        {...pageHeaderProps}
        className={classnames(
          'site-page-header px-4 py-1 border-0 border-b border-gray-200 border-solid',
          pageHeaderProps?.className
        )}
      />
      <Nav />
      <section className="pb-12">{children}</section>
    </div>
  );
};

export default PageLayout;
