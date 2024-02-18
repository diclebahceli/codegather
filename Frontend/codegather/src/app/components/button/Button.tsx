import React from 'react';


type ButtonProps = {
  children: JSX.Element
}

const Button = ({children}: ButtonProps) => {
  return (
    <button>
      {children}
    </button>
  );
};

export default Button;
