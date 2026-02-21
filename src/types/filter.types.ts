// ============================================================
// FIELD TYPES
// ============================================================

export enum FieldType {
  TEXT = "text",
  NUMBER = "number",
  DATE = "date",
  AMOUNT = "amount",
  SINGLE_SELECT = "single_select",
  MULTI_SELECT = "multi_select",
  BOOLEAN = "boolean",
}

// ============================================================
// OPERATORS
// ============================================================

export enum Operator {
  // Text
  EQUALS = "equals",
  CONTAINS = "contains",
  STARTS_WITH = "starts_with",
  ENDS_WITH = "ends_with",
  NOT_CONTAINS = "not_contains",
  // Number / Amount
  GT = "gt",
  LT = "lt",
  GTE = "gte",
  LTE = "lte",
  BETWEEN = "between",
  // Select
  IS = "is",
  IS_NOT = "is_not",
  // Multi-select
  IN = "in",
  NOT_IN = "not_in",
}

export interface OperatorDefinition {
  value: Operator;
  label: string;
}

// ============================================================
// FILTER VALUES — discriminated union per field type
// ============================================================

export type SingleFilterValue = string | number | boolean | "";

export interface RangeFilterValue {
  min?: string | number;
  max?: string | number;
}

export interface DateRangeFilterValue {
  from?: string;
  to?: string;
}

export type MultiSelectFilterValue = string[];

export type FilterValue = SingleFilterValue | RangeFilterValue | DateRangeFilterValue | MultiSelectFilterValue;

// ============================================================
// FIELD DEFINITION
// ============================================================

export interface FieldDefinition {
  /** Dot-notation supported: e.g. "address.city" */
  key: string;
  label: string;
  type: FieldType;
  /** Required for SINGLE_SELECT and MULTI_SELECT */
  options?: string[];
}

// ============================================================
// FILTER CONDITION
// ============================================================

export interface FilterCondition {
  id: number;
  field: string;
  operator: Operator | "";
  value: FilterValue;
}

// ============================================================
// TYPE GUARDS
// ============================================================

export function isRangeValue(value: FilterValue): value is RangeFilterValue {
  return typeof value === "object" && value !== null && !Array.isArray(value) && ("min" in value || "max" in value);
}

export function isDateRangeValue(value: FilterValue): value is DateRangeFilterValue {
  return typeof value === "object" && value !== null && !Array.isArray(value) && ("from" in value || "to" in value);
}

export function isMultiSelectValue(value: FilterValue): value is MultiSelectFilterValue {
  return Array.isArray(value);
}

// ============================================================
// SORT STATE
// ============================================================

export type SortDirection = "asc" | "desc";

export interface SortState {
  key: string;
  direction: SortDirection;
}
