import styles from "./Input.module.css";

interface MultiSelectInputProps {
  value: string[];
  onChange: (value: string[]) => void;
  options: string[];
}

export function MultiSelectInput({ value, onChange, options }: MultiSelectInputProps) {
  const toggle = (opt: string) => {
    const next = value.includes(opt) ? value.filter((v) => v !== opt) : [...value, opt];
    onChange(next);
  };

  return (
    <div className={styles.chipGroup}>
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          className={`${styles.chip} ${value.includes(opt) ? styles.chipActive : ""}`}
          onClick={() => toggle(opt)}>
          {opt}
        </button>
      ))}
    </div>
  );
}
