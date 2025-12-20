"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "../../../src/components/Button";
import Select from "../../../src/components/Select";

export default function SetupPage() {
  const router = useRouter();
  const [difficulty, setDifficulty] = useState("");

  const handleStart = () => {
    if (!difficulty) return;
    router.push("/game/board");
  };

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800 text-white px-6">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-yellow-400 mb-2">
          Prepare the Labyrinth
        </h1>
        <p className="text-gray-300">
          Choose how dangerous this adventure will be.
        </p>
      </div>

      <div className="bg-gray-900/50 border border-yellow-500/40 rounded-xl p-6 w-full max-w-sm shadow-lg mb-6">
        <Select
          label="Difficulty"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          options={[
            { value: "", label: "Select difficulty" },
            { value: "easy", label: "Easy" },
            { value: "normal", label: "Normal" },
            { value: "hard", label: "Hard" },
          ]}
        />
      </div>

      <Button
        onClick={handleStart}
        disabled={!difficulty}
        className={`px-8 py-3 text-lg ${
          !difficulty ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        Generate Labyrinth
      </Button>
    </div>
  );
}
