import React from "react";

export default function Button({ children, onClick, className = "" }) {
  return (
    <button
      onClick={onClick}
      className={`
        bg-primary hover:bg-primary-dark text-white font-semibold 
        px-8 py-3 rounded-lg text-xl transition 
        shadow-md hover:shadow-lg focus:outline-none 
        focus:ring-2 focus:ring-primary-light
        ${className}
      `}
    >
      {children}
    </button>
  );
}
