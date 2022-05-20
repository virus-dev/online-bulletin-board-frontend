import React, { useState } from 'react';
import Login from 'Components/Login/Login';
import Registration from 'Components/Registration/Registration';

import s from './PageAuth.module.scss';

const PageAuth = () => {
  const [isLogin, setIsLogin] = useState(true);

  const changeIsLogin = () => {
    setIsLogin((prev) => !prev);
  };

  return (
    <div className={s.pageAuth}>
      <div className={s.authBlock}>
        {
          isLogin
            ? <Login changeIsLogin={changeIsLogin} />
            : <Registration changeIsLogin={changeIsLogin} />
        }
      </div>
    </div>
  );
};

export default PageAuth;
