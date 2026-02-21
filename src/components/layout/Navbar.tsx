import type { Employee } from "@/types/employee.types";
import { exportToCSV } from "@/utils/exportCSV";
import styles from "./Navbar.module.css";

interface NavbarProps {
  filteredData: Employee[];
  totalCount: number;
}

export function Navbar({ filteredData, totalCount }: NavbarProps) {
  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>
        DataGrid
        <span className={styles.tag}>FILTER ENGINE</span>
      </div>

      <div className={styles.right}>
        <span className={styles.count}>
          {filteredData.length}/{totalCount} records
        </span>
        <button className={styles.exportBtn} onClick={() => exportToCSV(filteredData)} type="button">
          ↓ Export CSV
        </button>
      </div>
    </nav>
  );
}
