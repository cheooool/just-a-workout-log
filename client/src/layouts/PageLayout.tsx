import React from 'react';
import classnames from 'classnames';
import Header, { HeaderProps } from '../components/Header';
import Nav from '../components/Nav/Nav';

export type PageLayoutCustomProps = {
  headerProps?: HeaderProps;
  useNav?: boolean;
};
export type PageLayoutAttributes = React.HTMLAttributes<HTMLDivElement>;
export type PagelayoutProps = PageLayoutCustomProps & PageLayoutAttributes;
const PageLayout: React.FC<PagelayoutProps> = ({
  headerProps,
  useNav = true,
  className,
  children,
  ...props
}) => {
  return (
    <div
      className={classnames(
        'flex flex-1 w-full h-screen max-w-[420px] mx-auto bg-white',
        className
      )}
      {...props}
    >
      <div className="flex flex-col flex-1">
        <Header
          {...headerProps}
          className={classnames('sticky top-0 w-full')}
        />
        {useNav && <Nav />}
        <section
          className={classnames(
            'flex flex-col flex-1 px-10',
            useNav ? 'pb-12' : ''
          )}
        >
          {children}
        </section>
      </div>
    </div>
  );
};

export default PageLayout;
