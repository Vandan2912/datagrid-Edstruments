import { FieldType, Operator, type OperatorDefinition } from "@/types/filter.types";

/**
 * Maps each FieldType to its valid operators.
 * Operator selection UI is driven entirely by this mapping.
 */
export const TYPE_OPERATORS: Record<FieldType, OperatorDefinition[]> = {
  [FieldType.TEXT]: [
    { value: Operator.CONTAINS, label: "Contains" },
    { value: Operator.EQUALS, label: "Equals" },
    { value: Operator.STARTS_WITH, label: "Starts With" },
    { value: Operator.ENDS_WITH, label: "Ends With" },
    { value: Operator.NOT_CONTAINS, label: "Does Not Contain" },
  ],
  [FieldType.NUMBER]: [
    { value: Operator.EQUALS, label: "Equals" },
    { value: Operator.GT, label: "Greater Than" },
    { value: Operator.LT, label: "Less Than" },
    { value: Operator.GTE, label: "≥ Greater or Equal" },
    { value: Operator.LTE, label: "≤ Less or Equal" },
    { value: Operator.BETWEEN, label: "Between" },
  ],
  [FieldType.DATE]: [{ value: Operator.BETWEEN, label: "Between" }],
  [FieldType.AMOUNT]: [
    { value: Operator.BETWEEN, label: "Between" },
    { value: Operator.GTE, label: "≥ At Least" },
    { value: Operator.LTE, label: "≤ At Most" },
    { value: Operator.EQUALS, label: "Equals" },
  ],
  [FieldType.SINGLE_SELECT]: [
    { value: Operator.IS, label: "Is" },
    { value: Operator.IS_NOT, label: "Is Not" },
  ],
  [FieldType.MULTI_SELECT]: [
    { value: Operator.IN, label: "Includes Any Of" },
    { value: Operator.NOT_IN, label: "Excludes All Of" },
  ],
  [FieldType.BOOLEAN]: [{ value: Operator.IS, label: "Is" }],
};

/**
 * Returns operators for a given field type.
 */
export function getOperatorsForType(type: FieldType): OperatorDefinition[] {
  return TYPE_OPERATORS[type] ?? [];
}

/**
 * Returns the default operator for a field type.
 */
export function getDefaultOperator(type: FieldType): Operator {
  return TYPE_OPERATORS[type]?.[0]?.value ?? Operator.EQUALS;
}
