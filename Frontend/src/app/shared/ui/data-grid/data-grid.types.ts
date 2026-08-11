export type ColumnAlign = 'left' | 'right' | 'center';
export type SortDirection = 'asc' | 'desc';

export interface DataGridColumn<T> {
  /** Property key on the row, or a virtual key (e.g. 'actions') when paired with a custom cell template. */
  key: string;
  header: string;
  sortable?: boolean;
  align?: ColumnAlign;
  width?: string;
  /** Value getter used for sorting/display when the column isn't a direct row property. */
  accessor?: (row: T) => unknown;
}

export interface DataGridFilterOption {
  label: string;
  value: string;
}

export interface DataGridFilter<T> {
  key: string;
  /** Shown as the dropdown's placeholder/"all" option. */
  label: string;
  options: DataGridFilterOption[];
  /** Defaults to strict equality against row[key]; override for computed/virtual fields. */
  predicate?: (row: T, value: string) => boolean;
}
