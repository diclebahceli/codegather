import React from "react";

type ButtonProps = {
  children: JSX.Element;
};

const Button = ({ children }: ButtonProps) => {
  return (
    <button className="btn btn-dark m-3 p-2">
      {children}
    </button>
  );
};

export default Button;
