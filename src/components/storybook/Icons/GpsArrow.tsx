import React from 'react';
import { IconComponentsProps } from '../../../models/IconComponent';

const IconIconMenu: React.FC<IconComponentsProps> = ({ color = 'white', size }) => (
  <svg width={size} height={size} viewBox="0 0 16 16">
    <path fill={color} d="M3.812 6.883l2.556.852a3 3 0 0 1 1.897 1.897l.852 2.557 3.979-9.285-9.284 3.98zM15 1L9 15 7.316 9.949a2 2 0 0 0-1.265-1.265L1.001 7 15 1z" />
  </svg>
);

export default IconIconMenu;
