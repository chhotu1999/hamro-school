import { MvGridColumn } from '../../../shared/controls/mat-grid/mat-grid.model';

export const gridColumns: MvGridColumn[] = [
  { name: 'name', display: 'Section', type: 'text', sortable: true },
  { name: 'grade', display: 'Class', type: 'text', sortable: true },
  { name: 'roomNo', display: 'Room No', type: 'text', sortable: false },
  { name: 'totalCapacity', display: 'Capacity', type: 'number', sortable: false, align: 'right' },
  { name: 'totalStudent', display: 'Students', type: 'number', sortable: false, align: 'right' },
  {
    name: 'actions',
    display: 'Actions',
    type: 'template',
    sortable: false,
    align: 'right',
    width: '90px',
  },
];
