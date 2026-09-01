import { MvGridColumn } from '../../../shared/controls/mat-grid/mat-grid.model';

export const gridColumns: MvGridColumn[] = [
  { name: 'name', display: 'Class', type: 'text', sortable: true },
  { name: 'gradeTeacher', display: 'Class Teacher', type: 'text', sortable: true },
  { name: 'shiftStartTime', display: 'Shift Start', type: 'text', sortable: false },
  { name: 'shiftEndTime', display: 'Shift End', type: 'text', sortable: false },
  { name: 'totalSection', display: 'Sections', type: 'number', sortable: false, align: 'right' },
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
