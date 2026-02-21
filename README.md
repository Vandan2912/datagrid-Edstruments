# DataGrid — Dynamic Filter Engine

A fully reusable, type-safe dynamic filter component system built with **React 18 + TypeScript + Vite**.

## Quick Start

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Project Structure

```
src/
├── types/
│   ├── filter.types.ts      # FieldType, Operator, FilterCondition, type guards
│   └── employee.types.ts    # Employee, Address, TableColumn<T>
│
├── data/
│   └── employees.ts         # 50 sample employee records
│
├── config/
│   ├── fieldDefinitions.ts  # FIELD_DEFINITIONS — single source of truth
│   └── operatorMappings.ts  # TYPE_OPERATORS — maps FieldType → Operator[]
│
├── engine/
│   ├── filterEngine.ts      # Pure filtering functions (AND logic, dot-notation)
│   └── sortEngine.ts        # Sort + toggleSort utilities
│
├── hooks/
│   ├── useFilters.ts        # Manages FilterCondition[] state with typed actions
│   └── useFilteredData.ts   # Memoized filter + sort, returns sorted data
│
├── components/
│   ├── filters/
│   │   ├── FilterPanel.tsx          # Container: header, add/clear, rows list
│   │   ├── FilterRow.tsx            # Single condition: field | op | value | remove
│   │   ├── FilterValueInput.tsx     # Dispatcher: renders correct input by type
│   │   └── inputs/
│   │       ├── TextInput.tsx
│   │       ├── NumberInput.tsx
│   │       ├── RangeInput.tsx       # Number between (min/max)
│   │       ├── DateRangeInput.tsx   # Date between (from/to)
│   │       ├── SingleSelectInput.tsx
│   │       ├── MultiSelectInput.tsx # Chip toggle multi-select
│   │       ├── BooleanInput.tsx     # True/False toggle buttons
│   │       └── Input.module.css     # Shared input styles
│   │
│   ├── table/
│   │   ├── DataTable.tsx    # Sortable table with count bar + empty state
│   │   ├── columns.tsx      # Typed TableColumn<Employee>[] definitions
│   │   └── DataTable.module.css
│   │
│   └── layout/
│       ├── Navbar.tsx       # Logo + record count + CSV export
│       └── Navbar.module.css
│
├── utils/
│   └── exportCSV.ts         # CSV export with proper escaping
│
├── styles/
│   └── globals.css          # CSS variables + base reset
│
├── App.tsx                  # Root: wires hooks → FilterPanel + DataTable
└── main.tsx                 # ReactDOM entry point
```

## Adding a New Field Type

1. **Add to `FieldType` enum** (`types/filter.types.ts`)
2. **Add operators** to `TYPE_OPERATORS` (`config/operatorMappings.ts`)
3. **Create input component** in `components/filters/inputs/`
4. **Add dispatch case** in `FilterValueInput.tsx`
5. **Add filter logic** in `engine/filterEngine.ts`
6. **Add field** to `FIELD_DEFINITIONS` (`config/fieldDefinitions.ts`)

That's it — the FilterRow, FilterPanel, and useFilters hook all adapt automatically.

## Adding a New Filterable Field

Only one step: add an entry to `FIELD_DEFINITIONS` in `src/config/fieldDefinitions.ts`.

```ts
{
  key: 'address.country',     // dot-notation supported for nested fields
  label: 'Country',
  type: FieldType.TEXT,
}
```

The entire system adapts: operators, inputs, and filtering all work immediately.

## Filtering Logic

- **AND** across different fields: all conditions must match
- **OR** within multi-select: any selected value matches (configurable to `NOT_IN`)
- **Dot-notation** for nested fields: `address.city`, `address.state`
- **Partial conditions** (missing field/operator/value) are silently skipped
- **Memoized** via `useMemo` — only recalculates when `conditions` or `data` changes

## Supported Field Types & Operators

| Type | Operators |
|---|---|
| `TEXT` | Contains, Equals, Starts With, Ends With, Not Contains |
| `NUMBER` | Equals, >, <, ≥, ≤, Between |
| `DATE` | Between (date range) |
| `AMOUNT` | Between, ≥, ≤, Equals |
| `SINGLE_SELECT` | Is, Is Not |
| `MULTI_SELECT` | Includes Any Of, Excludes All Of |
| `BOOLEAN` | Is (True/False) |

## Tech Stack

- React 18 with `StrictMode`
- TypeScript 5 with strict mode
- Vite 5 for dev + build
- CSS Modules for scoped, type-safe styles
- No UI library dependencies — fully custom components
