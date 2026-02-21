import type { SortState } from "@/types/filter.types";
import { getNestedValue } from "./filterEngine";

export function sortData<T>(data: T[], sort: SortState): T[] {
  return [...data].sort((a, b) => {
    const va = getNestedValue(a, sort.key) ?? "";
    const vb = getNestedValue(b, sort.key) ?? "";

    let comparison = 0;
    if (typeof va === "number" && typeof vb === "number") {
      comparison = va - vb;
    } else {
      comparison = String(va).localeCompare(String(vb));
    }

    return sort.direction === "asc" ? comparison : -comparison;
  });
}

export function toggleSort(current: SortState, key: string): SortState {
  if (current.key === key) {
    return { key, direction: current.direction === "asc" ? "desc" : "asc" };
  }
  return { key, direction: "asc" };
}
