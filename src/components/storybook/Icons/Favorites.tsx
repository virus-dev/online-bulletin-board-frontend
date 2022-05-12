import React from 'react';
import { IconComponentsProps } from 'Models/IconComponent';

const IconIconMenu: React.FC<IconComponentsProps> = ({ color = 'white', size }) => (
  <svg width={size} height={size} viewBox="0 0 16 16">
    <path fill={color} d="M8.333 3.906L8 4.204l-.333-.298c-.758-.679-1.562-1.073-2.334-1.073C3.4 2.833 2.167 4.067 2.167 6c0 2.597 2.127 4.988 5.816 7.175-.007-.004.043-.004.043-.004 3.69-2.21 5.807-4.583 5.807-7.171 0-1.933-1.233-3.167-3.166-3.167-.772 0-1.576.394-2.334 1.073zM8 2.88c.834-.659 1.736-1.047 2.667-1.047 2.485 0 4.166 1.682 4.166 4.167 0 3.044-2.328 5.655-6.286 8.024a1.08 1.08 0 0 1-1.083.006C3.508 11.685 1.167 9.053 1.167 6c0-2.485 1.681-4.167 4.166-4.167.931 0 1.833.388 2.667 1.047z" />
  </svg>
);

export default IconIconMenu;
