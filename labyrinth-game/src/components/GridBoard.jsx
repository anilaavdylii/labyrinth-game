"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import SelfVisualization from "./SelfVisualization";

export default function GridBoard() {
  const GRID_SIZE = 3;

  const ENTRY_IMAGE = "/img/entry.png";
  const BOSS_POS = { row: 1, col: 1 };
  const BOSS_IMAGE = "/img/boss.png";

  const router = useRouter();
  const [difficulty, setDifficulty] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("difficulty") || "";
    setDifficulty(stored);
  }, []);

  const handleChangeDifficulty = () => {
    // Redirect back to setup page
    router.push("/game/setup");
  };

  // Fixed room pool - these are shuffled for the 7 non-boss positions
  const BASE_ROOMS = [
    {
      src: "/img/img1.png",
      allowedTiles: [
        "notallowed",
        "allowed",
        "allowed",
        "allowed",
        "allowed",
        "allowed",
        "allowed",
        "notallowed",
        "notallowed",
        "allowed",
        "notallowed",
        "allowed",
        "allowed",
        "notallowed",
        "allowed",
        "notallowed",
        "notallowed",
        "allowed",
        "allowed",
        "allowed",
        "allowed",
        "allowed",
        "allowed",
        "notallowed",
        "notallowed",
        "allowed",
        "notallowed",
        "allowed",
        "allowed",
        "notallowed",
        "allowed",
        "notallowed",
        "notallowed",
        "allowed",
        "allowed",
        "allowed",
        "allowed",
        "allowed",
        "allowed",
        "notallowed",
      ],
    },
    {
      src: "/img/img2.png",
      allowedTiles: [
        "notallowed",
        "allowed",
        "allowed",
        "allowed",
        "allowed",
        "allowed",
        "allowed",
        "notallowed",
        "allowed",
        "allowed",
        "allowed",
        "allowed",
        "allowed",
        "allowed",
        "allowed",
        "notallowed",
        "allowed",
        "allowed",
        "allowed",
        "allowed",
        "allowed",
        "allowed",
        "allowed",
        "notallowed",
        "allowed",
        "allowed",
        "allowed",
        "allowed",
        "allowed",
        "allowed",
        "allowed",
        "notallowed",
        "notallowed",
        "notallowed",
        "notallowed",
        "notallowed",
        "notallowed",
        "notallowed",
        "notallowed",
        "notallowed",
      ],
    },
    {
      src: "/img/img3.png",
      allowedTiles: [
        "notallowed",
        "allowed",
        "allowed",
        "allowed",
        "allowed",
        "allowed",
        "allowed",
        "notallowed",
        "allowed",
        "allowed",
        "allowed",
        "allowed",
        "allowed",
        "allowed",
        "allowed",
        "notallowed",
        "allowed",
        "allowed",
        "allowed",
        "allowed",
        "allowed",
        "allowed",
        "allowed",
        "notallowed",
        "allowed",
        "allowed",
        "allowed",
        "allowed",
        "allowed",
        "allowed",
        "allowed",
        "notallowed",
        "notallowed",
        "notallowed",
        "notallowed",
        "notallowed",
        "notallowed",
        "notallowed",
        "notallowed",
        "notallowed",
      ],
    },
    {
      src: "/img/img4.png",
      allowedTiles: [
        "notallowed",
        "allowed",
        "allowed",
        "allowed",
        "allowed",
        "allowed",
        "allowed",
        "notallowed",
        "allowed",
        "allowed",
        "allowed",
        "allowed",
        "allowed",
        "allowed",
        "allowed",
        "notallowed",
        "allowed",
        "allowed",
        "allowed",
        "allowed",
        "allowed",
        "allowed",
        "allowed",
        "notallowed",
        "allowed",
        "allowed",
        "allowed",
        "allowed",
        "allowed",
        "allowed",
        "allowed",
        "notallowed",
        "notallowed",
        "notallowed",
        "notallowed",
        "notallowed",
        "notallowed",
        "notallowed",
        "notallowed",
        "notallowed",
      ],
    },
    {
      src: "/img/img5.png",
      allowedTiles: [
        "notallowed",
        "allowed",
        "allowed",
        "allowed",
        "allowed",
        "allowed",
        "allowed",
        "notallowed",
        "allowed",
        "allowed",
        "allowed",
        "allowed",
        "allowed",
        "allowed",
        "allowed",
        "notallowed",
        "allowed",
        "allowed",
        "allowed",
        "allowed",
        "allowed",
        "allowed",
        "allowed",
        "notallowed",
        "allowed",
        "allowed",
        "allowed",
        "allowed",
        "allowed",
        "allowed",
        "allowed",
        "notallowed",
        "notallowed",
        "notallowed",
        "notallowed",
        "notallowed",
        "notallowed",
        "notallowed",
        "notallowed",
        "notallowed",
      ],
    },
  ];

  // State for shuffled rooms (7 positions)
  const [shuffledRooms, setShuffledRooms] = useState(() =>
    [...BASE_ROOMS].sort(() => Math.random() - 0.5)
  );

  const shuffleRooms = () => {
    setShuffledRooms([...BASE_ROOMS].sort(() => Math.random() - 0.5));
  };

  const getRoomForPosition = (row, col) => {
    if (row === BOSS_POS.row && col === BOSS_POS.col) {
      return { src: BOSS_IMAGE, allowedTiles: null }; // Boss has no monsters
    }
    // Map the 9 positions to the 7 shuffled + boss (skip center)
    const positions = [
      [0, 0],
      [0, 1],
      [0, 2],
      [1, 0],
      [1, 2],
      [2, 0],
      [2, 1],
      [2, 2],
    ];
    const index = positions.findIndex((p) => p[0] === row && p[1] === col);
    return shuffledRooms[index % shuffledRooms.length];
  };

  return (
    <div className="min-h-screen p-8 flex flex-col items-center gap-2 bg-gray-900">
      <div className="flex flex-col max-w-5xl">
        <h1 className="text-center text-3xl font-extrabold mb-4 text-yellow-400 tracking-widest drop-shadow-2xl">
          LOGIC OF <span className="text-green-400">THE LABYRINTH</span>
        </h1>
        <p className="text-center text-base md:text-lg text-gray-300 italic">
          Below, the labyrinth reveals itself — a board of danger and reward,
          where monsters guard ancient treasures.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-2 w-full max-w-4xl">
        <div />
        <div className="relative  overflow-hidden shadow-2xl rounded-lg border border-gray-700">
          <SelfVisualization
            backgroundImage={ENTRY_IMAGE}
            allowedTiles={null}
          />
        </div>
        <div />
      </div>

      <div className="grid grid-cols-3 gap-2 w-full max-w-4xl">
        {[...Array(GRID_SIZE)].map((_, row) =>
          [...Array(GRID_SIZE)].map((_, col) => {
            const room = getRoomForPosition(row, col);
            return (
              <div
                key={`${row}-${col}`}
                className="relative  overflow-hidden shadow-2xl rounded-lg border border-gray-700"
              >
                <SelfVisualization
                  backgroundImage={room.src}
                  allowedTiles={room.allowedTiles}
                />
              </div>
            );
          })
        )}
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center gap-2 mb-6">
        {/* Shuffle Button */}
        <button
          onClick={shuffleRooms}
          className="px-6 py-3 bg-yellow-500 hover:bg-yellow-400 
               text-gray-900 font-semibold
               rounded-lg shadow-md
               transition-colors duration-200"
        >
          Shuffle Labyrinth
        </button>

        {/* Difficulty Display */}
        <div className="flex items-center gap-4 bg-gray-800 px-4 py-2 rounded-lg shadow-inner">
          <span className="text-gray-200">
            Difficulty:{" "}
            <strong className="text-yellow-400">
              {difficulty || "not set"}
            </strong>
          </span>
          <button
            onClick={handleChangeDifficulty}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 
                 text-yellow-400 font-medium
                 border border-yellow-400 rounded
                 transition-colors duration-200"
          >
            Change
          </button>
        </div>
      </div>

      <p className="text-center text-xs text-gray-400 italic mt-4">
        Click the button to generate a new labyrinth layout!
        <br />
        Entry and Boss room stay fixed. Monsters spawn only in allowed floor
        tiles.
      </p>
    </div>
  );
}
