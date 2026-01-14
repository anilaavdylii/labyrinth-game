"use client";
import { useEffect, useState } from "react";

const SelfVisualization = ({
  backgroundImage,
  allowedTiles,
  onMonsterClick,
  onTreasureClick,
}) => {
  const rows = 5;
  const cols = 8;
  const cellSize = 80;
  const strokeWidth = 3;

  const viewWidth = cols * cellSize;
  const viewHeight = rows * cellSize;

  const [monsters, setMonsters] = useState([]);
  const [treasures, setTreasures] = useState([]);

  useEffect(() => {
    if (!allowedTiles) return;

    const difficulty = localStorage.getItem("difficulty") || "normal";

    const allowedIndices = allowedTiles
      .map((tile, index) => (tile === "allowed" ? index : null))
      .filter((i) => i !== null);

    // Boss must always spawn -> fallback: allow every tile if none are allowed
    if (allowedIndices.length === 0 && bossMonsterSrc) {
      allowedIndices = [...Array(rows * cols).keys()];
    }

    if (allowedIndices.length === 0) {
      setMonsters([]);
      setTreasures([]);
      setBossMonster(null);
      return;
    }


    // --- MONSTERS ---
    const MONSTER_IMAGES = [
      "/img/monsters/monster1.jpg",
      "/img/monsters/monster2.jpg",
      "/img/monsters/monster3.jpg",
      "/img/monsters/monster4.jpg",
      "/img/monsters/monster5.jpg",
      "/img/monsters/monster6.jpg",
      "/img/monsters/monster7.jpg",
      "/img/monsters/monster8.jpg",
      "/img/monsters/monster9.jpg",
      "/img/monsters/monster10.jpg",
    ];

    let numMonsters = 1;
    if (difficulty === "hard") {
      numMonsters =
        1 + Math.floor(Math.random() * Math.min(3, allowedIndices.length));
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
    const maxTreasures = 1;

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
  }, [allowedTiles]);

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
    </div>
  );
};

export default SelfVisualization;
