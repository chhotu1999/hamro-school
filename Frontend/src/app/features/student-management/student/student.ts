import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Subject, takeUntil } from 'rxjs';
import { SharedControls } from '../../../shared/common-shared';
import {
  MvGridConfig,
  MvGridPaging,
  MvGridSorting,
} from '../../../shared/controls/mat-grid/mat-grid.model';
import { StudentManagementService } from '../student-management.service';
import { MvStudent } from '../models/student.model';
import { StudentFormComponent, StudentFormData } from './student-form/student-form.component';
import { StudentFormModule } from './student-form/student-form.module';
import { gridColumns } from './student.column';

@Component({
  selector: 'app-student',
  imports: [...SharedControls, StudentFormModule, MatFormFieldModule, MatInputModule],
  templateUrl: './student.html',
  styleUrl: './student.less',
})
export class Student implements OnInit, OnDestroy {
  private _unsubscribeAll = new Subject<void>();

  gridConfig: MvGridConfig<MvStudent> = {
    columns: gridColumns,
    dataSource: { data: [], totalRows: 0 },
    loading: true,
    option: {
      searchText: '',
      offset: 0,
      pageSize: 10,
      sortBy: 'fullName',
      sortOrder: 'ASC',
    },
  };

  selectedRow: MvStudent = {} as MvStudent;

  constructor(
    private studentManagementService: StudentManagementService,
    public dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.getStudent();
  }

  getStudent(): void {
    this.gridConfig.loading = true;
    this.gridConfig = { ...this.gridConfig };

    const param = { ...this.gridConfig.option, filter: {} };

    this.studentManagementService
      .getStudent(param)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe({
        next: (response) => {
          this.gridConfig.dataSource.data = response.data?.data ?? [];
          this.gridConfig.dataSource.totalRows = response.data?.totalRows ?? 0;
          this.gridConfig.loading = false;
          this.gridConfig = { ...this.gridConfig };
        },
        error: () => {
          this.gridConfig.dataSource.data = [];
          this.gridConfig.dataSource.totalRows = 0;
          this.gridConfig.loading = false;
          this.gridConfig = { ...this.gridConfig };
        },
      });
  }

  searchChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.gridConfig.option.searchText = value.trim();
    this.gridConfig.option.offset = 0;
    this.getStudent();
  }

  onPageChange(event: MvGridPaging): void {
    this.gridConfig.option.offset = event.offset;
    this.gridConfig.option.pageSize = event.pageSize;
    this.getStudent();
  }

  onSortChange(event: MvGridSorting): void {
    this.gridConfig.option.sortBy = event.sortBy;
    this.gridConfig.option.sortOrder = event.sortOrder;
    this.getStudent();
  }

  onRowDblClick(row: MvStudent): void {
    this.viewStudent(row);
  }

  onRowActionClick(event: { action: string; row: MvStudent }): void {
    if (event.action === 'edit') {
      this.viewStudent(event.row);
    }
  }

  viewStudent(row: MvStudent): void {
    this.selectedRow = { ...row };
    this.openDialog('edit');
  }

  addNew(): void {
    this.selectedRow = {} as MvStudent;
    this.openDialog('add');
  }

  openDialog(action: 'add' | 'edit'): void {
    const data: StudentFormData = {
      action,
      selectedModel: action === 'edit' ? { ...this.selectedRow } : null,
    };

    const dialogRef = this.dialog.open(StudentFormComponent, {
      width: '640px',
      data,
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((result) => {
        if (result) {
          this.getStudent();
        }
      });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
