// eslint-disable-next-line
// @ts-nocheck
import classNames from 'classnames';
import IconNoFoto from 'Components/storybook/Icons/IconNoFoto';
import React, { useEffect, useRef, useState } from 'react';
import Button, { ButtonVariant } from 'Storybook/Button/Button';

import s from './AdvertisementSlider.module.scss';

interface AdvertisementSliderProps {
  data: string[] | undefined,
}

const getMaxTranslateX = (
  slidesRef: React.MutableRefObject<HTMLDivElement>,
  wrapperMaxTranslateX: React.MutableRefObject<number>,
  wrapperWidth: number,
) => {
  // debugger
  const { childElementCount } = slidesRef.current;
  const {
    left: slidesRefLeft,
  } = slidesRef.current.getBoundingClientRect();
  const { childNodes } = slidesRef.current;
  const lastEl: ChildNode = childNodes[childElementCount - 1];

  const {
    width: lastElWidth,
    left: lastElLeft,
    // TODO: Как исправить ошибку?
  } = lastEl.getBoundingClientRect();

  // TODO: Как исправить ошибку?
  // eslint-disable-next-line
  wrapperMaxTranslateX.current = lastElLeft - (slidesRefLeft + wrapperWidth - lastElWidth);
};

const AdvertisementSlider: React.FC<AdvertisementSliderProps> = ({ data }) => {
  const slidesRef = useRef(null);
  const wrapperRef = useRef(null);
  const [countSlide, setCountSlide] = useState(0);
  const [wrapperTranslateX, setWrapperTranslateX] = useState(0);
  const [isShowArrow, setIsShowArrow] = useState(false);
  const wrapperMaxTranslateX = useRef(0);

  useEffect(() => {
    const checkIsShowArrows = () => {
      if (slidesRef.current && wrapperRef.current) {
        const {
          width: widthSlides,
        } = slidesRef.current.getBoundingClientRect();
        const {
          width: widthWrapper,
        } = wrapperRef.current.getBoundingClientRect();

        if (widthWrapper >= widthSlides) {
          setIsShowArrow(false);
        } else {
          setIsShowArrow(true);
        }
      }
    };

    // TODO: придумать как оптимизировать
    const interval = setInterval(checkIsShowArrows, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  if (!data?.length) {
    return (
      <div className={s.noFoto}>
        <IconNoFoto size="300px" />
      </div>
    );
  }

  const onClickLeftArrowHandler = () => {
    if (!slidesRef.current) {
      return;
    }

    if (slidesRef.current.childElementCount < 2) {
      return;
    }

    if (!countSlide) {
      setWrapperTranslateX(0);
      return;
    }

    if (countSlide === 1) {
      setWrapperTranslateX(0);
      setCountSlide(0);
      return;
    }

    const firstElLeft = slidesRef.current.childNodes[0].getBoundingClientRect().left;
    const prevElLeft = slidesRef.current.childNodes[countSlide - 1].getBoundingClientRect().left;
    const res = prevElLeft - firstElLeft;

    setWrapperTranslateX(res);
    setCountSlide((prev) => prev - 1);
  };

  const onClickRigthArrowHandler = () => {
    if (!slidesRef.current) {
      return;
    }

    if (slidesRef.current.childElementCount < 2) {
      return;
    }

    if (!wrapperMaxTranslateX.current) {
      // TODO: Как исправить ошибку?
      const {
        width,
      } = wrapperRef.current.getBoundingClientRect();
      getMaxTranslateX(slidesRef, wrapperMaxTranslateX, width);
    }

    // TODO: Как исправить ошибку?
    const firstElLeft = slidesRef.current.childNodes[0].getBoundingClientRect().left;
    const nextElLeft = slidesRef.current.childNodes[countSlide + 1].getBoundingClientRect().left;
    const res = nextElLeft - firstElLeft;

    const isChange = wrapperMaxTranslateX.current > res;
    setWrapperTranslateX(isChange ? res : wrapperMaxTranslateX.current);

    if (isChange) {
      setCountSlide((prev) => prev + 1);
    }
  };

  return (
    <div className={s.advertisementSlider}>
      <div className={s.wrapper} ref={wrapperRef}>
        <div
          className={s.slides}
          ref={slidesRef}
          style={{ transform: `translateX(-${wrapperTranslateX}px)` }}
        >
          {data.map((src) => (
            <img src={src} alt="*" key={src} />
          ))}
        </div>
      </div>
      <div className={classNames(s.arrowsWrapper, !isShowArrow && s.hideArrows)}>
        <Button onClick={onClickLeftArrowHandler} variant={ButtonVariant.blue} className={s.arrow}>{'<'}</Button>
        <Button onClick={onClickRigthArrowHandler} variant={ButtonVariant.blue} className={s.arrow}>{'>'}</Button>
      </div>
    </div>
  );
};

export default AdvertisementSlider;
