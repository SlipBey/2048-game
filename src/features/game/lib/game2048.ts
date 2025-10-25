export type Coord = { x: number; y: number };
export type MoveResult = {
  moves: { from: Coord; to: Coord }[];
  consolidations: { x: number; y: number; value: number }[];
  scoreInc: number;
};

export function createGame2048(size = 4) {
  const size2 = size * size;
  let score = 0;
  const board: number[][] = Array.from({ length: size }, () =>
    Array.from({ length: size }, () => 0),
  );

  const cellIsEmpty = (c: Coord) => board[c.y][c.x] === 0;
  const cellsEqual = (c1: Coord, c2: Coord) =>
    board[c1.y][c1.x] === board[c2.y][c2.x];

  function moveChip(cf: Coord, ct: Coord) {
    const tWasEmpty = cellIsEmpty(ct);
    const v = (board[ct.y][ct.x] += board[cf.y][cf.x]);
    board[cf.y][cf.x] = 0;
    return tWasEmpty ? 0 : v;
  }

  function findRandomEmptyPos(): (Coord & { value: number }) | null {
    let r = Math.floor(Math.random() * size2);
    const c: Coord = { x: 0, y: 0 };
    for (let i = size2; i > 0; i--) {
      c.y = Math.floor(r / size);
      c.x = r % size;
      if (cellIsEmpty(c)) return { ...c, value: 0 };
      r++;
      if (r === size2) r = 0;
    }
    return null;
  }

  const rot0 = (c: Coord, x: number, y: number) => {
    c.x = x;
    c.y = y;
  };
  const rot90 = (c: Coord, x: number, y: number) => {
    c.x = y;
    c.y = x;
  };
  const rot180 = (c: Coord, x: number, y: number) => {
    c.x = size - 1 - x;
    c.y = y;
  };
  const rot270 = (c: Coord, x: number, y: number) => {
    c.x = y;
    c.y = size - 1 - x;
  };

  function move(rot: (c: Coord, x: number, y: number) => void): MoveResult {
    let scoreInc = 0;
    const moves: { from: Coord; to: Coord }[] = [];
    const consolidations: { x: number; y: number; value: number }[] = [];
    const c: Coord = { x: 0, y: 0 };
    const tc: Coord = { x: 0, y: 0 };
    for (let y = 0; y < size; y++) {
      let s = size;
      for (let x = size - 2; x >= 0; x--) {
        rot(c, x, y);
        if (!cellIsEmpty(c)) {
          let tx = x;
          while (tx + 1 < s) {
            rot(tc, tx + 1, y);
            if (!cellIsEmpty(tc)) {
              if (cellsEqual(c, tc)) {
                tx++;
                s = tx;
              }
              break;
            }
            tx++;
          }
          if (x !== tx) {
            rot(tc, tx, y);
            const v = moveChip(c, tc);
            moves.push({ from: { x: c.x, y: c.y }, to: { x: tc.x, y: tc.y } });
            if (v > 0) {
              consolidations.push({ x: tc.x, y: tc.y, value: v });
              scoreInc += v;
              score += v;
            }
          }
        }
      }
    }
    return { moves, consolidations, scoreInc };
  }

  return {
    size,
    board,
    score: () => score,
    turn: () => {
      const chips: (Coord & { value: number })[] = [];
      const p = findRandomEmptyPos();
      if (p) {
        const rnd = Math.random();
        const v = rnd > 0.8 ? 4 : 2;
        p.value = v;
        board[p.y][p.x] = v;
        chips.push(p);
      }
      return chips;
    },
    right: () => move(rot0),
    down: () => move(rot90),
    left: () => move(rot180),
    up: () => move(rot270),
    canMove: () => {
      const c: Coord = { x: 0, y: 0 };
      const cr: Coord = { x: 0, y: 0 };
      const cb: Coord = { x: 0, y: 1 };
      for (c.y = 0, cr.y = 0, cb.y = 1; c.y < size; c.y++, cr.y++, cb.y++)
        for (c.x = 0, cr.x = 1, cb.x = 0; c.x < size; c.x++, cr.x++, cb.x++) {
          if (
            cellIsEmpty(c) ||
            (cr.x < size && cellsEqual(c, cr)) ||
            (cb.y < size && cellsEqual(c, cb))
          )
            return true;
        }
      return false;
    },
  };
}

export const backColors: Record<number, string> = {
  2: "#e0e0e0",
  4: "#e0e0c0",
  8: "#f2b179",
  16: "#f59563",
  32: "#f67c5f",
  64: "#f65e3b",
  128: "#edcf72",
};

export const colors: Record<number, string> = {
  2: "#ec9050",
  4: "#ec9050",
  8: "#f9f6f2",
  16: "#f9f6f2",
  32: "#f9f6f2",
  64: "#f9f6f2",
  128: "#f9f6f2",
};
