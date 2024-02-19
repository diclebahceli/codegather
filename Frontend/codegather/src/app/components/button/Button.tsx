import React from "react";

type ButtonProps = {
  children: JSX.Element;
};

const Button = ({ children }: ButtonProps) => {
  return (
    <button type="button" className="btn btn-outline-primary">
      {children}
    </button>
  );
};

export default Button;
