"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import SelfVisualization from "./SelfVisualization";

const HEROES = {
  thief: {
    name: "Thief",
    img: "/img/heroes/thief.jpg",
    hp: 15,
    gear: ["Twin Daggers", "Potion of Warding"],
    ability:
      "If you hit a monster from behind (defined as the opposite direction of where it last moved), deal 5 extra damage, once per round.",
  },
  warrior: {
    name: "Warrior",
    img: "/img/heroes/warrior.jpg",
    hp: 20,
    gear: ["Simple Sword", "Light Armor"],
    ability: "3x a game: Block an instance of damage.",
  },
  mage: {
    name: "Mage",
    img: "/img/heroes/mage.jpg",
    hp: 10,
    gear: ["Cloak of the Fey", "Potion of Healing"],
    ability:
      "Once per round: Deal 3 damage to any creature within 5 squares of you.",
  },
};

const LOOT_PILES = ["Armor", "Consumables", "Weapons"];
const BASE_ROOMS = [
  {
    src: "/img/img1.png",
    allowedTiles: [
      "notallowed","allowed","allowed","allowed","allowed","allowed","allowed","notallowed",
      "notallowed","allowed","notallowed","allowed","allowed","notallowed","allowed","notallowed",
      "notallowed","allowed","allowed","allowed","allowed","allowed","allowed","notallowed",
      "notallowed","allowed","notallowed","allowed","allowed","notallowed","allowed","notallowed",
      "notallowed","allowed","allowed","allowed","allowed","allowed","allowed","notallowed",
    ],
  },
  {
    src: "/img/img2.png",
    allowedTiles: [
      "notallowed","allowed","allowed","allowed","allowed","allowed","allowed","notallowed",
      "allowed","allowed","allowed","allowed","allowed","allowed","allowed","notallowed",
      "allowed","allowed","allowed","allowed","allowed","allowed","allowed","notallowed",
      "allowed","allowed","allowed","allowed","allowed","allowed","allowed","notallowed",
      "notallowed","notallowed","notallowed","notallowed","notallowed","notallowed","notallowed","notallowed",
    ],
  },
  {
    src: "/img/img3.png",
    allowedTiles: [
      "notallowed","notallowed","notallowed","notallowed","notallowed","notallowed","notallowed","notallowed",
      "notallowed","allowed","allowed","allowed","allowed","allowed","allowed","notallowed",
      "notallowed","allowed","allowed","allowed","allowed","allowed","allowed","notallowed",
      "notallowed","allowed","allowed","allowed","allowed","allowed","allowed","notallowed",
      "notallowed","notallowed","notallowed","notallowed","notallowed","notallowed","notallowed","notallowed",
    ],
  },
  {
    src: "/img/img4.png",
    allowedTiles: [
      "notallowed","allowed","allowed","allowed","allowed","allowed","allowed","notallowed",
      "notallowed","allowed","allowed","allowed","allowed","allowed","allowed","notallowed",
      "notallowed","allowed","allowed","allowed","allowed","allowed","allowed","notallowed",
      "notallowed","allowed","allowed","allowed","allowed","allowed","allowed","notallowed",
      "notallowed","notallowed","notallowed","notallowed","notallowed","notallowed","notallowed","notallowed",
    ],
  },
  {
    src: "/img/img5.png",
    allowedTiles: [
      "allowed","allowed","allowed","notallowed","notallowed","allowed","allowed","allowed",
      "allowed","allowed","allowed","allowed","allowed","allowed","allowed","allowed",
      "allowed","allowed","allowed","allowed","allowed","allowed","allowed","allowed",
      "allowed","allowed","allowed","allowed","allowed","allowed","allowed","allowed",
      "notallowed","notallowed","notallowed","notallowed","notallowed","notallowed","notallowed","notallowed",
    ],
  },
];

