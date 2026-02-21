// ============================================================
// EMPLOYEE DATA TYPES
// ============================================================

export interface Address {
  city: string;
  state: string;
  country: string;
}

export interface Employee {
  id: number;
  name: string;
  email: string;
  department: string;
  role: string;
  salary: number;
  joinDate: string; // ISO date string "YYYY-MM-DD"
  isActive: boolean;
  skills: string[];
  address: Address;
  projects: number;
  lastReview: string;
  performanceRating: number;
}

// ============================================================
// TABLE COLUMN DEFINITION
// ============================================================

export interface TableColumn<T> {
  key: string;
  label: string;
  sortable?: boolean;
  render: (row: T) => React.ReactNode;
  width?: string;
  align?: "left" | "right" | "center";
}
