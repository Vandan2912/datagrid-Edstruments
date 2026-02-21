import { useCallback, useState } from "react";
import type { FilterCondition, FilterValue, Operator } from "@/types/filter.types";
import { getDefaultOperator } from "@/config/operatorMappings";
import { FIELD_DEFINITIONS } from "@/config/fieldDefinitions";

let idCounter = 1;
const nextId = (): number => idCounter++;

/**
 * useFilters manages the array of FilterCondition objects.
 * Exposes typed actions for adding, removing, updating, and clearing filters.
 */
export function useFilters() {
  const [conditions, setConditions] = useState<FilterCondition[]>([]);

  const addFilter = useCallback(() => {
    setConditions((prev) => [...prev, { id: nextId(), field: "", operator: "", value: "" }]);
  }, []);

  const removeFilter = useCallback((id: number) => {
    setConditions((prev) => prev.filter((c) => c.id !== id));
  }, []);

  const clearAll = useCallback(() => {
    setConditions([]);
  }, []);

  /**
   * When the field changes, we reset the operator to the default
   * for the new field type, and clear the value.
   */
  const updateField = useCallback((id: number, field: string) => {
    const fieldDef = FIELD_DEFINITIONS.find((f) => f.key === field);
    const defaultOp = fieldDef ? getDefaultOperator(fieldDef.type) : "";
    const defaultValue: FilterValue = fieldDef?.type === "multi_select" ? [] : "";

    setConditions((prev) =>
      prev.map((c) => (c.id === id ? { ...c, field, operator: defaultOp, value: defaultValue } : c)),
    );
  }, []);

  /**
   * When the operator changes, reset the value to avoid stale
   * range/multi values from previous operators.
   */
  const updateOperator = useCallback(
    (id: number, operator: string) => {
      const condition = conditions.find((c) => c.id === id);
      if (!condition) return;

      const fieldDef = FIELD_DEFINITIONS.find((f) => f.key === condition.field);
      let defaultValue: FilterValue = "";

      if (fieldDef) {
        if (fieldDef.type === "multi_select") defaultValue = [];
        else if (operator === "between" && fieldDef.type === "date") defaultValue = {};
        else if (operator === "between") defaultValue = {};
      }

      setConditions((prev) =>
        prev.map((c) => (c.id === id ? { ...c, operator: operator as Operator, value: defaultValue } : c)),
      );
    },
    [conditions],
  );

  const updateValue = useCallback((id: number, value: FilterValue) => {
    setConditions((prev) => prev.map((c) => (c.id === id ? { ...c, value } : c)));
  }, []);

  return {
    conditions,
    addFilter,
    removeFilter,
    clearAll,
    updateField,
    updateOperator,
    updateValue,
  };
}
