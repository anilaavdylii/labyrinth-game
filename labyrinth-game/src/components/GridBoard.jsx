"use client";

import SelfVisualization from "./SelfVisualization";

export default function GridBoard() {
  const GRID_SIZE = 3;

  const ENTRY_IMAGE = "/img/entry.png";
  const BOSS_POS = { row: 1, col: 1 };

  const ROOM_IMAGES = [
    {
      src: "/img/img1.png",
      allowedTiles: [
        // Row 0 (Top)
        "notallowed",
        "allowed",
        "allowed",
        "allowed",
        "allowed",
        "allowed",
        "allowed",
        "notallowed",

        // Row 1
        "notallowed",
        "allowed",
        "notallowed",
        "allowed",
        "allowed",
        "notallowed",
        "allowed",
        "notallowed",

        // Row 2
        "notallowed",
        "allowed",
        "allowed",
        "allowed",
        "allowed",
        "allowed",
        "allowed",
        "notallowed",

        // Row 3
        "notallowed",
        "allowed",
        "notallowed",
        "allowed",
        "allowed",
        "notallowed",
        "allowed",
        "notallowed",

        // Row 4 (Bottom)
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
        // Row 0 (Top) - Dark tile in the first and last columns
        "notallowed",
        "allowed",
        "allowed",
        "allowed",
        "allowed",
        "allowed",
        "allowed",
        "notallowed",

        // Row 1 - Only the rightmost column is a wall
        "allowed",
        "allowed",
        "allowed",
        "allowed",
        "allowed",
        "allowed",
        "allowed",
        "notallowed",

        // Row 2 - Only the rightmost column is a wall
        "allowed",
        "allowed",
        "allowed",
        "allowed",
        "allowed",
        "allowed",
        "allowed",
        "notallowed",

        // Row 3 - Only the rightmost column is a wall
        "allowed",
        "allowed",
        "allowed",
        "allowed",
        "allowed",
        "allowed",
        "allowed",
        "notallowed",

        // Row 4 (Bottom) - Entire bottom row is dark tiles/walls
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
        // Row 0: Top-left and top-right are walls
        "notallowed",
        "allowed",
        "allowed",
        "allowed",
        "allowed",
        "allowed",
        "allowed",
        "notallowed",
        // Row 1: Only the right column is a wall
        "allowed",
        "allowed",
        "allowed",
        "allowed",
        "allowed",
        "allowed",
        "allowed",
        "notallowed",
        // Row 2: Only the right column is a wall
        "allowed",
        "allowed",
        "allowed",
        "allowed",
        "allowed",
        "allowed",
        "allowed",
        "notallowed",
        // Row 3: Only the right column is a wall
        "allowed",
        "allowed",
        "allowed",
        "allowed",
        "allowed",
        "allowed",
        "allowed",
        "notallowed",
        // Row 4: Entire bottom row is walls
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
        // Row 0
        "notallowed",
        "allowed",
        "allowed",
        "allowed",
        "allowed",
        "allowed",
        "allowed",
        "notallowed",
        // Row 1
        "allowed",
        "allowed",
        "allowed",
        "allowed",
        "allowed",
        "allowed",
        "allowed",
        "notallowed",
        // Row 2
        "allowed",
        "allowed",
        "allowed",
        "allowed",
        "allowed",
        "allowed",
        "allowed",
        "notallowed",
        // Row 3
        "allowed",
        "allowed",
        "allowed",
        "allowed",
        "allowed",
        "allowed",
        "allowed",
        "notallowed",
        // Row 4
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

  const MONSTER_IMAGES = [
    "/img/monsters/monster1.jpg",
    "/img/monsters/monster2.jpg",
    "/img/monsters/monster3.jpg",
    "/img/monsters/monster4.jpg",
    "/img/monsters/monster5.jpg",
    "/img/monsters/monster6.jpg",
    "/img/monsters/monster7.jpg",
  ];

  const TILE_IMAGES = {
    boss: "/img/boss.png",
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
      "allowed",
      "allowed",
      "allowed",
      "notallowed",
      "notallowed",
      "notallowed",
      "notallowed",
      "allowed",
      "allowed",
      "allowed",
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
      "notallowed",
    ],
  };

  const getTileType = (row, col) => {
    if (row === BOSS_POS.row && col === BOSS_POS.col) return "boss";
    return "room";
  };

  const getTileImage = (row, col) => {
    const type = getTileType(row, col);
    if (type === "room") {
      const index = (row * GRID_SIZE + col) % ROOM_IMAGES.length;
      return ROOM_IMAGES[index].src;
    }
    return TILE_IMAGES[type];
  };

  const getRandomAllowedPosition = (allowedTiles) => {
    const allowedIndices = allowedTiles
      .map((tile, index) => (tile === "allowed" ? index : -1))
      .filter((i) => i !== -1);

    if (allowedIndices.length === 0) return null;

    const randomIndex =
      allowedIndices[Math.floor(Math.random() * allowedIndices.length)];
    const gridRow = Math.floor(randomIndex / 8); // 0 to 4
    const gridCol = randomIndex % 8; // 0 to 7

    // Exact center of the chosen grid cell
    const top = (gridRow + 0.5) * (100 / 5); // 10%, 30%, 50%, 70%, 90%
    const left = (gridCol + 0.5) * (100 / 8); // 6.25%, 18.75%, ..., 93.75%

    return { top: `${top}%`, left: `${left}%` };
  };

  const getRandomAllowedCell = (allowedTiles) => {
    const COLS = 8;
    const CELL_SIZE = 80;

    const allowedIndices = allowedTiles
      .map((tile, index) => (tile === "allowed" ? index : null))
      .filter((v) => v !== null);

    if (!allowedIndices.length) return null;

    const index =
      allowedIndices[Math.floor(Math.random() * allowedIndices.length)];

    const row = Math.floor(index / COLS);
    const col = index % COLS;

    return {
      x: col * CELL_SIZE,
      y: row * CELL_SIZE,
      size: CELL_SIZE,
    };
  };

  return (
    <div className="min-h-screen p-8 flex flex-col items-center gap-2 bg-gray-900">
      <div className="flex flex-col flex-1 max-w-5xl">
        <h1 className="text-center text-xl font-extrabold mb-3 text-yellow-400 tracking-widest drop-shadow-lg">
          LOGIC OF <span className="text-green-400">THE LABYRINTH</span>
        </h1>
        <p className="text-center text-sm md:text-base text-gray-300 italic">
          Below, the labyrinth reveals itself - a board of danger and reward,
          where monsters guard ancient treasures.
        </p>
      </div>

      <div className="relative w-full flex flex-col items-center gap-2">
        <div className="flex w-full max-w-5xl">
          <div className="flex-1 invisible" />

          <div className="relative flex-1 overflow-hidden shadow-2xl  border border-gray-700">
            <SelfVisualization backgroundImage={ENTRY_IMAGE} />
          </div>

          <div className="flex-1 invisible" />
        </div>
        <div className="flex flex-col w-full max-w-5xl">
          {[...Array(GRID_SIZE)].map((_, row) => (
            <div key={row} className="flex w-full gap-4">
              {[...Array(GRID_SIZE)].map((_, col) => {
                const type = getTileType(row, col);
                const index = (row * GRID_SIZE + col) % ROOM_IMAGES.length;
                const roomData = ROOM_IMAGES[index];

                const imageSrc =
                  type === "boss" ? TILE_IMAGES.boss : roomData.src;

                // Monster logic (ONE system only)
                const hasMonster = type === "room" && Math.random() < 0.7;

                const monster =
                  hasMonster && roomData.allowedTiles
                    ? {
                        src: MONSTER_IMAGES[
                          Math.floor(Math.random() * MONSTER_IMAGES.length)
                        ],
                        ...getRandomAllowedCell(roomData.allowedTiles),
                      }
                    : null;

                return (
                  <div
                    key={`${row}-${col}`}
                    className="relative  overflow-hidden shadow-2xl rounded-lg border border-gray-700"
                  >
                    <SelfVisualization
                      backgroundImage={imageSrc}
                      allowedTiles={roomData.allowedTiles}
                    />
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
      <p className="text-center text-xs text-gray-400 italic mt-1">
        If by any chance a treasure or monster appears in a wall, just refresh
        the page.
      </p>
    </div>
  );
}
