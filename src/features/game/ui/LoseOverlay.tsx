import React from "react";

export function LoseOverlay({
  boardSizePx,
  visible,
  onRetry,
}: {
  boardSizePx: number;
  visible: boolean;
  onRetry: () => void;
}) {
  if (!visible) return null;
  return (
    <>
      <div className="overlay half-white appearing07 absolute inset-0" />
      <div className="overlay appearing absolute inset-0 flex items-center justify-center">
        <div
          className="text-center font-bold"
          style={{ fontSize: boardSizePx / 6 }}
        >
          <p>Kaybettiniz</p>
          <button
            className="mt-4 px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xl"
            onClick={onRetry}
          >
            Yeniden Oyna
          </button>
        </div>
      </div>
    </>
  );
}
