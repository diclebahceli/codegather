import React from 'react';

const Card = ({ children}: { children?: React.ReactNode}) => {
  return (
    <div className={`card h-100 w-100 border border-orange border-3 rounded`}>{children}</div>
  );
};

export default Card;