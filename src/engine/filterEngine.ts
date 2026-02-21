import {
  FieldType,
  Operator,
  isRangeValue,
  isDateRangeValue,
  isMultiSelectValue,
  type FilterCondition,
  type FilterValue,
} from "@/types/filter.types";
import { FIELD_DEFINITIONS } from "@/config/fieldDefinitions";

// ============================================================
// NESTED VALUE ACCESSOR
// Supports dot-notation: "address.city" → record.address.city
// ============================================================

export function getNestedValue(obj: unknown, path: string): unknown {
  return path.split(".").reduce<unknown>((acc, key) => {
    if (acc !== null && typeof acc === "object") {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj);
}

// ============================================================
// TYPE-SPECIFIC FILTER FUNCTIONS
// ============================================================

function applyTextFilter(rawValue: unknown, operator: Operator, filterValue: FilterValue): boolean {
  if (rawValue === null || rawValue === undefined) return false;
  const value = String(rawValue).toLowerCase().trim();
  const filter = String(filterValue).toLowerCase().trim();

  if (!filter) return true;

  switch (operator) {
    case Operator.EQUALS:
      return value === filter;
    case Operator.CONTAINS:
      return value.includes(filter);
    case Operator.STARTS_WITH:
      return value.startsWith(filter);
    case Operator.ENDS_WITH:
      return value.endsWith(filter);
    case Operator.NOT_CONTAINS:
      return !value.includes(filter);
    default:
      return true;
  }
}

function applyNumberFilter(rawValue: unknown, operator: Operator, filterValue: FilterValue): boolean {
  const num = parseFloat(String(rawValue));
  if (isNaN(num)) return false;

  if (operator === Operator.BETWEEN && isRangeValue(filterValue)) {
    const min = filterValue.min !== undefined ? parseFloat(String(filterValue.min)) : NaN;
    const max = filterValue.max !== undefined ? parseFloat(String(filterValue.max)) : NaN;
    const minOk = isNaN(min) || num >= min;
    const maxOk = isNaN(max) || num <= max;
    return minOk && maxOk;
  }

  const fv = parseFloat(String(filterValue));
  if (isNaN(fv)) return true;

  switch (operator) {
    case Operator.EQUALS:
      return num === fv;
    case Operator.GT:
      return num > fv;
    case Operator.LT:
      return num < fv;
    case Operator.GTE:
      return num >= fv;
    case Operator.LTE:
      return num <= fv;
    default:
      return true;
  }
}

function applyDateFilter(rawValue: unknown, operator: Operator, filterValue: FilterValue): boolean {
  if (!rawValue) return false;
  const date = new Date(String(rawValue));
  if (isNaN(date.getTime())) return false;

  if (operator === Operator.BETWEEN && isDateRangeValue(filterValue)) {
    const { from, to } = filterValue;
    const fromDate = from ? new Date(from) : null;
    const toDate = to ? new Date(to) : null;
    // Set toDate to end of day for inclusive range
    if (toDate) toDate.setHours(23, 59, 59, 999);
    const fromOk = !fromDate || date >= fromDate;
    const toOk = !toDate || date <= toDate;
    return fromOk && toOk;
  }

  return true;
}

function applyBooleanFilter(rawValue: unknown, _operator: Operator, filterValue: FilterValue): boolean {
  const boolFilter = filterValue === "true" || filterValue === true;
  return Boolean(rawValue) === boolFilter;
}

function applySingleSelectFilter(rawValue: unknown, operator: Operator, filterValue: FilterValue): boolean {
  const raw = String(rawValue ?? "");
  const filter = String(filterValue);
  return operator === Operator.IS ? raw === filter : raw !== filter;
}

function applyMultiSelectFilter(rawValue: unknown, operator: Operator, filterValue: FilterValue): boolean {
  if (!Array.isArray(rawValue)) return false;
  if (!isMultiSelectValue(filterValue) || filterValue.length === 0) return true;

  const typedRaw = rawValue as string[];
  const hasOverlap = filterValue.some((selected) => typedRaw.includes(selected));

  return operator === Operator.IN ? hasOverlap : !hasOverlap;
}

// ============================================================
// SINGLE CONDITION EVALUATOR
// ============================================================

function isEmptyValue(value: FilterValue): boolean {
  if (value === "" || value === null || value === undefined) return true;
  if (isMultiSelectValue(value) && value.length === 0) return true;
  if (isRangeValue(value)) {
    return (value.min === "" || value.min === undefined) && (value.max === "" || value.max === undefined);
  }
  if (isDateRangeValue(value)) {
    return (!value.from || value.from === "") && (!value.to || value.to === "");
  }
  return false;
}

export function evaluateCondition<T>(record: T, condition: FilterCondition): boolean {
  const { field, operator, value } = condition;

  // Skip incomplete conditions gracefully
  if (!field || !operator) return true;
  if (isEmptyValue(value)) return true;

  const fieldDef = FIELD_DEFINITIONS.find((f) => f.key === field);
  if (!fieldDef) return true;

  const rawValue = getNestedValue(record, field);

  switch (fieldDef.type) {
    case FieldType.TEXT:
      return applyTextFilter(rawValue, operator as Operator, value);

    case FieldType.NUMBER:
    case FieldType.AMOUNT:
      return applyNumberFilter(rawValue, operator as Operator, value);

    case FieldType.DATE:
      return applyDateFilter(rawValue, operator as Operator, value);

    case FieldType.BOOLEAN:
      return applyBooleanFilter(rawValue, operator as Operator, value);

    case FieldType.SINGLE_SELECT:
      return applySingleSelectFilter(rawValue, operator as Operator, value);

    case FieldType.MULTI_SELECT:
      return applyMultiSelectFilter(rawValue, operator as Operator, value);

    default:
      return true;
  }
}

// ============================================================
// MAIN FILTER FUNCTION
// AND logic: all conditions must pass per record
// ============================================================

export function filterData<T>(data: T[], conditions: FilterCondition[]): T[] {
  if (conditions.length === 0) return data;

  const activeConditions = conditions.filter((c) => c.field && c.operator);
  if (activeConditions.length === 0) return data;

  return data.filter((record) => activeConditions.every((condition) => evaluateCondition(record, condition)));
}
