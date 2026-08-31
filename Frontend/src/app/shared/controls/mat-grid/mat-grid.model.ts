export interface MvGridOption {
  searchText?: string;
  filter?: Record<string, unknown>;
  offset: number;
  pageSize: number;
  sortBy?: string;
  sortOrder?: string;
}

export interface MvGridPaging {
  offset: number;
  pageSize: number;
}

export interface MvGridSorting {
  sortBy: string;
  sortOrder: string;
}

export type MvGridColumnType = 'text' | 'number' | 'money' | 'date' | 'template' | 'action';

export interface MvGridColumn {
  /** Property name on the row, or a virtual name (e.g. 'actions') paired with a `type: 'template'` cell. */
  name: string;
  display: string;
  type: MvGridColumnType;
  align?: 'left' | 'right' | 'center';
  width?: string;
  sortable?: boolean;
}

export interface MvGridConfig<T = unknown> {
  columns: MvGridColumn[];
  dataSource: {
    data: T[];
    totalRows: number;
  };
  loading: boolean;
  option: MvGridOption;
}
