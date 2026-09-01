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
import { MvGradeSection } from '../models/grade.model';
import {
  GradeSectionFormComponent,
  GradeSectionFormData,
} from './grade-section-form/grade-section-form.component';
import { GradeSectionFormModule } from './grade-section-form/grade-section-form.module';
import { gridColumns } from './grade-section.column';

@Component({
  selector: 'app-grade-section',
  imports: [...SharedControls, GradeSectionFormModule, MatFormFieldModule, MatInputModule],
  templateUrl: './grade-section.html',
  styleUrl: './grade-section.less',
})
export class GradeSection implements OnInit, OnDestroy {
  private _unsubscribeAll = new Subject<void>();

  gridConfig: MvGridConfig<MvGradeSection> = {
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

  selectedRow: MvGradeSection = {} as MvGradeSection;

  constructor(
    private academicManagementService: AcademicManagementService,
    public dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.getGradeSection();
  }

  getGradeSection(): void {
    this.gridConfig.loading = true;
    this.gridConfig = { ...this.gridConfig };

    const param = { ...this.gridConfig.option, filter: {} };

    this.academicManagementService
      .getGradeSection(param)
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
    this.getGradeSection();
  }

  onPageChange(event: MvGridPaging): void {
    this.gridConfig.option.offset = event.offset;
    this.gridConfig.option.pageSize = event.pageSize;
    this.getGradeSection();
  }

  onSortChange(event: MvGridSorting): void {
    this.gridConfig.option.sortBy = event.sortBy;
    this.gridConfig.option.sortOrder = event.sortOrder;
    this.getGradeSection();
  }

  onRowDblClick(row: MvGradeSection): void {
    this.viewGradeSection(row);
  }

  onRowActionClick(event: { action: string; row: MvGradeSection }): void {
    if (event.action === 'edit') {
      this.viewGradeSection(event.row);
    }
  }

  viewGradeSection(row: MvGradeSection): void {
    this.selectedRow = { ...row };
    this.openDialog('edit');
  }

  addNew(): void {
    this.selectedRow = {} as MvGradeSection;
    this.openDialog('add');
  }

  openDialog(action: 'add' | 'edit'): void {
    const data: GradeSectionFormData = {
      action,
      selectedModel: action === 'edit' ? { ...this.selectedRow } : null,
    };

    const dialogRef = this.dialog.open(GradeSectionFormComponent, {
      width: '560px',
      data,
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((result) => {
        if (result) {
          this.getGradeSection();
        }
      });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
