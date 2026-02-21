import type { SortState } from "@/types/filter.types";
import type { Employee, TableColumn } from "@/types/employee.types";
import styles from "./DataTable.module.css";

interface DataTableProps {
  data: Employee[];
  columns: TableColumn<Employee>[];
  sortState: SortState;
  onSort: (key: string) => void;
  totalCount: number;
  filteredCount: number;
}

export function DataTable({ data, columns, sortState, onSort, totalCount, filteredCount }: DataTableProps) {
  const isFiltered = filteredCount < totalCount;
  const filteredOut = totalCount - filteredCount;

  return (
    <div className={styles.wrapper}>
      {/* Count bar */}
      <div className={styles.countBar}>
        <span className={styles.countItem}>
          Total: <span className={styles.countValue}>{totalCount}</span>
        </span>
        <span className={styles.countSep}>|</span>
        <span className={styles.countItem}>
          Showing: <span className={isFiltered ? styles.countFiltered : styles.countValue}>{filteredCount}</span>
        </span>
        {isFiltered && <span className={styles.countOut}>— {filteredOut} filtered out</span>}
      </div>

      {/* Table */}
      <div className={styles.tableWrapper}>
        <table className={styles.table} role="grid">
          <thead>
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`${styles.th} ${col.sortable ? styles.sortable : ""} ${sortState.key === col.key ? styles.sorted : ""}`}
                  style={{ width: col.width, textAlign: col.align ?? "left" }}
                  onClick={col.sortable ? () => onSort(col.key) : undefined}
                  aria-sort={
                    sortState.key === col.key ? (sortState.direction === "asc" ? "ascending" : "descending") : undefined
                  }>
                  {col.label}
                  {col.sortable && sortState.key === col.key && (
                    <span className={styles.sortIcon}>{sortState.direction === "asc" ? " ↑" : " ↓"}</span>
                  )}
                  {col.sortable && sortState.key !== col.key && <span className={styles.sortIconInactive}> ↕</span>}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className={styles.empty}>
                  ∅ No records match the current filters
                </td>
              </tr>
            ) : (
              data.map((row, i) => (
                <tr key={row.id} className={i % 2 === 0 ? styles.rowEven : styles.rowOdd}>
                  {columns.map((col) => (
                    <td key={col.key} className={styles.td} style={{ textAlign: col.align ?? "left" }}>
                      {col.render(row)}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
