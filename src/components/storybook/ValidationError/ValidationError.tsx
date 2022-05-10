import React from 'react';

import s from './ValidationError.module.scss';

interface ValidationErrorProps {
  error?: string,
}

const ValidationError: React.FC<ValidationErrorProps> = ({ error }) => (
  error ? <div className={s.validationError}>{error}</div> : <p />
);

ValidationError.defaultProps = {
  error: undefined,
};

export default ValidationError;
