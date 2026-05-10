import React from 'react';

const EmptyBasketSVG: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <g stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M40 90C40 90 45 160 55 170C65 180 135 180 145 170C155 160 160 90 160 90H40Z" fill="currentColor" fillOpacity="0.1"/>
      <path d="M40 90C40 90 70 40 100 40C130 40 160 90 160 90" />
      <path d="M60 120L140 120" />
      <path d="M70 150L130 150" />
      <path d="M85 90L80 170" />
      <path d="M115 90L120 170" />
    </g>
    <g stroke="#f59e0b" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none">
       <path d="M135 75C155 55 170 65 160 85C150 105 125 100 135 75Z" />
       <path d="M135 75L150 90" strokeWidth="4"/>
    </g>
  </svg>
);

export default EmptyBasketSVG;
