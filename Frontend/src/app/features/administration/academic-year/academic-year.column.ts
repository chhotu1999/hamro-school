import { MvGridColumn } from '../../../shared/controls/mat-grid/mat-grid.model';

export const gridColumns: MvGridColumn[] = [
  { name: 'name', display: 'Academic Year', type: 'text', sortable: true },
  { name: 'startDate', display: 'Start Date', type: 'date', sortable: true },
  { name: 'endDate', display: 'End Date', type: 'date', sortable: true },
  { name: 'mitiStartDate', display: 'Miti Start', type: 'text', sortable: true },
  { name: 'mitiEndDate', display: 'Miti End', type: 'text', sortable: true },
  {
    name: 'actions',
    display: 'Actions',
    type: 'template',
    sortable: false,
    align: 'right',
    width: '90px',
  },
];
