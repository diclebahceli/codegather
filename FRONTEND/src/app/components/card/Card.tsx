import React from "react";

const Card = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div
      className="card h-100 w-100 rounded rounded-3 bg-grey text-white border border-2 border-green
       "
    >
      {children}
    </div>
  );
};

export default Card;
