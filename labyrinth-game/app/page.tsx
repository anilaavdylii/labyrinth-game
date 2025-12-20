"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Button from "../src/components/Button";

export default function Home() {
  const router = useRouter();

  const handleButtonClick = () => {
    router.push("/game/setup");
  };

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800 text-white font-sans p-6">
      <div className="text-center mb-10">
        <h1 className="text-5xl font-bold text-yellow-400">
          Logic of the Labyrinth
        </h1>
        <p className="text-lg text-gray-300 mt-2">Think. Program. Survive.</p>
      </div>
      <Button className="" onClick={handleButtonClick}>
        Start Adventure
      </Button>
    </div>
  );
}
