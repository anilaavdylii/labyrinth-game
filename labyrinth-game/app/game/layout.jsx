"use client";
import React, { useState } from "react";
import GlossarySidebar from "../../src/components/GlossarySidebar";

export default function GameLayout({ children }) {
  const [showGlossary, setShowGlossary] = useState(false);

  return (
    <>
      <div
        className={`flex flex-col min-h-screen items-center justify-center 
    bg-gradient-to-b from-gray-900 to-gray-800 text-white font-sans p-6
    transition-all ${showGlossary ? "blur-sm" : ""}`}
      >
        {children}
      </div>
      {!showGlossary && (
        <button
          onClick={() => setShowGlossary(true)}
          className="fixed bottom-6 right-6 px-4 py-2 bg-yellow-400 text-black font-bold rounded shadow-lg hover:bg-yellow-500 transition"
        >
          View Rules
        </button>
      )}

      {showGlossary && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="bg-gray-900 rounded-xl w-full max-w-4xl max-h-[80vh] shadow-2xl overflow-hidden flex flex-col">
            <div className="flex justify-between items-center p-4 border-b border-gray-700">
              <h2 className="text-xl font-bold text-yellow-400">
                Glossary & Rules
              </h2>
              <button
                onClick={() => setShowGlossary(false)}
                className="text-white text-2xl font-bold hover:text-yellow-400"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-auto">
              <GlossarySidebar />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
