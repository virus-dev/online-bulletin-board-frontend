import React from 'react';
import { IconComponentsProps } from 'Models/IconComponent';

// TODO найти норм иконку, эта не очень

const IconNoFoto: React.FC<IconComponentsProps> = ({ color = 'black', size }) => (
  <svg height={size} viewBox="0 0 32 32" width={size} fill={color}>
    <path d="M30,3.4141,28.5859,2,2,28.5859,3.4141,30l2-2H26a2.0027,2.0027,0,0,0,2-2V5.4141ZM26,26H7.4141l7.7929-7.793,2.3788,2.3787a2,2,0,0,0,2.8284,0L22,19l4,3.9973Zm0-5.8318-2.5858-2.5859a2,2,0,0,0-2.8284,0L19,19.1682l-2.377-2.3771L26,7.4141Z" />
    <path d="M6,22V19l5-4.9966,1.3733,1.3733,1.4159-1.416-1.375-1.375a2,2,0,0,0-2.8284,0L6,16.1716V6H22V4H6A2.002,2.002,0,0,0,4,6V22Z" />
  </svg>
);

export default IconNoFoto;
