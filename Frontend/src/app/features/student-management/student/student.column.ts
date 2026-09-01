import { MvGridColumn } from '../../../shared/controls/mat-grid/mat-grid.model';

export const gridColumns: MvGridColumn[] = [
  { name: 'rollNo', display: 'Roll No', type: 'number', sortable: true, align: 'right' },
  { name: 'fullName', display: 'Name', type: 'text', sortable: true },
  { name: 'grade', display: 'Grade', type: 'text', sortable: true },
  { name: 'gradeSection', display: 'Section', type: 'text', sortable: true },
  { name: 'gender', display: 'Gender', type: 'text', sortable: true },
  { name: 'academicYear', display: 'Academic Year', type: 'text', sortable: true },
  { name: 'studentStatus', display: 'Status', type: 'text', sortable: true },
  {
    name: 'actions',
    display: 'Actions',
    type: 'template',
    sortable: false,
    align: 'right',
    width: '90px',
  },
];
