import styles from "./Input.module.css";

interface BooleanInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function BooleanInput({ value, onChange }: BooleanInputProps) {
  return (
    <div className={styles.toggleGroup}>
      <button
        type="button"
        className={`${styles.toggleBtn} ${value === "true" ? styles.toggleActive : ""}`}
        onClick={() => onChange("true")}>
        ✓ True
      </button>
      <button
        type="button"
        className={`${styles.toggleBtn} ${value === "false" ? styles.toggleActive : ""}`}
        onClick={() => onChange("false")}>
        ✗ False
      </button>
    </div>
  );
}
