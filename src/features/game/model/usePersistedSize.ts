import { useEffect, useState } from "react";
import { loadSize, saveSize } from "./storage";

export function usePersistedSize(defaultSize: number) {
  const [size, setSize] = useState(defaultSize);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const s = loadSize(defaultSize);
    setSize(s);
    setHydrated(true);
  }, [defaultSize]);

  useEffect(() => {
    if (!hydrated) return;
    saveSize(size);
  }, [size, hydrated]);

  return { size, setSize };
}
