export interface Column<T> {
  key: keyof T;
  header: string;
  sortable?: boolean;
}

export type SortDirection = 'asc' | 'desc';

export interface SortState {
  key: string;
  direction: SortDirection;
}

export interface DataTableProps<T extends Record<string, string | number>> {
  columns: Array<Column<T> & {
    render?: (value: T[keyof T]) => React.ReactNode;
  }>;
  rows: T[];
  loading?: boolean;
  onRowClick?: (row: T) => void;
}