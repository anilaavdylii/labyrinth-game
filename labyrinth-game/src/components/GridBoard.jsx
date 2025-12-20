"use client";

export default function GridBoard() {
  const GRID_SIZE = 3; // inner 3x3 grid

  const ENTRY_IMAGE = "/img/entry.png";
  const BOSS_POS = { row: 1, col: 1 }; // center of 3x3 grid
  const monster = { row: 2, col: 1, img: "/img/monsters/monster1.png" };

  const ROOM_IMAGES = [
    "/img/img1.png",
    "/img/img2.png",
    "/img/img3.png",
    "/img/img4.png",
    "/img/img5.png",
  ];
  const TILE_IMAGES = { boss: "/img/boss.png" };

  const getTileType = (row, col) => {
    if (row === BOSS_POS.row && col === BOSS_POS.col) return "boss";
    return "room";
  };

  const getTileImage = (row, col) => {
    const type = getTileType(row, col);
    if (type === "room") {
      const index = (row * GRID_SIZE + col) % ROOM_IMAGES.length;
      return ROOM_IMAGES[index];
    }
    return TILE_IMAGES[type];
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black p-8 flex flex-col items-center">
      {/* Stylish Title */}
      <h1 className="text-center text-xl font-extrabold mb-12 text-yellow-400 tracking-widest drop-shadow-lg">
        LOGIC OF <span className="text-green-400">THE LABYRINTH</span>
      </h1>

      {/* Entry + Grid */}
      <div className="relative w-full max-w-3xl flex flex-col items-center ">
        {/* Entry Image */}
        <div className="mx-auto ">
          <img
            src={ENTRY_IMAGE}
            alt="entry"
            className="h-36 md:h-44 object-cover "
          />
        </div>

        {/* Inner Grid */}
        <div className="grid grid-rows-3 w-full">
          {[...Array(GRID_SIZE)].map((_, row) => (
            <div key={row} className="grid grid-cols-3 ">
              {[...Array(GRID_SIZE)].map((_, col) => {
                const type = getTileType(row, col);
                const imageSrc = getTileImage(row, col);
                const hasMonster = row === monster.row && col === monster.col;

                return (
                  <div
                    key={`${row}-${col}`}
                    className="relative h-36 md:h-44 flex items-center justify-center overflow-hidden shadow-xl"
                  >
                    <img
                      src={imageSrc}
                      alt={type}
                      className="w-full h-full object-cover"
                    />

                    {hasMonster && (
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <img
                          src={monster.img}
                          alt="Monster"
                          className="w-20 md:w-24 h-20 md:h-24 animate-pulse drop-shadow-2xl"
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
