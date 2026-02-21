import { FIELD_DEFINITIONS } from "@/config/fieldDefinitions";
import { getOperatorsForType } from "@/config/operatorMappings";
import type { FilterCondition, FilterValue } from "@/types/filter.types";
import { FilterValueInput } from "./FilterValueInput";
import styles from "./FilterRow.module.css";

interface FilterRowProps {
  condition: FilterCondition;
  onFieldChange: (id: number, field: string) => void;
  onOperatorChange: (id: number, operator: string) => void;
  onValueChange: (id: number, value: FilterValue) => void;
  onRemove: (id: number) => void;
}

export function FilterRow({ condition, onFieldChange, onOperatorChange, onValueChange, onRemove }: FilterRowProps) {
  const fieldDef = FIELD_DEFINITIONS.find((f) => f.key === condition.field);
  const operators = fieldDef ? getOperatorsForType(fieldDef.type) : [];

  return (
    <div className={styles.row}>
      {/* Field selector */}
      <select
        className={styles.select}
        value={condition.field}
        onChange={(e) => onFieldChange(condition.id, e.target.value)}
        aria-label="Select field">
        <option value="">Field…</option>
        {FIELD_DEFINITIONS.map((f) => (
          <option key={f.key} value={f.key}>
            {f.label}
          </option>
        ))}
      </select>

      {/* Operator selector */}
      <select
        className={styles.select}
        value={condition.operator}
        onChange={(e) => onOperatorChange(condition.id, e.target.value)}
        disabled={!condition.field}
        aria-label="Select operator"
        style={{ opacity: condition.field ? 1 : 0.4 }}>
        <option value="">Operator…</option>
        {operators.map((op) => (
          <option key={op.value} value={op.value}>
            {op.label}
          </option>
        ))}
      </select>

      {/* Value input — dynamically rendered */}
      <div className={styles.valueCell}>
        <FilterValueInput
          fieldDef={fieldDef}
          operator={condition.operator}
          value={condition.value}
          onChange={(val) => onValueChange(condition.id, val)}
        />
      </div>

      {/* Remove button */}
      <button
        className={styles.removeBtn}
        onClick={() => onRemove(condition.id)}
        title="Remove filter"
        aria-label="Remove filter"
        type="button">
        ✕
      </button>
    </div>
  );
}
