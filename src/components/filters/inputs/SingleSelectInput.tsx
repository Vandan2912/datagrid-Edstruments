import styles from "./Input.module.css";

interface SingleSelectInputProps {
  value: string;
  onChange: (value: string) => void;
  options: string[];
}

export function SingleSelectInput({ value, onChange, options }: SingleSelectInputProps) {
  return (
    <select className={styles.select} value={value} onChange={(e) => onChange(e.target.value)}>
      <option value="">Choose…</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  );
}
