// cl 2021/10/25 16:44
import React from 'react';

interface IProps {}

const RightArrow: React.FC<IProps> = () => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M24 0H0V24H24V0Z" fill="white" fillOpacity="0.01"/>
      <path d="M9.5 6L15.5 12L9.5 18" stroke="#005DC9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>

  );
};

export default RightArrow;
