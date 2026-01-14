"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import SelfVisualization from "./SelfVisualization";

export default function GridBoard() {
  const GRID_SIZE = 3;

  const ENTRY_IMAGE = "/img/entry.png";
  const BOSS_POS = { row: 1, col: 1 };
  const BOSS_IMAGE = "/img/boss.png";
  const BOSS_TYPES = ["Dragon", "Necromancer"];
  const BOSS_TOKENS = {
   Dragon: "/img/monsters/monster10.jpg",
   Necromancer: "/img/monsters/monster9.jpg",
 };

 const [bossType, setBossType] = useState("Dragon");

  const [selectedMonster, setSelectedMonster] = useState(null);
  const [selectedTreasure, setSelectedTreasure] = useState(null);

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const router = useRouter();
  const [difficulty, setDifficulty] = useState("");

  const MONSTER_DETAILS = {
    "/img/monsters/monster1.jpg": "/img/monsters/monster1_details.png",
    "/img/monsters/monster2.jpg": "/img/monsters/monster2_details.png",
    "/img/monsters/monster3.jpg": "/img/monsters/monster3_details.png",
    "/img/monsters/monster4.jpg": "/img/monsters/monster4_details.png",
    "/img/monsters/monster5.jpg": "/img/monsters/monster5_details.png",
    "/img/monsters/monster6.jpg": "/img/monsters/monster6_details.png",
    "/img/monsters/monster7.jpg": "/img/monsters/monster7_details.png",
    "/img/monsters/monster8.jpg": "/img/monsters/monster8_details.png",
  };

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
  const [shuffledRooms, setShuffledRooms] = useState(BASE_ROOMS);

  useEffect(() => {
    setShuffledRooms([...BASE_ROOMS].sort(() => Math.random() - 0.5));
  }, []);

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

  const getTreasureResult = (difficulty) => {
    if (difficulty === "easy") {
      return {
        draws: 2,
        piles: ["Consumables", "Weapons", "Armor"],
      };
    }

    if (difficulty === "hard") {
      return {
        draws: 1,
        piles: ["Weapons", "Consumables"],
      };
    }

    return {
      draws: 1,
      piles: ["Consumables", "Weapons", "Armor"],
    };
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

      {isClient && (
        <div className="grid grid-cols-3 gap-2 w-full max-w-4xl">
          {[...Array(GRID_SIZE)].map((_, row) =>
            [...Array(GRID_SIZE)].map((_, col) => {
              const room = getRoomForPosition(row, col);
              return (
                <div
                  key={`${row}-${col}`}
                  className="relative overflow-hidden shadow-2xl border border-gray-700"
                >
                  <SelfVisualization
                    backgroundImage={room.src}
                    allowedTiles={room.allowedTiles}
                    onMonsterClick={(src) => setSelectedMonster(src)}
                    onTreasureClick={() =>
                      setSelectedTreasure({
                        difficulty,
                        // later you can add class here
                      })
                    }
                  />
                </div>
              );
            })
          )}
        </div>
      )}

      {selectedMonster && (
        <div className="fixed inset-0 bg-opacity-50 bg-blur flex items-center justify-center z-50">
          <div className="absolute inset-0  bg-opacity-50 backdrop-blur-sm"></div>
          <div className="relative bg-gray-900 p-3  shadow-lg flex flex-col items-center z-10">
            <img
              src={MONSTER_DETAILS[selectedMonster] || selectedMonster}
              className="w-70 h-85 object-contain"
              alt="Monster Details"
            />
            <button
              onClick={() => setSelectedMonster(null)}
              className="mt-4 px-4 py-2 bg-yellow-500 hover:bg-yellow-400 text-gray-900 rounded-lg font-semibold"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {selectedTreasure && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

          <div className="relative bg-gray-900 w-full max-w-md p-6 rounded-xl border-2 border-yellow-500 shadow-2xl z-10">
            {/* Header */}
            <h2 className="text-2xl font-extrabold text-yellow-400 text-center mb-2 tracking-wide">
              Treasure Chest
            </h2>
            <p className="text-center text-gray-400 text-sm mb-4">
              You have discovered a hidden cache of equipment.
            </p>

            {/* Loot Instructions */}
            <div className="bg-gray-800 rounded-lg p-4 mb-4">
              <p className="text-gray-200 text-center mb-3">
                When looting this chest:
              </p>

              <div className="text-center text-green-400 font-semibold text-lg">
                Draw <span className="text-yellow-400">1 card</span> from
                <br />
                <span className="text-yellow-400">ONE</span> loot pile of your
                choice
              </div>
            </div>

            {/* Loot Piles */}
            <div className="mb-4">
              <p className="text-gray-300 mb-2 text-xs uppercase tracking-wider text-center">
                Loot Piles
              </p>

              <ul className="grid grid-cols-3 gap-2 text-center text-sm">
                <li className="bg-gray-800 rounded-md py-2 text-gray-200">
                  Consumables
                </li>
                <li className="bg-gray-800 rounded-md py-2 text-gray-200">
                  Weapons
                </li>
                <li className="bg-gray-800 rounded-md py-2 text-gray-200">
                  Armor
                </li>
              </ul>
            </div>

            {/* Trap Notice */}
            <div className="bg-red-900/30 border border-red-500 rounded-lg p-3 mb-4">
              <p className="text-red-300 text-sm text-center">
                ⚠ Trap cards are shuffled into all loot piles.
                <br />
                Resolve trap effects immediately when drawn.
              </p>
            </div>

            {/* Inventory Rules */}
            <div className="text-xs text-gray-400 text-center mb-4 leading-relaxed">
              Inventory limits:
              <br />
              <strong>1</strong> Weapon · <strong>1</strong> Armor ·{" "}
              <strong>3</strong> Consumables
              <br />
              You may swap equipment at the end of the round.
            </div>

            {/* Close */}
            <button
              onClick={() => setSelectedTreasure(null)}
              className="w-full py-3 bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-bold rounded-lg transition-colors"
            >
              Continue
            </button>
          </div>
        </div>
      )}

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

      <p className="text-center text-sm text-gray-500 italic mt-6 max-w-lg leading-relaxed">
        Shuffle to forge a new labyrinth. Entry and Boss remain fixed.
        <br />
        Monsters appear only on walkable floor tiles.
        <br />
        <span className="text-gray-400 text-xs">
          Rare glitch? Monster on a wall? Just refresh the page.
        </span>
      </p>
    </div>
  );
}
