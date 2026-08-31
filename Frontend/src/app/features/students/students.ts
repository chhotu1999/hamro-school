import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { SharedControls } from '../../shared/common-shared';
import { MvGridColumn, MvGridConfig, MvGridPaging, MvGridSorting } from '../../shared/controls/mat-grid/mat-grid.model';

type FeeStatus = 'Paid' | 'Pending' | 'Overdue';

interface Student {
  id: number;
  name: string;
  initials: string;
  avatarColor: string;
  grade: string;
  section: string;
  rollNo: number;
  guardian: string;
  attendance: number;
  feeStatus: FeeStatus;
}

const STUDENTS: Student[] = [
  {
    id: 1,
    name: 'Aarav Sharma',
    initials: 'AS',
    avatarColor: 'var(--chart-1)',
    grade: 'Grade 10',
    section: 'A',
    rollNo: 1,
    guardian: 'Suresh Sharma',
    attendance: 96,
    feeStatus: 'Paid',
  },
  {
    id: 2,
    name: 'Bipana Thapa',
    initials: 'BT',
    avatarColor: 'var(--chart-2)',
    grade: 'Grade 10',
    section: 'A',
    rollNo: 2,
    guardian: 'Krishna Thapa',
    attendance: 88,
    feeStatus: 'Pending',
  },
  {
    id: 3,
    name: 'Chandra Bahadur KC',
    initials: 'CK',
    avatarColor: 'var(--chart-3)',
    grade: 'Grade 10',
    section: 'B',
    rollNo: 3,
    guardian: 'Devi KC',
    attendance: 72,
    feeStatus: 'Overdue',
  },
  {
    id: 4,
    name: 'Diya Gurung',
    initials: 'DG',
    avatarColor: 'var(--chart-4)',
    grade: 'Grade 9',
    section: 'A',
    rollNo: 4,
    guardian: 'Nabin Gurung',
    attendance: 91,
    feeStatus: 'Paid',
  },
  {
    id: 5,
    name: 'Eshan Rai',
    initials: 'ER',
    avatarColor: 'var(--chart-5)',
    grade: 'Grade 9',
    section: 'A',
    rollNo: 5,
    guardian: 'Mina Rai',
    attendance: 84,
    feeStatus: 'Pending',
  },
  {
    id: 6,
    name: 'Fatima Khan',
    initials: 'FK',
    avatarColor: 'var(--chart-6)',
    grade: 'Grade 9',
    section: 'B',
    rollNo: 6,
    guardian: 'Iqbal Khan',
    attendance: 97,
    feeStatus: 'Paid',
  },
  {
    id: 7,
    name: 'Gita Adhikari',
    initials: 'GA',
    avatarColor: 'var(--chart-7)',
    grade: 'Grade 9',
    section: 'B',
    rollNo: 7,
    guardian: 'Ram Adhikari',
    attendance: 66,
    feeStatus: 'Overdue',
  },
  {
    id: 8,
    name: 'Hari Prasad Yadav',
    initials: 'HY',
    avatarColor: 'var(--chart-8)',
    grade: 'Grade 8',
    section: 'A',
    rollNo: 8,
    guardian: 'Shyam Yadav',
    attendance: 93,
    feeStatus: 'Paid',
  },
  {
    id: 9,
    name: 'Isha Maharjan',
    initials: 'IM',
    avatarColor: 'var(--chart-9)',
    grade: 'Grade 8',
    section: 'A',
    rollNo: 9,
    guardian: 'Bishnu Maharjan',
    attendance: 89,
    feeStatus: 'Pending',
  },
  {
    id: 10,
    name: 'Jyoti Basnet',
    initials: 'JB',
    avatarColor: 'var(--chart-10)',
    grade: 'Grade 8',
    section: 'B',
    rollNo: 10,
    guardian: 'Kamal Basnet',
    attendance: 78,
    feeStatus: 'Paid',
  },
  {
    id: 11,
    name: 'Kabin Lama',
    initials: 'KL',
    avatarColor: 'var(--chart-1)',
    grade: 'Grade 8',
    section: 'B',
    rollNo: 11,
    guardian: 'Pemba Lama',
    attendance: 95,
    feeStatus: 'Paid',
  },
  {
    id: 12,
    name: 'Laxmi Chaudhary',
    initials: 'LC',
    avatarColor: 'var(--chart-2)',
    grade: 'Grade 7',
    section: 'A',
    rollNo: 12,
    guardian: 'Ravi Chaudhary',
    attendance: 70,
    feeStatus: 'Overdue',
  },
  {
    id: 13,
    name: 'Manish Shrestha',
    initials: 'MS',
    avatarColor: 'var(--chart-3)',
    grade: 'Grade 7',
    section: 'A',
    rollNo: 13,
    guardian: 'Anita Shrestha',
    attendance: 92,
    feeStatus: 'Paid',
  },
  {
    id: 14,
    name: 'Nisha Tamang',
    initials: 'NT',
    avatarColor: 'var(--chart-4)',
    grade: 'Grade 7',
    section: 'B',
    rollNo: 14,
    guardian: 'Dorje Tamang',
    attendance: 85,
    feeStatus: 'Pending',
  },
  {
    id: 15,
    name: 'Om Bahadur Karki',
    initials: 'OK',
    avatarColor: 'var(--chart-5)',
    grade: 'Grade 7',
    section: 'B',
    rollNo: 15,
    guardian: 'Sita Karki',
    attendance: 99,
    feeStatus: 'Paid',
  },
  {
    id: 16,
    name: 'Puja Magar',
    initials: 'PM',
    avatarColor: 'var(--chart-6)',
    grade: 'Grade 6',
    section: 'A',
    rollNo: 16,
    guardian: 'Him Magar',
    attendance: 81,
    feeStatus: 'Pending',
  },
  {
    id: 17,
    name: 'Quresh Ansari',
    initials: 'QA',
    avatarColor: 'var(--chart-7)',
    grade: 'Grade 6',
    section: 'A',
    rollNo: 17,
    guardian: 'Yusuf Ansari',
    attendance: 67,
    feeStatus: 'Overdue',
  },
  {
    id: 18,
    name: 'Riya Poudel',
    initials: 'RP',
    avatarColor: 'var(--chart-8)',
    grade: 'Grade 6',
    section: 'B',
    rollNo: 18,
    guardian: 'Bimal Poudel',
    attendance: 90,
    feeStatus: 'Paid',
  },
  {
    id: 19,
    name: 'Sujan Bhandari',
    initials: 'SB',
    avatarColor: 'var(--chart-9)',
    grade: 'Grade 6',
    section: 'B',
    rollNo: 19,
    guardian: 'Ganga Bhandari',
    attendance: 94,
    feeStatus: 'Paid',
  },
  {
    id: 20,
    name: 'Tara Devi Oli',
    initials: 'TO',
    avatarColor: 'var(--chart-10)',
    grade: 'Grade 10',
    section: 'B',
    rollNo: 20,
    guardian: 'Prakash Oli',
    attendance: 76,
    feeStatus: 'Pending',
  },
  {
    id: 21,
    name: 'Umesh Rana',
    initials: 'UR',
    avatarColor: 'var(--chart-1)',
    grade: 'Grade 10',
    section: 'C',
    rollNo: 21,
    guardian: 'Sunita Rana',
    attendance: 63,
    feeStatus: 'Overdue',
  },
  {
    id: 22,
    name: 'Vivek Joshi',
    initials: 'VJ',
    avatarColor: 'var(--chart-2)',
    grade: 'Grade 9',
    section: 'C',
    rollNo: 22,
    guardian: 'Meera Joshi',
    attendance: 98,
    feeStatus: 'Paid',
  },
  {
    id: 23,
    name: 'Wangmo Sherpa',
    initials: 'WS',
    avatarColor: 'var(--chart-3)',
    grade: 'Grade 8',
    section: 'C',
    rollNo: 23,
    guardian: 'Ang Sherpa',
    attendance: 87,
    feeStatus: 'Pending',
  },
  {
    id: 24,
    name: 'Yamuna Pandey',
    initials: 'YP',
    avatarColor: 'var(--chart-4)',
    grade: 'Grade 7',
    section: 'C',
    rollNo: 24,
    guardian: 'Hari Pandey',
    attendance: 83,
    feeStatus: 'Paid',
  },
];

