import classNames from 'classnames';
import React from 'react';
import { Link } from 'react-router-dom';

import s from './StyledLink.module.scss';

interface StyledLinkProps {
  children: React.ReactElement | React.ReactNode,
  href?: string,
  onClick?: () => void,
  className?: string,
}

const StyledLink: React.FC<StyledLinkProps> = ({
  children, href, onClick, className,
}) => {
  const onClickHandler = () => {
    onClick?.();
  };

  return href
    ? (
      <Link to={href} className={classNames(className, s.link)} onClick={onClick}>
        {children}
      </Link>
    ) : (
      <button onClick={onClickHandler} type="button" className={classNames(className, s.link)}>
        {children}
      </button>
    );
};

StyledLink.defaultProps = {
  href: undefined,
  onClick: undefined,
  className: undefined,
};

export default StyledLink;
