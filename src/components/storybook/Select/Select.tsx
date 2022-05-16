import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import i18 from 'Utils/i18';

import s from './Select.module.scss';

interface Option {
  mnemonic: string,
  value: unknown,
}

interface SelectProps {
  placeholder?: string,
  options: Option[],
  onChange: (value: unknown) => void,
}

const Select: React.FC<SelectProps> = ({ placeholder = 'Выберите вариант', options, onChange }) => {
  const refOptionsWrapper = useRef(null);
  const refButton = useRef(null);
  const [activeVariant, setActiveVariant] = useState<null | string>(null);
  const [selectOpen, setSelectOpen] = useState(false);

  const onClickButtonHandler = () => {
    if (!options.length) {
      setSelectOpen(false);
      return;
    }
    setSelectOpen((prev) => !prev);
  };

  const onClickOptionHandler = ({ value, mnemonic }: Option) => {
    onChange(value);
    setActiveVariant(i18(mnemonic));
    setSelectOpen(false);
  };

  useEffect(() => {
    setActiveVariant(null);
  }, [options]);

  useEffect(() => {
    const onClickOutsideHandler = (e: MouseEvent) => {
      if (refOptionsWrapper.current && refButton.current
        // TODO: Разобраться
        // eslint-disable-next-line
        // @ts-ignore: Unreachable code error
        && !refOptionsWrapper.current.contains(e.target) && !refButton.current.contains(e.target)) {
        setSelectOpen(false);
      }
    };

    document.addEventListener('mousedown', onClickOutsideHandler);
    return () => {
      document.removeEventListener('mousedown', onClickOutsideHandler);
    };
  }, []);

  return (
    <div className={s.selectWrapper}>
      <button type="button" className={classNames(s.select, selectOpen && s.selectOpen)} onClick={onClickButtonHandler} ref={refButton}>
        <span className={s.selectText}>{activeVariant || placeholder}</span>
        <span className={s.triangle} />
      </button>
      <div className={classNames(s.absolute, !selectOpen && s.selectClose)} ref={refOptionsWrapper}>
        {options.map(({ mnemonic, value }) => (
          <button
            className={s.option}
            key={mnemonic}
            onClick={() => onClickOptionHandler({ value, mnemonic })}
            type="button"
          >
            {i18(mnemonic)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Select;
