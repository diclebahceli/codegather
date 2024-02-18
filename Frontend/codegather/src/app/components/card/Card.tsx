// components/Card.js
import React from 'react';

const Card = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="card">
      {children}
      <style jsx>{`
        .card {
          border: 1px solid #ccc;
          border-radius: 4px;
          padding: 20px;
          margin-bottom: 20px;
        }
      `}</style>
    </div>
  );
};

export default Card;
