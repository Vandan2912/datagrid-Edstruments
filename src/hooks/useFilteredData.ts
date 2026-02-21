import { useMemo, useState } from "react";
import type { FilterCondition, SortState } from "@/types/filter.types";
import { filterData } from "@/engine/filterEngine";
import { sortData, toggleSort } from "@/engine/sortEngine";

interface UseFilteredDataOptions<T> {
  data: T[];
  conditions: FilterCondition[];
  initialSort?: SortState;
}

interface UseFilteredDataReturn<T> {
  filteredData: T[];
  sortedData: T[];
  sortState: SortState;
  handleSort: (key: string) => void;
  totalCount: number;
  filteredCount: number;
}

/**
 * Memoized hook that combines filtering + sorting.
 * Only re-computes when data or conditions actually change.
 */
export function useFilteredData<T>({
  data,
  conditions,
  initialSort = { key: "name", direction: "asc" },
}: UseFilteredDataOptions<T>): UseFilteredDataReturn<T> {
  const [sortState, setSortState] = useState<SortState>(initialSort);

  const filteredData = useMemo(() => filterData(data, conditions), [data, conditions]);

  const sortedData = useMemo(() => sortData(filteredData, sortState), [filteredData, sortState]);

  const handleSort = (key: string) => {
    setSortState((prev) => toggleSort(prev, key));
  };

  return {
    filteredData,
    sortedData,
    sortState,
    handleSort,
    totalCount: data.length,
    filteredCount: filteredData.length,
  };
}
