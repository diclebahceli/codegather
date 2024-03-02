// components/Card.js
import React from "react";

const Card = ({ children }: { children?: React.ReactNode }) => {
  return <div className="card h-100 w-100 border-0">{children}</div>;
};

export default Card;
