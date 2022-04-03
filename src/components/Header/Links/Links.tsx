import React from 'react';

import s from './Links.module.scss';

const Links = () => (
  <div className={s.linksContainer}>
    <a className={s.link} href="https://tyumen.hh.ru/resume/e9bc3c4bff07d946180039ed1f43616e677254">Резюме на hh.ru</a>
    <a className={s.link} href="https://github.com/virus-dev">github</a>
  </div>
);

export default Links;
