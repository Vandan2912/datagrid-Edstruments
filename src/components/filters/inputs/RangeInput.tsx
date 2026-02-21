import type { RangeFilterValue } from "@/types/filter.types";
import styles from "./Input.module.css";

interface RangeInputProps {
  value: RangeFilterValue;
  onChange: (value: RangeFilterValue) => void;
}

export function RangeInput({ value, onChange }: RangeInputProps) {
  const handleMin = (min: string) => onChange({ ...value, min });
  const handleMax = (max: string) => onChange({ ...value, max });

  return (
    <div className={styles.rangeGroup}>
      <input
        className={styles.input}
        type="number"
        value={value.min ?? ""}
        onChange={(e) => handleMin(e.target.value)}
        placeholder="Min"
      />
      <span className={styles.rangeSep}>—</span>
      <input
        className={styles.input}
        type="number"
        value={value.max ?? ""}
        onChange={(e) => handleMax(e.target.value)}
        placeholder="Max"
      />
    </div>
  );
}
