import { useEffect, useState } from "react";
import type { BestScores } from "./storage";
import { loadBestScores, saveBestScores } from "./storage";

export function useBestScores(initial: BestScores) {
  const [best, setBest] = useState<BestScores>(initial);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const loaded = loadBestScores(initial);
    setBest(loaded);
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    saveBestScores(best);
  }, [best, hydrated]);

  const updateIfBetter = (size: number, score: number) => {
    setBest((prev) =>
      score > (prev[size] ?? 0) ? { ...prev, [size]: score } : prev,
    );
  };

  return { best, setBest, updateIfBetter, hydrated };
}
