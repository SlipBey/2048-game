export type BestScores = Record<number, number>;

const BEST_SCORES_KEY = "bestScores";
const SIZE_KEY = "gameSize";

export function loadBestScores(defaults: BestScores): BestScores {
  if (typeof window === "undefined") return defaults;
  try {
    const raw = localStorage.getItem(BEST_SCORES_KEY);
    if (!raw) return defaults;
    const parsed = JSON.parse(raw);
    return typeof parsed === "object" && parsed
      ? { ...defaults, ...parsed }
      : defaults;
  } catch {
    return defaults;
  }
}

export function saveBestScores(scores: BestScores) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(BEST_SCORES_KEY, JSON.stringify(scores));
  } catch {}
}

export function loadSize(fallback: number): number {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(SIZE_KEY);
    const n = raw ? Number(raw) : NaN;
    return Number.isFinite(n) && n >= 3 && n <= 6 ? n : fallback;
  } catch {
    return fallback;
  }
}

export function saveSize(size: number) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(SIZE_KEY, String(size));
  } catch {}
}
