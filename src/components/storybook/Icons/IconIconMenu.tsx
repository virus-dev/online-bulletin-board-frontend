import React from 'react';
import { IconComponentsProps } from 'Models/IconComponent';

const IconIconMenu: React.FC<IconComponentsProps> = ({ color = 'white', size }) => (
  <svg height={size} strokeWidth="1.5" viewBox="0 0 24 24" width={size}>
    <path d="M3 5H21" stroke={color} strokeLinecap="round" strokeLinejoin="round" />
    <path d="M3 12H21" stroke={color} strokeLinecap="round" strokeLinejoin="round" />
    <path d="M3 19H21" stroke={color} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default IconIconMenu;
