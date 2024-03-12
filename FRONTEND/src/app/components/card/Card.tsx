import React from 'react';

const Card = ({ children}: { children?: React.ReactNode}) => {
  return (
    <div className='card h-100 w-100 rounded bg-grey' >{children}</div>
  );
};

export default Card;