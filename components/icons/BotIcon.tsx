import React from 'react';

const BotIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}>
    <path d="M15 7H9a2 2 0 00-2 2v6a2 2 0 002 2h6a2 2 0 002-2V9a2 2 0 00-2-2z"></path>
    <path d="M9 17v1a2 2 0 002 2h2a2 2 0 002-2v-1"></path>
    <path d="M10.5 13.5v-1.5a1.5 1.5 0 013 0v1.5"></path>
    <path d="M12 7V4"></path>
    <path d="M15.5 4.5l-1-1-1 1"></path>
    <path d="M8.5 4.5l1-1 1 1"></path>
  </svg>
);

export default BotIcon;
