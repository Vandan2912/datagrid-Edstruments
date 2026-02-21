import { useFilters } from "@/hooks/useFilters";
import { useFilteredData } from "@/hooks/useFilteredData";
import { EMPLOYEES } from "@/data/employees";
import { FilterPanel } from "@/components/filters/FilterPanel";
import { DataTable } from "@/components/table/DataTable";
import { EMPLOYEE_COLUMNS } from "@/components/table/columns";
import { Navbar } from "@/components/layout/Navbar";
import styles from "./App.module.css";

export default function App() {
  const { conditions, addFilter, removeFilter, clearAll, updateField, updateOperator, updateValue } = useFilters();

  const { sortedData, sortState, handleSort, totalCount, filteredCount, filteredData } = useFilteredData({
    data: EMPLOYEES,
    conditions,
    initialSort: { key: "name", direction: "asc" },
  });

  return (
    <div className={styles.app}>
      {/* Navigation */}
      <Navbar filteredData={filteredData} totalCount={totalCount} />

      {/* Main content */}
      <main className={styles.main}>
        {/* Filter builder */}
        <FilterPanel
          conditions={conditions}
          onAddFilter={addFilter}
          onRemoveFilter={removeFilter}
          onClearAll={clearAll}
          onFieldChange={updateField}
          onOperatorChange={updateOperator}
          onValueChange={updateValue}
        />

        {/* Data table */}
        <DataTable
          data={sortedData}
          columns={EMPLOYEE_COLUMNS}
          sortState={sortState}
          onSort={handleSort}
          totalCount={totalCount}
          filteredCount={filteredCount}
        />
      </main>
    </div>
  );
}
