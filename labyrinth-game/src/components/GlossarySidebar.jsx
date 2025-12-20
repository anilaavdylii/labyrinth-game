"use client";

import { useState } from "react";

const GLOSSARY_SECTIONS = [
  {
    id: "intro",
    title: "Introduction",
    content: `Logic of the Labyrinth is a hybrid board game designed to teach programming logic through play.

Players build simple algorithms using instruction tokens to navigate a dangerous labyrinth, fight monsters, and reach the Core.

The game focuses on logical thinking, prediction, and problem solving rather than syntax or real code.`,
  },

  {
    id: "grid",
    title: "The Labyrinth Grid",
    content: `The labyrinth consists of a 5x5 grid of room tiles.

• Movement is only allowed horizontally or vertically
• Diagonal movement is only possible with special tokens
• Each tile may contain monsters, treasure, or special effects
• The Boss Room is always placed at the center of the grid`,
  },

  {
    id: "actions",
    title: "Actions & Steps",
    content: `An action is one step in an algorithm.

• Each instruction token equals exactly one action
• Players and monsters execute one action at the same time
• Actions are resolved step-by-step from top to bottom

If an action cannot be performed (e.g. moving into a wall), it has no effect.`,
  },

  {
    id: "instructions",
    title: "Instruction Tokens",
    content: `Instruction tokens are the building blocks of your algorithm.

Types of instruction tokens include:
• Logic tokens (IF, ELSE, WHILE, END)
• Movement tokens (MOVE, TURN)
• Combat tokens (ATTACK, ABILITY)
• Utility tokens (WAIT, BREAK)

Tokens are placed in a single row and executed in order.`,
  },

  {
    id: "ifelse",
    title: "IF / ELSE",
    content: `IF tokens check a condition before executing instructions.

If the condition is true, instructions inside the IF block are executed.
If false, instructions are skipped unless an ELSE block exists.

Example:

IF monster in front
  ATTACK
ELSE
  MOVE 1 STRAIGHT
END IF

IF blocks allow players to react dynamically to the game state.`,
  },

  {
    id: "while",
    title: "WHILE Loops",
    content: `WHILE tokens repeat instructions while a condition is true.

Everything between WHILE and END WHILE repeats until:
• The condition becomes false
• The loop reaches its maximum repetition limit (5 times)

Example:

WHILE monster in front
  ATTACK
END WHILE

WHILE loops are useful for corridors or repeated combat.`,
  },

  {
    id: "break",
    title: "BREAK",
    content: `BREAK immediately stops the current algorithm.

It is often used inside IF statements to exit when something unexpected happens.

Example:

IF HP < 5
  BREAK
END IF

After BREAK, no further instructions are executed this round.`,
  },

  {
    id: "movement",
    title: "Movement Tokens",
    content: `Movement tokens control how the player navigates the grid.

• MOVE: Moves the player forward
• TURN: Rotates the player clockwise
• DIAG: Allows diagonal movement when combined with MOVE

Movement respects walls and blocked tiles. Invalid movement actions do nothing.`,
  },

  {
    id: "combat",
    title: "Combat Rules",
    content: `Combat occurs when a monster is within attack range.

• ATTACK tokens deal damage based on your weapon
• Monsters attack automatically based on their algorithm
• Damage is reduced by armor before HP is subtracted

If HP reaches 0, the target is removed from the board.`,
  },

  {
    id: "monsters",
    title: "Monster Algorithms",
    content: `Monsters follow fixed algorithm cards.

• Monsters execute one action per step
• They act simultaneously with the player
• Monster behavior cannot be controlled

If multiple monsters attempt the same action:
1. Higher rarity goes first
2. Higher HP goes first
3. If tied, no action occurs`,
  },

  {
    id: "loot",
    title: "Loot & Inventory",
    content: `Loot is obtained from treasure chests or defeated monsters.

The web app determines:
• Which loot pile to draw from
• How many items are gained

Inventory limits:
• 1 Weapon
• 1 Armor
• 3 Consumables

Equipment can be swapped at the end of a round.`,
  },

  {
    id: "boss",
    title: "Boss Rules",
    content: `The Boss Room is located at the center of the labyrinth.

• The boss remains inactive until the player enters the room
• Once active, it follows its own algorithm
• Defeating the boss wins the game

If the player reaches 0 HP, the game is lost.`,
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
