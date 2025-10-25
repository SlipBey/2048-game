"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Game2048 } from "@/features/game";
import { SizeSelector } from "@/features/game/ui/SizeSelector";
import { ScoreBoard } from "@/features/game/ui/ScoreBoard";
import { LoseOverlay } from "@/features/game/ui/LoseOverlay";
import { useBestScores } from "@/features/game/model/useBestScores";
import { usePersistedSize } from "@/features/game/model/usePersistedSize";
import { toast } from "react-toastify";
import Link from "next/link";

const defBoardSizePx = 420;
const sizeAimMap: Record<number, number> = {
  3: 256,
  4: 2048,
  5: 4096,
  6: 8192,
};

export default function Page() {
  const [boardSizePx, setBoardSizePx] = useState(defBoardSizePx);
  const { size, setSize } = usePersistedSize(4);
  const sizes = useMemo(() => Object.keys(sizeAimMap).map(Number), []);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);
  const [score, setScore] = useState(0);
  const [scoreInc, setScoreInc] = useState<number | "">("");
  const { best, updateIfBetter } = useBestScores({ 3: 0, 4: 0, 5: 0, 6: 0 });

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth < defBoardSizePx * 1.04)
        setBoardSizePx(Math.floor(window.innerWidth * 0.96));
      else setBoardSizePx(defBoardSizePx);
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    setGameEnded(false);
  }, [size]);

  useEffect(() => {
    if (gameEnded) toast.error("Oyun bitti");
  }, [gameEnded]);

  const onScore = (args: { score: number; scoreInc: number }) => {
    setScore(() => args.score);
    setScoreInc(args.scoreInc);
    setTimeout(() => setScoreInc(""), 350);
    updateIfBetter(size, args.score);
  };

  return (
    <div className="min-h-screen flex items-start justify-center py-6">
      <div className="appearing" style={{ width: boardSizePx }}>
        <div
          className="flex items-center justify-between"
          style={{ height: boardSizePx * 0.2 }}
        >
          <ScoreBoard
            score={score}
            scoreInc={scoreInc}
            best={best[size] ?? 0}
            boardSizePx={boardSizePx}
            started={gameStarted}
            onToggleStart={() => {
              if (gameStarted) {
                setGameStarted(false);
              } else {
                setScore(0);
                setGameEnded(false);
                setGameStarted(true);
              }
            }}
          />
        </div>

        {!gameStarted && (
          <SizeSelector sizes={sizes} size={size} onChange={setSize} />
        )}

        <div
          className="relative"
          style={{ width: boardSizePx, height: boardSizePx }}
        >
          <LoseOverlay
            boardSizePx={boardSizePx}
            visible={gameEnded}
            onRetry={() => setGameStarted(true)}
          />
          <Game2048
            size={size}
            boardSizePx={boardSizePx}
            started={gameStarted}
            onStarted={() => setGameStarted(true)}
            onEnded={() => {
              setGameStarted(false);
              setGameEnded(true);
            }}
            onScore={onScore}
          />
        </div>

        <div className="mt-5 text-center text-gray-300 text-[15px] font-bold">
          Copyright © {new Date().getFullYear()} All rights reserved. <br />
          Made with ❤️ by{" "}
          <Link
            href="https://slip.slipyme.com"
            className="text-blue-500 no-underline"
            target="_blank"
          >
            SlipBey
          </Link>
          .
        </div>
      </div>
    </div>
  );
}
