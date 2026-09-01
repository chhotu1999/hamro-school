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
import { AcademicManagementService } from '../academic-management.service';
import { MvGrade } from '../models/grade.model';
import { GradeFormComponent, GradeFormData } from './grade-form/grade-form.component';
import { GradeFormModule } from './grade-form/grade-form.module';
import { gridColumns } from './grade.column';

@Component({
  selector: 'app-grade',
  imports: [...SharedControls, GradeFormModule, MatFormFieldModule, MatInputModule],
  templateUrl: './grade.html',
  styleUrl: './grade.less',
})
export class Grade implements OnInit, OnDestroy {
  private _unsubscribeAll = new Subject<void>();

  gridConfig: MvGridConfig<MvGrade> = {
    columns: gridColumns,
    dataSource: { data: [], totalRows: 0 },
    loading: true,
    option: {
      searchText: '',
      offset: 0,
      pageSize: 10,
      sortBy: 'name',
      sortOrder: 'ASC',
    },
  };

  selectedRow: MvGrade = {} as MvGrade;

  constructor(
    private academicManagementService: AcademicManagementService,
    public dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.getGrade();
  }

  getGrade(): void {
    this.gridConfig.loading = true;
    this.gridConfig = { ...this.gridConfig };

    const param = { ...this.gridConfig.option, filter: {} };

    this.academicManagementService
      .getGrade(param)
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
    this.getGrade();
  }

  onPageChange(event: MvGridPaging): void {
    this.gridConfig.option.offset = event.offset;
    this.gridConfig.option.pageSize = event.pageSize;
    this.getGrade();
  }

  onSortChange(event: MvGridSorting): void {
    this.gridConfig.option.sortBy = event.sortBy;
    this.gridConfig.option.sortOrder = event.sortOrder;
    this.getGrade();
  }

  onRowDblClick(row: MvGrade): void {
    this.viewGrade(row);
  }

  onRowActionClick(event: { action: string; row: MvGrade }): void {
    if (event.action === 'edit') {
      this.viewGrade(event.row);
    }
  }

  viewGrade(row: MvGrade): void {
    this.selectedRow = { ...row };
    this.openDialog('edit');
  }

  addNew(): void {
    this.selectedRow = {} as MvGrade;
    this.openDialog('add');
  }

  openDialog(action: 'add' | 'edit'): void {
    const data: GradeFormData = {
      action,
      selectedModel: action === 'edit' ? { ...this.selectedRow } : null,
    };

    const dialogRef = this.dialog.open(GradeFormComponent, {
      width: '560px',
      data,
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((result) => {
        if (result) {
          this.getGrade();
        }
      });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
