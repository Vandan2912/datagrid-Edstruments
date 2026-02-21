import styles from "./Input.module.css";

interface NumberInputProps {
  value: string | number;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function NumberInput({ value, onChange, placeholder = "0" }: NumberInputProps) {
  return (
    <input
      className={styles.input}
      type="number"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
    />
  );
}
