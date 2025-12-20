import React from "react";
import Button from "../../src/components/Button";
import { useRouter } from "next/navigation";

export default function GamePage() {
  const router = useRouter();

  return (
    <div className="text-center mb-10">
      <h1 className="text-3xl font-bold mb-4">Welcome to the Game</h1>
      <Button onClick={() => router.push("/game/setup")}>Start Setup</Button>
    </div>
  );
}
