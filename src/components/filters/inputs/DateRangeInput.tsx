import type { DateRangeFilterValue } from "@/types/filter.types";
import styles from "./Input.module.css";

interface DateRangeInputProps {
  value: DateRangeFilterValue;
  onChange: (value: DateRangeFilterValue) => void;
}

export function DateRangeInput({ value, onChange }: DateRangeInputProps) {
  const handleFrom = (from: string) => onChange({ ...value, from });
  const handleTo = (to: string) => onChange({ ...value, to });

  return (
    <div className={styles.rangeGroup}>
      <input
        className={styles.input}
        type="date"
        value={value.from ?? ""}
        onChange={(e) => handleFrom(e.target.value)}
        placeholder="From"
      />
      <span className={styles.rangeSep}>—</span>
      <input
        className={styles.input}
        type="date"
        value={value.to ?? ""}
        onChange={(e) => handleTo(e.target.value)}
        placeholder="To"
      />
    </div>
  );
}
