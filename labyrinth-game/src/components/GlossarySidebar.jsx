"use client";

import { useState } from "react";

// Example glossary data structure
const GLOSSARY_SECTIONS = [
  {
    id: "core",
    title: "Core Concepts",
    content: `The labyrinth is a 5x5 grid of rooms. Each room may contain monsters, treasure, or special encounters. Movement is only allowed horizontally or vertically unless stated otherwise.`,
  },
  {
    id: "actions",
    title: "Actions",
    content: `Each instruction token equals one action. Players and monsters execute one action per step. Examples: MOVE, TURN, ATTACK, WAIT.`,
  },
  {
    id: "ifelse",
    title: "IF / ELSE",
    content: `IF tokens check a condition. If true, instructions inside are executed. Example:\nIF monster in front\n  ATTACK\nELSE\n  MOVE 1 STRAIGHT\nEND IF`,
  },
  {
    id: "while",
    title: "WHILE",
    content: `WHILE tokens repeat instructions while a condition is true. Example:\nWHILE monster in front\n  ATTACK\nEND WHILE`,
  },
  {
    id: "break",
    title: "BREAK",
    content: `BREAK immediately stops the current algorithm. Example:\nIF HP < 5\n  BREAK\nEND IF`,
  },
];

export default function GlossarySidebar() {
  const [selectedId, setSelectedId] = useState(GLOSSARY_SECTIONS[0].id);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredSections = GLOSSARY_SECTIONS.filter((section) =>
    section.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedSection = GLOSSARY_SECTIONS.find((s) => s.id === selectedId);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <div className="w-full md:w-1/4 bg-gray-800 border-r border-gray-700 p-4">
        <input
          type="text"
          placeholder="Search sections..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full mb-4 p-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none"
        />
        <ul className="space-y-2">
          {filteredSections.map((section) => (
            <li key={section.id}>
              <button
                onClick={() => setSelectedId(section.id)}
                className={`w-full text-left p-2 rounded hover:bg-gray-700 transition ${
                  {
                    "bg-gray-700": selectedId === section.id,
                  }[true]
                }`}
              >
                {section.title}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        <h2 className="text-2xl font-bold text-yellow-400 mb-4">
          {selectedSection?.title}
        </h2>
        <pre className="whitespace-pre-wrap text-gray-200">
          {selectedSection?.content}
        </pre>
      </div>
    </div>
  );
}
