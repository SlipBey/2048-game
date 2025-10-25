"use client";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  backColors,
  colors,
  createGame2048,
} from "@/features/game/lib/game2048";

type ChipState = { id: string; x: number; y: number; value: number };

const keyMap: Record<string, "left" | "right" | "up" | "down"> = {
  ArrowLeft: "left",
  ArrowRight: "right",
  ArrowUp: "up",
  ArrowDown: "down",
};

export default function Game2048({
  size,
  boardSizePx,
  started,
  onStarted,
  onEnded,
  onScore,
}: {
  size: number;
  boardSizePx: number;
  started: boolean;
  onStarted: () => void;
  onEnded: () => void;
  onScore: (args: { score: number; scoreInc: number }) => void;
}) {
  const [chips, setChips] = useState<ChipState[]>([]);
  const [animChips, setAnimChips] = useState<ChipState[] | null>(null);
  const [appearingIds, setAppearingIds] = useState<Set<string>>(new Set());
  const [focusable, setFocusable] = useState<HTMLDivElement | null>(null);
  const gameRef = useRef<ReturnType<typeof createGame2048> | null>(null);

  const cellMarginPct = useMemo(() => 100 / (9 * size + 1), [size]);
  const cellSizePct = useMemo(() => 8 * cellMarginPct, [cellMarginPct]);

  const cellSizePx = useMemo(
    () => (cellSizePct / 100) * boardSizePx,
    [cellSizePct, boardSizePx],
  );

  const posPct = useCallback(
    (x: number, y: number) => {
      const left = cellMarginPct + x * (cellSizePct + cellMarginPct);
      const top = cellMarginPct + y * (cellSizePct + cellMarginPct);
      return { left: `${left}%`, top: `${top}%` };
    },
    [cellMarginPct, cellSizePct],
  );

  useEffect(() => {
    if (started) {
      const game = createGame2048(size);
      gameRef.current = game;

      const init = Math.max(2, size - 2);
      const startChips: ChipState[] = [];
      for (let i = init; i > 0; i--) {
        const spawned = game.turn();
        spawned.forEach((c) => {
          const id = `${c.x}-${c.y}-${Math.random()}`;
          startChips.push({ id, x: c.x, y: c.y, value: c.value });
        });
      }
      setChips(startChips);
      setAppearingIds(new Set(startChips.map((c) => c.id)));
      setTimeout(() => setAppearingIds(new Set()), 180);
      onStarted();
      focusable?.focus();
    } else {
      gameRef.current = null;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [started, size]);

  const doMove = useCallback(
    (dir: "left" | "right" | "up" | "down") => {
      const game = gameRef.current;
      if (!game) return;
      const changes = game[dir]();
      if (changes.moves.length === 0) return;

      const nextAnim = chips.map((c) => ({ ...c }));
      for (const mv of changes.moves) {
        const i = nextAnim.findIndex(
          (c) => c.x === mv.from.x && c.y === mv.from.y,
        );
        if (i !== -1) {
          nextAnim[i].x = mv.to.x;
          nextAnim[i].y = mv.to.y;
        }
      }
      setAnimChips(nextAnim);

      if (changes.scoreInc > 0)
        onScore({ score: game.score(), scoreInc: changes.scoreInc });

      const spawnCount = Math.max(1, size - 3);
      setTimeout(() => {
        const rebuilt: ChipState[] = [];
        for (let y = 0; y < size; y++) {
          for (let x = 0; x < size; x++) {
            const v = game.board[y][x];
            if (v) {
              const existing = nextAnim.find(
                (c) => c.x === x && c.y === y && c.value === v,
              );
              const id = existing ? existing.id : `${x}-${y}-${Math.random()}`;
              rebuilt.push({ id, x, y, value: v });
            }
          }
        }

        const newIds: string[] = [];
        for (let i = 0; i < spawnCount; i++) {
          const spawned = game.turn();
          spawned.forEach((c) => {
            const id = `${c.x}-${c.y}-${Math.random()}`;
            rebuilt.push({ id, x: c.x, y: c.y, value: c.value });
            newIds.push(id);
          });
        }

        setChips(rebuilt);
        setAnimChips(null);
        if (newIds.length) {
          const s = new Set(newIds);
          setAppearingIds(s);
          setTimeout(() => setAppearingIds(new Set()), 180);
        }

        if (!game.canMove()) onEnded();
      }, 150);
    },
    [chips, onEnded, onScore, size],
  );

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const d = keyMap[e.key];
      if (!d) return;
      e.preventDefault();
      doMove(d);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [doMove]);

  useEffect(() => {
    const sens = 5;
    let st: Touch | null = null;
    const onStart = (e: TouchEvent) => {
      st = e.touches[0];
      e.preventDefault();
    };
    const onEnd = (e: TouchEvent) => {
      if (!st) return;
      const et = e.changedTouches[0];
      const x = st.clientX - et.clientX;
      const y = st.clientY - et.clientY;
      const mx = Math.abs(x),
        my = Math.abs(y);
      if (mx < sens && my < sens) return;
      const d = mx > my ? (x > 0 ? "left" : "right") : y > 0 ? "up" : "down";
      doMove(d as any);
      st = null;
    };
    const el = focusable ?? document;
    el.addEventListener(
      "touchstart",
      onStart as any,
      { passive: false } as any,
    );
    el.addEventListener("touchend", onEnd as any, { passive: false } as any);
    return () => {
      el.removeEventListener("touchstart", onStart as any);
      el.removeEventListener("touchend", onEnd as any);
    };
  }, [doMove, focusable]);

  const fontSizeForValue = (v: number) => {
    const n = Math.floor(Math.log(v) / Math.log(10));
    const base = Math.floor(cellSizePx / 1.5);
    const coefs = [0.8, 0.65, 0.55, 0.5, 0.44, 0.38, 0.34, 0.3];
    return `${base * (n < 8 ? coefs[n] : coefs[7])}px`;
  };

  const cellsCount = size * size;

  const chipsToRender = animChips ?? chips;

  return (
    <div
      ref={setFocusable}
      tabIndex={1}
      className="board rounded-xl"
      style={{
        width: boardSizePx,
        height: boardSizePx,
        borderRadius: `${7 / size}%`,
      }}
    >
      {Array.from({ length: cellsCount }).map((_, index) => (
        <div
          key={index}
          className="cell"
          style={{
            width: `${cellSizePct}%`,
            height: `${cellSizePct}%`,
            marginLeft: `${cellMarginPct}%`,
            marginTop: `${cellMarginPct}%`,
            borderRadius: "7%",
          }}
        />
      ))}

      {chipsToRender.map((chip) => (
        <div
          key={chip.id}
          className="chip"
          style={{
            ...posPct(chip.x, chip.y),
            width: `${cellSizePct}%`,
            height: `${cellSizePct}%`,
            backgroundColor: backColors[chip.value] || backColors[128],
            color: colors[chip.value] || colors[128],
            fontSize: fontSizeForValue(chip.value),
            transition: "left 140ms ease, top 140ms ease, transform 140ms ease",
            animation: appearingIds.has(chip.id)
              ? "chip-appear 150ms"
              : undefined,
            borderRadius: "7%",
          }}
        >
          {chip.value}
        </div>
      ))}
    </div>
  );
}
