import React from 'react';
import { Link } from 'react-router-dom';
import { User } from 'Models/User';

import s from './IconProfile.module.scss';

export enum IconProfileTypeEnum {
  link = 'link',
  div = 'div',
}

interface IconProfileType {
  type?: IconProfileTypeEnum,
}

type IconProfileProps = Pick<User, 'image'> & Pick<User, 'firstName'> & Pick<User, 'secondName'> & IconProfileType;

// TODO: в React.memo

const IconProfile: React.FC<IconProfileProps> = ({
  image, firstName, secondName, type = IconProfileTypeEnum.div,
}) => (type === IconProfileTypeEnum.link ? (
  <Link className={s.iconProfile} to="/profile">
    {image ? (
      <img className={s.iconProfileImage} src={image} alt="*" />
    ) : (
      firstName?.charAt(0)
    )}
  </Link>
) : (
  <div className={s.iconProfile}>
    {image ? (
      <img className={s.iconProfileImage} src={image} alt="*" />
    ) : (
      firstName?.charAt(0)
    )}
  </div>
));

IconProfile.defaultProps = {
  type: undefined,
};

export default IconProfile;
