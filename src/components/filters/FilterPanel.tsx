import type { FilterCondition, FilterValue } from "@/types/filter.types";
import { FilterRow } from "./FilterRow";
import styles from "./FilterPanel.module.css";

interface FilterPanelProps {
  conditions: FilterCondition[];
  onAddFilter: () => void;
  onRemoveFilter: (id: number) => void;
  onClearAll: () => void;
  onFieldChange: (id: number, field: string) => void;
  onOperatorChange: (id: number, operator: string) => void;
  onValueChange: (id: number, value: FilterValue) => void;
}

export function FilterPanel({
  conditions,
  onAddFilter,
  onRemoveFilter,
  onClearAll,
  onFieldChange,
  onOperatorChange,
  onValueChange,
}: FilterPanelProps) {
  const activeCount = conditions.filter((c) => c.field && c.operator).length;

  return (
    <section className={styles.panel} aria-label="Filter panel">
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <span className={styles.label}>Filter Conditions</span>
          {activeCount > 0 && <span className={styles.badge}>{activeCount} active</span>}
        </div>
        <div className={styles.actions}>
          {conditions.length > 0 && (
            <button className={styles.clearBtn} onClick={onClearAll} type="button">
              Clear All
            </button>
          )}
          <button className={styles.addBtn} onClick={onAddFilter} type="button">
            + Add Filter
          </button>
        </div>
      </div>

      <div className={styles.rows}>
        {conditions.length === 0 ? (
          <div className={styles.empty}>No filters active — showing all records</div>
        ) : (
          conditions.map((condition) => (
            <FilterRow
              key={condition.id}
              condition={condition}
              onFieldChange={onFieldChange}
              onOperatorChange={onOperatorChange}
              onValueChange={onValueChange}
              onRemove={onRemoveFilter}
            />
          ))
        )}
      </div>
    </section>
  );
}
