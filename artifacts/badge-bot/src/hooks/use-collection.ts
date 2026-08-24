import { useCallback, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "badgebot:owned-badges";

function readStoredIds(): string[] {
  if (typeof window === "undefined") return [];

  try {
    const stored = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "[]");
    return Array.isArray(stored)
      ? stored.filter((id): id is string => typeof id === "string")
      : [];
  } catch {
    return [];
  }
}

export function useCollection() {
  const [ownedIds, setOwnedIds] = useState<string[]>(readStoredIds);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(ownedIds));
  }, [ownedIds]);

  const ownedSet = useMemo(() => new Set(ownedIds), [ownedIds]);

  const toggleOwned = useCallback((id: string) => {
    setOwnedIds((current) =>
      current.includes(id)
        ? current.filter((ownedId) => ownedId !== id)
        : [...current, id],
    );
  }, []);

  const markOwned = useCallback((id: string) => {
    setOwnedIds((current) => (current.includes(id) ? current : [...current, id]));
  }, []);

  const markUnowned = useCallback((id: string) => {
    setOwnedIds((current) => current.filter((ownedId) => ownedId !== id));
  }, []);

  const clearCollection = useCallback(() => setOwnedIds([]), []);

  return {
    ownedIds,
    ownedSet,
    ownedCount: ownedIds.length,
    isOwned: (id: string) => ownedSet.has(id),
    toggleOwned,
    markOwned,
    markUnowned,
    clearCollection,
  };
}