import React from "react";

export default function GameLayout({ children }) {
  return (
    <div
      className="flex flex-col min-h-screen items-center justify-center 
      bg-gradient-to-b from-gray-900 to-gray-800 text-white font-sans p-6"
    >
      {children}
    </div>
  );
}
