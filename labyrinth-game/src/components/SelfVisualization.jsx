"use client";
import { useEffect, useState } from "react";

const SelfVisualization = ({ backgroundImage, allowedTiles }) => {
  const rows = 5;
  const cols = 8;
  const cellSize = 80;
  const strokeWidth = 3;

  const viewWidth = cols * cellSize;
  const viewHeight = rows * cellSize;

  const [monster, setMonster] = useState(null);

  useEffect(() => {
    if (!allowedTiles) return;

    const allowedIndices = allowedTiles
      .map((tile, index) => (tile === "allowed" ? index : null))
      .filter((i) => i !== null);

    if (allowedIndices.length === 0) return;

    // 70% chance to spawn a monster
    if (Math.random() < 0.7) {
      const randomIndex =
        allowedIndices[Math.floor(Math.random() * allowedIndices.length)];

      const row = Math.floor(randomIndex / cols);
      const col = randomIndex % cols;

      const MONSTER_IMAGES = [
        "/img/monsters/monster1.jpg",
        "/img/monsters/monster2.jpg",
        "/img/monsters/monster3.jpg",
        "/img/monsters/monster4.jpg",
        "/img/monsters/monster5.jpg",
        "/img/monsters/monster6.jpg",
        "/img/monsters/monster7.jpg",
      ];

      const src =
        MONSTER_IMAGES[Math.floor(Math.random() * MONSTER_IMAGES.length)];

      setMonster({
        src,
        x: col * cellSize,
        y: row * cellSize,
        size: cellSize,
      });
    }
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

        {monster && (
          <image
            href={monster.src}
            x={monster.x + cellSize * 0.1}
            y={monster.y + cellSize * 0.1}
            width={cellSize * 0.8}
            height={cellSize * 0.8}
            preserveAspectRatio="xMidYMid meet"
          />
        )}
      </svg>
    </div>
  );
};

export default SelfVisualization;
