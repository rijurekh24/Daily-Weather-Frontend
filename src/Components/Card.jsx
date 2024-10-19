import React from "react";

export const Card = ({ children, className }) => {
  return (
    <div className={`border rounded shadow-lg p-4 ${className}`}>
      {children}
    </div>
  );
};

export const CardHeader = ({ children }) => {
  return <div className="font-bold text-xl">{children}</div>;
};

export const CardContent = ({ children }) => {
  return <div>{children}</div>;
};

export const CardTitle = ({ children }) => {
  return <h2 className="text-lg font-semibold">{children}</h2>;
};