const GRADE_OPTIONS = ['Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10'];
const FEE_STATUS_OPTIONS: FeeStatus[] = ['Paid', 'Pending', 'Overdue'];

const GRID_COLUMNS: MvGridColumn[] = [
  { name: 'student', display: 'Student', type: 'template', sortable: true },
  { name: 'grade', display: 'Grade', type: 'text', sortable: true },
  { name: 'section', display: 'Section', type: 'text', sortable: true },
  { name: 'rollNo', display: 'Roll No.', type: 'number', align: 'right', sortable: true },
  { name: 'guardian', display: 'Guardian', type: 'text', sortable: true },
  { name: 'attendance', display: 'Attendance', type: 'template', align: 'right', sortable: true },
  { name: 'feeStatus', display: 'Fee status', type: 'template', sortable: true },
  { name: 'actions', display: '', type: 'template', sortable: false },
];

/**
 * This page has no backend yet, so `refreshGrid()` filters/sorts/paginates
 * the in-memory mock list itself and feeds the result into `gridConfig` —
 * the same shape a real API-backed page (see AcademicYear) would build from
 * a server response.
 */
@Component({
  selector: 'app-students',
  imports: [...SharedControls, FormsModule, MatFormFieldModule, MatInputModule, MatSelectModule],
  templateUrl: './students.html',
  styleUrl: './students.less',
})
export class Students implements OnInit {
  private readonly allStudents = STUDENTS;

