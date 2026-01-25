"use client";
import { useEffect, useState } from "react";

const SelfVisualization = ({
  backgroundImage,
  allowedTiles,
  onMonsterClick,
  onTreasureClick,
  bossMonsterSrc = null,
  onBossClick,
  maxTreasuresOverride = null,
}) => {
  const rows = 5;
  const cols = 8;
  const cellSize = 80;
  const strokeWidth = 3;

  const viewWidth = cols * cellSize;
  const viewHeight = rows * cellSize;

  const [monsters, setMonsters] = useState([]);
  const [treasures, setTreasures] = useState([]);
  const [bossMonster, setBossMonster] = useState(null);

  useEffect(() => {
    // Entry tile / rooms without allowedTiles
    if (!allowedTiles) {
      setMonsters([]);
      setTreasures([]);
      setBossMonster(null);
      return;
    }

    const difficulty = localStorage.getItem("difficulty") || "normal";

    const allowedIndices = allowedTiles
      .map((tile, index) => (tile === "allowed" ? index : null))
      .filter((i) => i !== null);

    if (allowedIndices.length === 0) {
      setMonsters([]);
      setTreasures([]);
      setBossMonster(null);
      return;
    }

    // === BOSS ROOM ===
    if (bossMonsterSrc) {
      const usedIndices = new Set();

      const bossIndex =
        allowedIndices[Math.floor(Math.random() * allowedIndices.length)];
      usedIndices.add(bossIndex);

      const bossRow = Math.floor(bossIndex / cols);
      const bossCol = bossIndex % cols;

      setBossMonster({
        src: bossMonsterSrc,
        x: bossCol * cellSize,
        y: bossRow * cellSize,
        size: cellSize,
      });

      setMonsters([]);

      const TREASURE_IMAGE = "/img/treasure.jpg";
      const maxTreasures =
        maxTreasuresOverride !== null ? maxTreasuresOverride : 1;

      const treasureIndices = allowedIndices.filter((i) => !usedIndices.has(i));
      const newTreasures = [];
      const treasureSet = new Set();

      while (
        newTreasures.length < Math.min(maxTreasures, treasureIndices.length)
      ) {
        const randomIndex =
          treasureIndices[Math.floor(Math.random() * treasureIndices.length)];
        if (treasureSet.has(randomIndex)) continue;
        treasureSet.add(randomIndex);

        const row = Math.floor(randomIndex / cols);
        const col = randomIndex % cols;

        newTreasures.push({
          src: TREASURE_IMAGE,
          x: col * cellSize,
          y: row * cellSize,
          size: cellSize,
        });
      }

      setTreasures(newTreasures);
      return;
    }

    // === NORMAL ROOM ===
    setBossMonster(null);

    const MONSTER_IMAGES = [
      "/img/monsters/skeleton.jpg",
      "/img/monsters/ghost.jpg",
      "/img/monsters/wolf.jpg",
      "/img/monsters/inferno.jpg",
      "/img/monsters/ooze.jpg",
    ];

    let numMonsters = 1;
    if (difficulty === "hard") {
       const r = Math.random();
       if (r < 0.6) numMonsters = 2;
       else if (r < 0.85) numMonsters = 1;
       else numMonsters = 1;
       numMonsters = Math.min(numMonsters, allowedIndices.length);
    }

    const usedIndices = new Set();
    const newMonsters = [];

    while (newMonsters.length < numMonsters) {
      const randomIndex =
        allowedIndices[Math.floor(Math.random() * allowedIndices.length)];
      if (usedIndices.has(randomIndex)) continue;
      usedIndices.add(randomIndex);

      const row = Math.floor(randomIndex / cols);
      const col = randomIndex % cols;

      const src =
        MONSTER_IMAGES[Math.floor(Math.random() * MONSTER_IMAGES.length)];

      newMonsters.push({
        src,
        x: col * cellSize,
        y: row * cellSize,
        size: cellSize,
      });
    }

    setMonsters(newMonsters);

    const TREASURE_IMAGE = "/img/treasure.jpg";

    let maxTreasures = 1;
    if (difficulty === "normal") maxTreasures = 1;
    if (difficulty === "hard") maxTreasures = 1;

    const treasureIndices = allowedIndices.filter((i) => !usedIndices.has(i));
    const newTreasures = [];
    const treasureSet = new Set();

    while (
      newTreasures.length < Math.min(maxTreasures, treasureIndices.length)
    ) {
      const randomIndex =
        treasureIndices[Math.floor(Math.random() * treasureIndices.length)];
      if (treasureSet.has(randomIndex)) continue;
      treasureSet.add(randomIndex);

      const row = Math.floor(randomIndex / cols);
      const col = randomIndex % cols;

      newTreasures.push({
        src: TREASURE_IMAGE,
        x: col * cellSize,
        y: row * cellSize,
        size: cellSize,
      });
    }

    setTreasures(newTreasures);
  }, [allowedTiles, bossMonsterSrc, maxTreasuresOverride]);

  return (
    <div
      className="w-full h-full"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${viewWidth} ${viewHeight}`}
        preserveAspectRatio="xMidYMid meet"
      >
        {[...Array(rows)]
          .map((_, row) =>
            [...Array(cols)].map((_, col) => (
              <rect
                key={`${row}-${col}`}
                x={col * cellSize}
                y={row * cellSize}
                width={cellSize}
                height={cellSize}
                fill="none"
                stroke="#000000"
                strokeWidth={strokeWidth}
              />
            ))
          )
          .flat()}

        {bossMonster && (
          <image
            href={bossMonster.src}
            x={bossMonster.x + cellSize * 0.1}
            y={bossMonster.y + cellSize * 0.1}
            width={cellSize * 0.8}
            height={cellSize * 0.8}
            preserveAspectRatio="xMidYMid meet"
            style={{ cursor: "pointer" }}
            onClick={() => onBossClick && onBossClick(bossMonster.src)}
          />
        )}

        {monsters.map((monster, i) => (
          <image
            key={`m-${i}`}
            href={monster.src}
            x={monster.x + cellSize * 0.1}
            y={monster.y + cellSize * 0.1}
            width={cellSize * 0.8}
            height={cellSize * 0.8}
            preserveAspectRatio="xMidYMid meet"
            style={{ cursor: "pointer" }}
            onClick={() => onMonsterClick && onMonsterClick(monster.src)}
          />
        ))}

        {treasures.map((treasure, i) => (
          <image
            key={`t-${i}`}
            href={treasure.src}
            x={treasure.x + cellSize * 0.2}
            y={treasure.y + cellSize * 0.2}
            width={cellSize * 0.6}
            height={cellSize * 0.6}
            preserveAspectRatio="xMidYMid meet"
            style={{ cursor: "pointer" }}
            onClick={() => onTreasureClick && onTreasureClick(treasure.src)}
          />
        ))}
      </svg>

      {/* Dice UI */}
      <div className="fixed bottom-20 right-4 z-40 flex items-center gap-2">
        <button
          onClick={rollDice}
          className="w-12 h-12 rounded-full border-2 border-yellow-500 bg-gray-900 shadow-xl
                     flex items-center justify-center hover:bg-gray-800 transition"
          title="Roll 1–3"
        >
          🎲
        </button>
        <div
          className="w-12 h-12 rounded-lg border-2 border-yellow-500 bg-gray-900 shadow-xl
                     flex items-center justify-center text-yellow-300 font-bold text-lg"
        >
          {diceValue ?? "—"}
        </div>
      </div>
    </div>
  );
};

export default SelfVisualization;
