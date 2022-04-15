// eslint-disable-next-line
// @ts-nocheck
import React, { useRef, useState } from 'react';
import Button, { ButtonVariant } from '../storybook/Button/Button';

import s from './AdvertisementSlider.module.scss';

interface AdvertisementSliderProps {
  data: string[] | undefined,
  isLoading: boolean,
}

const getMaxTranslateX = (
  wrapperRef: React.MutableRefObject<HTMLDivElement>,
  wrapperMaxTranslateX: React.MutableRefObject<number>,
) => {
  const { childElementCount } = wrapperRef.current;
  const {
    left: wrapperRefLeft,
    width: wrapperRefWidth,
  } = wrapperRef.current.getBoundingClientRect();
  const { childNodes } = wrapperRef.current;
  const lastEl: ChildNode = childNodes[childElementCount - 1];

  const {
    width: lastElWidth,
    left: lastElLeft,
    // TODO: Как исправить ошибку?
  } = lastEl.getBoundingClientRect();

  // TODO: Как исправить ошибку?
  // eslint-disable-next-line
  wrapperMaxTranslateX.current = lastElLeft - (wrapperRefLeft + wrapperRefWidth - lastElWidth);
};

const AdvertisementSlider: React.FC<AdvertisementSliderProps> = ({ data, isLoading }) => {
  const wrapperRef = useRef(null);
  const [countSlide, cetCountSlide] = useState(0);
  const [wrapperTranslateX, setWrapperTranslateX] = useState(0);
  const wrapperMaxTranslateX = useRef(0);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data?.length) {
    return <div>Фотографий нет</div>;
  }

  const onClickRigthArrowHandler = () => {
    if (!wrapperRef.current) {
      return;
    }

    if (wrapperRef.current.childElementCount < 2) {
      return;
    }

    if (!wrapperMaxTranslateX.current) {
      // TODO: Как исправить ошибку?
      getMaxTranslateX(wrapperRef, wrapperMaxTranslateX);
    }

    // TODO: Как исправить ошибку?
    const firstElLeft = wrapperRef.current.childNodes[0].getBoundingClientRect().left;
    const nextElLeft = wrapperRef.current.childNodes[countSlide + 1].getBoundingClientRect().left;
    const res = nextElLeft - firstElLeft;

    const isChange = wrapperMaxTranslateX.current > res;
    setWrapperTranslateX(isChange ? res : wrapperMaxTranslateX.current);

    if (isChange) {
      cetCountSlide((prev) => prev + 1);
    }
  };

  return (
    <div className={s.advertisementSlider}>
      <div className={s.wrapper}>
        <div
          className={s.slides}
          ref={wrapperRef}
          style={{ transform: `translateX(-${wrapperTranslateX}px)` }}
        >
          {data.map((src) => (
            <img src={src} alt="*" key={src} />
          ))}
        </div>
      </div>
      <div className={s.arrowsWrapper}>
        <Button onClick={() => {}} variant={ButtonVariant.gray} className={s.arrow}>{'<'}</Button>
        <Button onClick={onClickRigthArrowHandler} variant={ButtonVariant.gray} className={s.arrow}>{'>'}</Button>
      </div>
    </div>
  );
};

export default AdvertisementSlider;