  gradeOptions = GRADE_OPTIONS;
  feeStatusOptions = FEE_STATUS_OPTIONS;

  gradeFilter = '';
  feeStatusFilter = '';

  gridConfig: MvGridConfig<Student> = {
    columns: GRID_COLUMNS,
    dataSource: { data: [], totalRows: 0 },
    loading: false,
    option: { searchText: '', offset: 0, pageSize: 8, sortBy: 'student', sortOrder: 'ASC' },
  };

  ngOnInit(): void {
    this.refreshGrid();
  }

  searchChange(event: Event): void {
    this.gridConfig.option.searchText = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.gridConfig.option.offset = 0;
    this.refreshGrid();
  }

  onFilterChange(): void {
    this.gridConfig.option.offset = 0;
    this.refreshGrid();
  }

  onPageChange(event: MvGridPaging): void {
    this.gridConfig.option.offset = event.offset;
    this.gridConfig.option.pageSize = event.pageSize;
    this.refreshGrid();
  }

  onSortChange(event: MvGridSorting): void {
    this.gridConfig.option.sortBy = event.sortBy;
    this.gridConfig.option.sortOrder = event.sortOrder;
    this.refreshGrid();
  }

  attendanceClass(attendance: number): string {
    if (attendance >= 90) return 'attendance attendance--good';
    if (attendance >= 75) return 'attendance attendance--warn';
    return 'attendance attendance--bad';
  }

  feeStatusClass(status: FeeStatus): string {
    return `fee-badge fee-badge--${status.toLowerCase()}`;
  }

  private refreshGrid(): void {
    let rows = this.allStudents;

    if (this.gradeFilter) {
      rows = rows.filter((s) => s.grade === this.gradeFilter);
    }
    if (this.feeStatusFilter) {
      rows = rows.filter((s) => s.feeStatus === this.feeStatusFilter);
    }

    const term = this.gridConfig.option.searchText;
    if (term) {
      rows = rows.filter((s) => [s.name, s.guardian, s.grade].some((v) => v.toLowerCase().includes(term)));
    }

    rows = this.sortRows(rows);

    const { offset = 0, pageSize = rows.length } = this.gridConfig.option;
    this.gridConfig.dataSource.data = rows.slice(offset, offset + pageSize);
    this.gridConfig.dataSource.totalRows = rows.length;
    this.gridConfig = { ...this.gridConfig };
  }

  private sortRows(rows: Student[]): Student[] {
    const { sortBy, sortOrder } = this.gridConfig.option;
    if (!sortBy) return rows;

    const key = sortBy === 'student' ? 'name' : (sortBy as keyof Student);
    const dir = sortOrder === 'DESC' ? -1 : 1;

    return [...rows].sort((a, b) => {
      const av = a[key];
      const bv = b[key];
      if (typeof av === 'number' && typeof bv === 'number') return (av - bv) * dir;
      return String(av).localeCompare(String(bv)) * dir;
    });
  }
}
