import React, { useState } from 'react';
import Login from '../../components/Login/Login';
import Registration from '../../components/Registration/Registration';

import s from './AuthPage.module.scss';

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);

  const changeIsLogin = () => {
    setIsLogin((prev) => !prev);
  };

  return (
    <div className={s.authPage}>
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

export default AuthPage;
