import { Link, LinkProps } from 'react-router-dom';
import { BiNotepad, BiDumbbell } from 'react-icons/bi';
import React from 'react';
import classnames from 'classnames';

const NavButton: React.FC<
  LinkProps & React.RefAttributes<HTMLAnchorElement>
> = ({ children, className, ...props }) => {
  return (
    <Link
      {...props}
      className={classnames(
        'flex flex-row grow justify-center items-center',
        className
      )}
    >
      {children}
    </Link>
  );
};
const Nav = () => {
  return (
    <div className="fixed bottom-0 left-0 w-full border-0 border-solid border-t">
      <nav className="flex h-12">
        <NavButton to="/">
          <BiNotepad size={24} title="운동 기록" color="#000" />
        </NavButton>
        <NavButton to="/exercises">
          <BiDumbbell size={24} title="운동 리스트" color="#000" />
        </NavButton>
      </nav>
    </div>
  );
};

export default Nav;