const BOSS_ALLOWED_TILES = [
  "notallowed","allowed","allowed","allowed","allowed","allowed","allowed","notallowed",
  "allowed","allowed","allowed","allowed","allowed","allowed","allowed","allowed",
  "allowed","allowed","allowed","notallowed","notallowed","allowed","allowed","allowed",
  "allowed","allowed","allowed","allowed","allowed","allowed","allowed","allowed",
  "notallowed","allowed","allowed","allowed","allowed","allowed","allowed","notallowed",
];

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export default function GridBoard() {
  const GRID_SIZE = 3;

  const ENTRY_IMAGE = "/img/entry.png";
  const BOSS_POS = { row: 1, col: 1 };
  const BOSS_IMAGE = "/img/boss.png";

  const BOSS_TYPES = ["Dragon", "Necromancer"];
  const BOSS_TOKENS = {
    Dragon: "/img/monsters/dragon.jpg",
    Necromancer: "/img/monsters/necromancer.jpg",
  };

  const [selectedHero, setSelectedHero] = useState(null); // "thief" | "warrior" | "mage"
  const [showHeroModal, setShowHeroModal] = useState(true);
  const [currentHp, setCurrentHp] = useState(null);

  const [bossType, setBossType] = useState("Dragon");
  const [selectedMonster, setSelectedMonster] = useState(null);

  const [selectedTreasure, setSelectedTreasure] = useState(null);

  const [isClient, setIsClient] = useState(false);
  const [difficulty, setDifficulty] = useState("");

  const router = useRouter();

  const MONSTER_DETAILS = {
    "/img/monsters/skeleton.jpg": "/img/monsters/skeleton_details.png",
    "/img/monsters/ghost.jpg": "/img/monsters/ghost_details.png",
    "/img/monsters/wolf.jpg": "/img/monsters/wolf_details.png",
    "/img/monsters/inferno.jpg": "/img/monsters/inferno_details.png",
    "/img/monsters/ooze.jpg": "/img/monsters/ooze_details.png",
    "/img/monsters/dragon.jpg": "/img/monsters/dragon_details.png",
    "/img/monsters/necromancer.jpg": "/img/monsters/necromancer_details.png",
  };

  useEffect(() => setIsClient(true), []);

  useEffect(() => {
    const stored = localStorage.getItem("difficulty") || "";
    setDifficulty(stored);
  }, []);

  const [shuffledRooms, setShuffledRooms] = useState(BASE_ROOMS);

  useEffect(() => {
    setShuffledRooms([...BASE_ROOMS].sort(() => Math.random() - 0.5));
    setBossType(pickRandom(BOSS_TYPES));
  }, []);

  const shuffleRooms = () => {
    setShuffledRooms([...BASE_ROOMS].sort(() => Math.random() - 0.5));
    setBossType(pickRandom(BOSS_TYPES));
  };

  const handleChangeDifficulty = () => {
    router.push("/game/setup");
  };

  const getRoomForPosition = (row, col) => {
    if (row === BOSS_POS.row && col === BOSS_POS.col) {
      return { src: BOSS_IMAGE, allowedTiles: BOSS_ALLOWED_TILES };
    }

    const positions = [
      [0, 0],[0, 1],[0, 2],
      [1, 0],       [1, 2],
      [2, 0],[2, 1],[2, 2],
    ];

    const index = positions.findIndex((p) => p[0] === row && p[1] === col);
    if (index === -1) return null;
    if (!shuffledRooms || shuffledRooms.length === 0) return null;

    return shuffledRooms[index % shuffledRooms.length];
  };

  const hero = useMemo(() => {
    return selectedHero ? HEROES[selectedHero] : null;
  }, [selectedHero]);

  useEffect(() => {
    if (!hero) return;
    if (currentHp === null) setCurrentHp(hero.hp);
  }, [hero, currentHp]);

  const incHp = () => setCurrentHp((v) => (v === null ? 0 : v + 1));
  const decHp = () => setCurrentHp((v) => (v === null ? 0 : Math.max(0, v - 1)));

  const openTreasure = ({ isBoss }) => {
    const pile = pickRandom(LOOT_PILES);
    setSelectedTreasure({ difficulty, pile, isBoss });
  };

  return (
    <div className="min-h-screen p-8 flex flex-col items-center gap-2 bg-gray-900">
      {hero && !showHeroModal && (
        <div className="fixed top-4 right-4 z-40 bg-gray-900 border border-yellow-500 rounded-lg p-3 shadow-xl max-w-xs">
          <div className="flex items-center gap-3">
            <img
              src={hero.img}
              alt={hero.name}
              className="w-12 h-12 object-contain"
            />
            <div className="text-sm text-gray-200">
              <div className="font-bold text-yellow-400">{hero.name}</div>

              <div className="mt-1 flex items-center gap-2">
                <span>HP:</span>
                <button
                  onClick={decHp}
                  className="w-7 h-7 rounded bg-gray-700 hover:bg-gray-600 text-yellow-300 font-bold"
                  aria-label="Decrease HP"
                >
                  -
                </button>
                <span className="min-w-[2ch] text-center">{currentHp ?? hero.hp}</span>
                <button
                  onClick={incHp}
                  className="w-7 h-7 rounded bg-gray-700 hover:bg-gray-600 text-yellow-300 font-bold"
                  aria-label="Increase HP"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <div className="mt-3 text-xs text-gray-200 space-y-2">
            <div>
              <div className="text-gray-400 uppercase tracking-wider text-[10px]">
                Starting Gear
              </div>
              <div className="leading-snug">{hero.gear.join(", ")}</div>
            </div>

            <div>
              <div className="text-gray-400 uppercase tracking-wider text-[10px]">
                Ability
              </div>
              <div className="leading-snug">{hero.ability}</div>
            </div>
          </div>
        </div>
      )}

      {/* Title */}
      <div className="flex flex-col max-w-5xl">
        <h1 className="text-center text-3xl font-extrabold mb-4 text-yellow-400 tracking-widest drop-shadow-2xl">
          LOGIC OF <span className="text-green-400">THE LABYRINTH</span>
        </h1>
        <p className="text-center text-base md:text-lg text-gray-300 italic">
          Below, the labyrinth reveals itself — a board of danger and reward,
          where monsters guard ancient treasures.
        </p>
      </div>

      {/* Entry */}
      <div className="grid grid-cols-3 gap-2 w-full max-w-4xl">
        <div />
        <div className="relative overflow-hidden shadow-2xl rounded-lg border border-gray-700 aspect-[8/5]">
          <SelfVisualization backgroundImage={ENTRY_IMAGE} allowedTiles={null} />
        </div>
        <div />
      </div>

      {/* Rooms */}
      {isClient && (
        <div className="grid grid-cols-3 gap-2 w-full max-w-4xl">
          {[...Array(GRID_SIZE)].map((_, row) =>
            [...Array(GRID_SIZE)].map((_, col) => {
              const isBossRoom = row === BOSS_POS.row && col === BOSS_POS.col;
              const room = getRoomForPosition(row, col);

              if (!room) {
                return (
                  <div
                    key={`${row}-${col}`}
                    className="relative overflow-hidden shadow-2xl border border-gray-700 aspect-[8/5]"
                  />
                );
              }

              return (
                <div
                  key={`${row}-${col}`}
                  className="relative overflow-hidden shadow-2xl border border-gray-700 aspect-[8/5]"
                >
                  {isBossRoom ? (
                    <SelfVisualization
                      backgroundImage={room.src}
                      allowedTiles={BOSS_ALLOWED_TILES}
                      bossMonsterSrc={BOSS_TOKENS[bossType]}
                      onBossClick={(src) => setSelectedMonster(src)}
                      onTreasureClick={() => openTreasure({ isBoss: true })}
                    />
                  ) : (
                    <SelfVisualization
                      backgroundImage={room.src}
                      allowedTiles={room.allowedTiles}
                      onMonsterClick={(src) => setSelectedMonster(src)}
                      onTreasureClick={() => openTreasure({ isBoss: false })}
                    />
                  )}
                </div>
              );
            })
          )}
        </div>
      )}

      {/* Monster Modal */}
      {selectedMonster && (
        <div className="fixed inset-0 bg-opacity-50 bg-blur flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-opacity-50 backdrop-blur-sm"></div>
          <div className="relative bg-gray-900 p-3 shadow-lg flex flex-col items-center z-10">
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

      {/* Treasure Modal (random pile) */}
      {selectedTreasure && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

          <div className="relative bg-gray-900 w-full max-w-md p-6 rounded-xl border-2 border-yellow-500 shadow-2xl z-10">
            <h2 className="text-2xl font-extrabold text-yellow-400 text-center mb-2 tracking-wide">
              Treasure Chest
            </h2>
            <p className="text-center text-gray-400 text-sm mb-4">
              You have discovered a hidden cache of equipment.
            </p>

            <div className="bg-gray-800 rounded-lg p-4 mb-4">
              <p className="text-gray-200 text-center mb-3">
                Draw <span className="text-yellow-400 font-bold">1 card</span> from:
              </p>

              <div className="text-center text-green-400 font-semibold text-lg">
                <span className="text-yellow-400">{selectedTreasure.pile}</span>
              </div>

              {selectedTreasure.isBoss && (
                <div className="mt-2 text-center text-xs text-gray-300">
                  (Boss room treasure)
                </div>
              )}
            </div>

            <div className="bg-red-900/30 border border-red-500 rounded-lg p-3 mb-4">
              <p className="text-red-300 text-sm text-center">
                ⚠ Trap cards are shuffled into all loot piles.
                <br />
                Resolve trap effects immediately when drawn.
              </p>
            </div>

            <div className="text-xs text-gray-400 text-center mb-4 leading-relaxed">
              Inventory limits:
              <br />
              <strong>1</strong> Weapon · <strong>1</strong> Armor ·{" "}
              <strong>3</strong> Consumables
              <br />
              You may swap equipment at the end of the round.
            </div>

            <button
              onClick={() => setSelectedTreasure(null)}
              className="w-full py-3 bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-bold rounded-lg transition-colors"
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {/* Controls */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-2 mb-6">
        <button
          onClick={shuffleRooms}
          className="px-6 py-3 bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-semibold rounded-lg shadow-md transition-colors duration-200"
        >
          Shuffle Labyrinth
        </button>

        <div className="flex items-center gap-4 bg-gray-800 px-4 py-2 rounded-lg shadow-inner">
          <span className="text-gray-200">
            Difficulty:{" "}
            <strong className="text-yellow-400">
              {difficulty || "not set"}
            </strong>
          </span>
          <button
            onClick={handleChangeDifficulty}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-yellow-400 font-medium border border-yellow-400 rounded transition-colors duration-200"
          >
            Change
          </button>
        </div>
      </div>

      {/* HERO START MODAL */}
      {showHeroModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>

          <div className="relative bg-gray-900 p-8 rounded-xl border-2 border-yellow-500 max-w-3xl w-full z-10">
            <h2 className="text-2xl font-extrabold text-yellow-400 text-center mb-2">
              Good day, our brave hero.
            </h2>
            <p className="text-center text-gray-300 mb-6">
              Please choose your character.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {Object.entries(HEROES).map(([key, h]) => (
                <button
                  key={key}
                  onClick={() => {
                    setSelectedHero(key);
                    setCurrentHp(h.hp);
                  }}
                  className={`flex flex-col items-center p-4 rounded-lg border transition ${
                    selectedHero === key
                      ? "border-yellow-400 bg-gray-800"
                      : "border-gray-700 hover:border-yellow-400"
                  }`}
                >
                  <img
                    src={h.img}
                    alt={h.name}
                    className="w-24 h-24 object-contain mb-2"
                  />
                  <span className="text-yellow-300 font-semibold">{h.name}</span>
                </button>
              ))}
            </div>

            {hero && (
              <div className="mt-6 bg-gray-800 p-4 rounded-lg border border-gray-700">
                <h3 className="text-xl text-yellow-400 font-bold mb-2">
                  {hero.name}
                </h3>

                <ul className="text-gray-200 text-sm space-y-1">
                  <li>
                    <strong>Starting HP:</strong> {hero.hp}
                  </li>
                  <li>
                    <strong>Starting Gear:</strong> {hero.gear.join(", ")}
                  </li>
                  <li>
                    <strong>Ability:</strong> {hero.ability}
                  </li>
                </ul>

                <button
                  onClick={() => setShowHeroModal(false)}
                  className="mt-4 w-full py-2 bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-bold rounded-lg"
                >
                  Begin your journey
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <p className="text-center text-sm text-gray-500 italic mt-6 max-w-lg leading-relaxed">
        Shuffle to forge a new labyrinth. Entry and Boss remain fixed.
        <br />
        Monsters appear only on walkable floor tiles.
      </p>
    </div>
  );
}
