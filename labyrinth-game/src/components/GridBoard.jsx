"use client";

export default function GridBoard() {
  const ROOMS = [
    "/img/entrance1.png",
    "/img/entrance2.png",
    "/img/img3.png",
    "/img/img4.png",
    "/img/img5.png",
    "/img/img6.png",
    "/img/img7.png",
    "/img/img8.png",
    "/img/img11.png",
    "/img/img12.png",
    "/img/boss1.png",
    "/img/boss2.png",
    "/img/img13.png",
    "/img/img14.png",
  ];

  const monster = {
    row: 2, // 0 = top row, 1 = middle, 2 = bottom
    col: 3, // 0 to 5
    img: "/img/monsters/monster1.png", // your monster
  };

  // Map grid position to room image
  const getRoomImage = (row, col) => {
    if (row === 0) return col === 2 ? ROOMS[0] : col === 3 ? ROOMS[1] : null;
    if (row === 1) return ROOMS[2 + col];
    if (row === 2) return ROOMS[8 + col];
    return null;
  };

  return (
    <div className="min-h-screen bg-black p-8">
      <h1 className="text-center text-5xl font-bold mb-10 text-green-400 font-mono tracking-widest">
        LABYRINTH LOGIC
      </h1>

      <div className="flex justify-center">
        <div className="grid grid-rows-3 gap-4">
          {[0, 1, 2].map((row) => (
            <div key={row} className="grid grid-cols-6 gap-4">
              {[0, 1, 2, 3, 4, 5].map((col) => {
                const roomImg = getRoomImage(row, col);
                const hasMonster = row === monster.row && col === monster.col;

                return (
                  <div key={`${row}-${col}`} className="relative w-64 h-64">
                    {roomImg ? (
                      <>
                        {/* Room Tile */}
                        <img
                          src={roomImg}
                          alt={`Room ${row}-${col}`}
                          className="w-full h-full object-cover rounded-2xl border-8 border-green-900 shadow-2xl"
                        />

                        {/* Monster Overlay */}
                        {hasMonster && (
                          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <img
                              src={monster.img}
                              alt="Monster"
                              className="w-48 h-48 object-contain drop-shadow-2xl animate-pulse"
                            />
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="w-64 h-64" />
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
