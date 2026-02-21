import type { Employee } from "@/types/employee.types";

function sanitize(value: unknown): string {
  const str = String(value ?? "").replace(/"/g, '""');
  return `"${str}"`;
}

export function exportToCSV(data: Employee[]): void {
  const headers = [
    "ID",
    "Name",
    "Email",
    "Department",
    "Role",
    "Salary",
    "Join Date",
    "Active",
    "Skills",
    "City",
    "State",
    "Projects",
    "Performance Rating",
  ];

  const rows = data.map((r) =>
    [
      r.id,
      r.name,
      r.email,
      r.department,
      r.role,
      r.salary,
      r.joinDate,
      r.isActive ? "Yes" : "No",
      r.skills.join("; "),
      r.address.city,
      r.address.state,
      r.projects,
      r.performanceRating,
    ]
      .map(sanitize)
      .join(","),
  );

  const csv = [headers.map(sanitize).join(","), ...rows].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `employees_${new Date().toISOString().slice(0, 10)}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}
