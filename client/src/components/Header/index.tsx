import { PageHeader, PageHeaderProps } from 'antd';
import classnames from 'classnames';

export type HeaderProps = PageHeaderProps;
const Header: React.FC<HeaderProps> = ({ className, ...props }) => {
  return (
    <PageHeader
      {...props}
      className={classnames('site-page-header px-4 py-2', className)}
    />
  );
};

export default Header;
