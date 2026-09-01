import { MvGridColumn } from '../../../shared/controls/mat-grid/mat-grid.model';

export const gridColumns: MvGridColumn[] = [
  { name: 'staffNo', display: 'Staff No', type: 'text', sortable: true },
  { name: 'fullName', display: 'Name', type: 'text', sortable: true },
  { name: 'role', display: 'Role', type: 'text', sortable: true },
  { name: 'gender', display: 'Gender', type: 'text', sortable: true },
  { name: 'phone', display: 'Phone', type: 'text', sortable: false },
  { name: 'email', display: 'Email', type: 'text', sortable: false },
  { name: 'staffStatus', display: 'Status', type: 'text', sortable: true },
  {
    name: 'actions',
    display: 'Actions',
    type: 'template',
    sortable: false,
    align: 'right',
    width: '90px',
  },
];
