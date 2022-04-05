import React, { useState } from 'react';
import sliderItems, { MainSliderItems } from './sliderItems';

import s from './MainSlider.module.scss';

const MainSlider: React.FC = () => {
  const [sliderCount, setSliderCount] = useState(0);
  const translateX = sliderCount * 608;

  const handleClickLeftArrow = () => {
    setSliderCount((prev) => sliderCount && prev + 1);
  };

  const handleClickRigthArrow = () => {
    setSliderCount((prev) => (-sliderItems.length === (sliderCount - 2) ? sliderCount : prev - 1));
  };

  return (
    <div className={s.mainSliderContainer}>
      <div className={s.mainSliderWrapper} style={{ transform: `translateX(${translateX}px)` }}>
        {sliderItems.map(({
          title, subtitle, imgUrl,
        }: MainSliderItems) => (
          <div key={title} className={s.sliderItem} style={{ backgroundImage: `url(${imgUrl})` }}>
            <div className={s.mainSliderTextBlock}>
              <div className={s.title}>{title}</div>
              <div className={s.subtitle}>{subtitle}</div>
            </div>
          </div>
        ))}
      </div>
      <div className={s.arrowsWrapper}>
        <button type="button" className={s.arrow} onClick={handleClickLeftArrow}>{'<'}</button>
        <button type="button" className={s.arrow} onClick={handleClickRigthArrow}>{'>'}</button>
      </div>
    </div>
  );
};

export default MainSlider;
