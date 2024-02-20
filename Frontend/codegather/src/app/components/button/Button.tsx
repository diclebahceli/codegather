import React from "react";

type ButtonProps = {
  children: JSX.Element;
};

const Button = ({ children }: ButtonProps) => {
  return (
    <button type="button" className="btn btn-outline-primary m-3 p-2">
      {children}
    </button>
  );
};

export default Button;
