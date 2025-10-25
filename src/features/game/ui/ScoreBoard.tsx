import React from "react";

export function ScoreBoard({
  score,
  scoreInc,
  best,
  boardSizePx,
  onToggleStart,
  started,
}: {
  score: number;
  scoreInc: number | "";
  best: number;
  boardSizePx: number;
  started: boolean;
  onToggleStart: () => void;
}) {
  return (
    <div className="flex w-full font-bold items-stretch gap-2 text-gray-300">
      <div className="relative bg-gray-800 rounded-xl w-1/2 pt-2 text-center">
        <div className="text-white text-sm">Skor</div>
        <div className="text-2xl">
          {score}
          {scoreInc !== "" && (
            <span
              className="absolute left-0 w-full text-gray-700"
              style={{ animation: "up-disappear 1.5s" }}
            >
              +{scoreInc}
            </span>
          )}
        </div>
      </div>
      <div className="bg-gray-800 rounded-xl w-1/2 pt-2 text-center">
        <div className="text-white text-sm">Toplam</div>
        <div className="text-2xl">{best}</div>
      </div>
      <button
        className="bg-gray-800 rounded-xl font-bold px-4 hover:bg-gray-700"
        style={{ fontSize: `${boardSizePx / 450}em` }}
        onClick={onToggleStart}
      >
        {started ? "Bitir" : "Başlat"}
      </button>
    </div>
  );
}
