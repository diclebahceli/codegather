// components/Card.js
import React from "react";

const Card = ({ children }: { children: React.ReactNode }) => {
  return <div className="card">{children}</div>;
};

export default Card;
