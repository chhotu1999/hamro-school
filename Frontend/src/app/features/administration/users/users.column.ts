import { MvGridColumn } from '../../../shared/controls/mat-grid/mat-grid.model';

export const gridColumns: MvGridColumn[] = [
  { name: 'username', display: 'Username', type: 'text', sortable: true },
  { name: 'role', display: 'Role', type: 'text', sortable: true },
  { name: 'isActive', display: 'Status', type: 'template', sortable: true },
  { name: 'isLocked', display: 'Locked', type: 'template', sortable: true },
];
