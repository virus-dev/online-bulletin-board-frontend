import React from 'react';

interface LoaderProps {
  width?: string,
  height?: string,
  color?: string,
}

const Loader: React.FC<LoaderProps> = ({ width = 100, height = 100, color = '#7092fe' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    style={{
      margin: 'auto',
      background: 'transparent',
      display: 'block',
      shapeRendering: 'auto',
    }}
    width={width}
    height={height}
    viewBox="0 0 100 100"
    preserveAspectRatio="xMidYMid"
  >
    <circle cx="50" cy="50" fill="none" stroke={color} strokeWidth="4" r="30" strokeDasharray="141.37166941154067 49.12388980384689">
      <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;360 50 50" keyTimes="0;1" />
    </circle>
  </svg>
);

Loader.defaultProps = {
  width: undefined,
  height: undefined,
  color: undefined,
};

export default Loader;
