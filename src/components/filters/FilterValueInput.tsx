import { FieldType, Operator, isRangeValue, isDateRangeValue, isMultiSelectValue } from "@/types/filter.types";
import type { FieldDefinition, FilterValue, RangeFilterValue, DateRangeFilterValue } from "@/types/filter.types";
import { TextInput } from "./inputs/TextInput";
import { NumberInput } from "./inputs/NumberInput";
import { RangeInput } from "./inputs/RangeInput";
import { DateRangeInput } from "./inputs/DateRangeInput";
import { SingleSelectInput } from "./inputs/SingleSelectInput";
import { MultiSelectInput } from "./inputs/MultiSelectInput";
import { BooleanInput } from "./inputs/BooleanInput";
import styles from "./FilterValueInput.module.css";

interface FilterValueInputProps {
  fieldDef: FieldDefinition | undefined;
  operator: string;
  value: FilterValue;
  onChange: (value: FilterValue) => void;
}

export function FilterValueInput({ fieldDef, operator, value, onChange }: FilterValueInputProps) {
  if (!fieldDef || !operator) {
    return <span className={styles.placeholder}>Select a field and operator</span>;
  }

  const { type, options = [] } = fieldDef;
  const isBetween = operator === Operator.BETWEEN;

  // TEXT
  if (type === FieldType.TEXT) {
    return <TextInput value={String(value ?? "")} onChange={onChange} />;
  }

  // NUMBER — single or range
  if (type === FieldType.NUMBER) {
    if (isBetween) {
      const rangeVal = isRangeValue(value) ? value : {};
      return <RangeInput value={rangeVal as RangeFilterValue} onChange={onChange} />;
    }
    return <NumberInput value={String(value ?? "")} onChange={onChange} />;
  }

  // AMOUNT — single or range
  if (type === FieldType.AMOUNT) {
    if (isBetween) {
      const rangeVal = isRangeValue(value) ? value : {};
      return <RangeInput value={rangeVal as RangeFilterValue} onChange={onChange} />;
    }
    return <NumberInput value={String(value ?? "")} onChange={onChange} placeholder="Amount" />;
  }

  // DATE — always range
  if (type === FieldType.DATE) {
    const dateVal = isDateRangeValue(value) ? value : {};
    return <DateRangeInput value={dateVal as DateRangeFilterValue} onChange={onChange} />;
  }

  // SINGLE SELECT
  if (type === FieldType.SINGLE_SELECT) {
    return <SingleSelectInput value={String(value ?? "")} onChange={onChange} options={options} />;
  }

  // MULTI SELECT
  if (type === FieldType.MULTI_SELECT) {
    const multiVal = isMultiSelectValue(value) ? value : [];
    return <MultiSelectInput value={multiVal} onChange={onChange} options={options} />;
  }

  // BOOLEAN
  if (type === FieldType.BOOLEAN) {
    return <BooleanInput value={String(value ?? "")} onChange={onChange} />;
  }

  return null;
}
