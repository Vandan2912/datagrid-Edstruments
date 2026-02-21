import type { Employee, TableColumn } from "@/types/employee.types";
import styles from "./columns.module.css";

export const EMPLOYEE_COLUMNS: TableColumn<Employee>[] = [
  {
    key: "name",
    label: "Name",
    sortable: true,
    width: "160px",
    render: (r) => <span className={styles.name}>{r.name}</span>,
  },
  {
    key: "department",
    label: "Department",
    sortable: true,
    width: "130px",
    render: (r) => (
      <span className={`${styles.dept} ${styles[`dept${r.department.replace(/\s+/g, "")}`] ?? ""}`}>
        {r.department}
      </span>
    ),
  },
  {
    key: "role",
    label: "Role",
    sortable: true,
    width: "180px",
    render: (r) => r.role,
  },
  {
    key: "salary",
    label: "Salary",
    sortable: true,
    width: "110px",
    align: "right",
    render: (r) => <span className={styles.mono}>${r.salary.toLocaleString()}</span>,
  },
  {
    key: "joinDate",
    label: "Joined",
    sortable: true,
    width: "110px",
    render: (r) => <span className={styles.mono}>{r.joinDate}</span>,
  },
  {
    key: "isActive",
    label: "Status",
    sortable: true,
    width: "90px",
    render: (r) => (
      <span className={r.isActive ? styles.active : styles.inactive}>{r.isActive ? "● Active" : "○ Inactive"}</span>
    ),
  },
  {
    key: "skills",
    label: "Skills",
    width: "180px",
    render: (r) => {
      const shown = r.skills.slice(0, 3);
      const extra = r.skills.length - 3;
      return (
        <span className={styles.skills}>
          {shown.join(", ")}
          {extra > 0 && <span className={styles.skillsExtra}> +{extra}</span>}
          {r.skills.length === 0 && <span className={styles.none}>—</span>}
        </span>
      );
    },
  },
  {
    key: "address.city",
    label: "City",
    sortable: true,
    width: "120px",
    render: (r) => r.address.city,
  },
  {
    key: "projects",
    label: "Projects",
    sortable: true,
    width: "80px",
    align: "center",
    render: (r) => <span className={styles.mono}>{r.projects}</span>,
  },
  {
    key: "performanceRating",
    label: "Rating",
    sortable: true,
    width: "80px",
    align: "center",
    render: (r) => <span className={styles.rating}>★ {r.performanceRating}</span>,
  },
];
