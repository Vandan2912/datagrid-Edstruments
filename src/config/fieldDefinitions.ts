import { FieldType, type FieldDefinition } from "@/types/filter.types";

/**
 * To add a new filterable field:
 * 1. Add an entry here
 * 2. The filter engine, operators, and input rendering all adapt automatically.
 */
export const FIELD_DEFINITIONS: FieldDefinition[] = [
  {
    key: "name",
    label: "Name",
    type: FieldType.TEXT,
  },
  {
    key: "email",
    label: "Email",
    type: FieldType.TEXT,
  },
  {
    key: "department",
    label: "Department",
    type: FieldType.SINGLE_SELECT,
    options: ["Engineering", "Marketing", "Sales", "HR", "Finance", "Design", "Operations"],
  },
  {
    key: "role",
    label: "Role",
    type: FieldType.TEXT,
  },
  {
    key: "salary",
    label: "Salary",
    type: FieldType.AMOUNT,
  },
  {
    key: "joinDate",
    label: "Join Date",
    type: FieldType.DATE,
  },
  {
    key: "isActive",
    label: "Active Status",
    type: FieldType.BOOLEAN,
  },
  {
    key: "skills",
    label: "Skills",
    type: FieldType.MULTI_SELECT,
    options: [
      "React",
      "TypeScript",
      "Node.js",
      "GraphQL",
      "Python",
      "Java",
      "AWS",
      "Docker",
      "Figma",
      "SQL",
      "Go",
      "Vue",
    ],
  },
  {
    key: "address.city",
    label: "City",
    type: FieldType.TEXT,
  },
  {
    key: "projects",
    label: "Projects",
    type: FieldType.NUMBER,
  },
  {
    key: "performanceRating",
    label: "Performance Rating",
    type: FieldType.NUMBER,
  },
];
