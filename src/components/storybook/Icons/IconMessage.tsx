import React from 'react';
import { IconComponentsProps } from '../../../models/IconComponent';

const IconIconMenu: React.FC<IconComponentsProps> = ({ color = 'white', size }) => (
  <svg width={size} height={size} viewBox="0 0 16 16">
    <g fill={color}>
      <path d="M3.263 3c-.478 0-.642.125-.81.22a.754.754 0 0 0-.307.327c-.09.18-.122.354-.122.863v7.18c0 .509.032.684.122.863a.76.76 0 0 0 .306.326c.17.096.333.221.811.221h9.474c.478 0 .642-.125.81-.22a.754.754 0 0 0 .307-.327c.09-.18.122-.354.122-.863V4.41c0-.509-.032-.684-.122-.863a.754.754 0 0 0-.306-.326c-.17-.096-.333-.221-.811-.221H3.263zm0-1h9.474c.632 0 .956.067 1.294.259.311.177.56.441.726.773.18.36.243.705.243 1.378v7.18c0 .673-.063 1.018-.243 1.378a1.814 1.814 0 0 1-.726.773c-.338.192-.662.259-1.294.259H3.263c-.632 0-.956-.067-1.294-.259a1.814 1.814 0 0 1-.726-.773c-.18-.36-.243-.705-.243-1.378V4.41c0-.673.063-1.018.243-1.378.167-.332.415-.596.726-.773C2.307 2.067 2.631 2 3.263 2z" />
      <path d="M12.168 4.533l.598.801L8 8.891 3.234 5.334l.598-.801L8 7.643z" />
    </g>
  </svg>
);

export default IconIconMenu;
