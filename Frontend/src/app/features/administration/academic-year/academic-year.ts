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
import { AdministrationService } from '../administration.service';
import { MvAcademicYear } from '../models/academic-year.model';
import {
  AcademicYearFormComponent,
  AcademicYearFormData,
} from './academic-year-form/academic-year-form.component';
import { AcademicYearFormModule } from './academic-year-form/academic-year-form.module';
import { gridColumns } from './academic-year.column';

@Component({
  selector: 'app-academic-year',
  imports: [...SharedControls, AcademicYearFormModule, MatFormFieldModule, MatInputModule],
  templateUrl: './academic-year.html',
  styleUrl: './academic-year.less',
})
export class AcademicYear implements OnInit, OnDestroy {
  private _unsubscribeAll = new Subject<void>();

  gridConfig: MvGridConfig<MvAcademicYear> = {
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

  selectedRow: MvAcademicYear = {} as MvAcademicYear;

  constructor(
    private administrationService: AdministrationService,
    public dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.getAcademicYear();
  }

  getAcademicYear(): void {
    this.gridConfig.loading = true;
    this.gridConfig = { ...this.gridConfig };

    const param = { ...this.gridConfig.option, filter: {} };

    this.administrationService
      .getAcademicYear(param)
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
    this.getAcademicYear();
  }

  onPageChange(event: MvGridPaging): void {
    this.gridConfig.option.offset = event.offset;
    this.gridConfig.option.pageSize = event.pageSize;
    this.getAcademicYear();
  }

  onSortChange(event: MvGridSorting): void {
    this.gridConfig.option.sortBy = event.sortBy;
    this.gridConfig.option.sortOrder = event.sortOrder;
    this.getAcademicYear();
  }

  onRowDblClick(row: MvAcademicYear): void {
    this.viewYear(row);
  }

  onRowActionClick(event: { action: string; row: MvAcademicYear }): void {
    if (event.action === 'edit') {
      this.viewYear(event.row);
    }
  }

  viewYear(row: MvAcademicYear): void {
    this.selectedRow = { ...row };
    this.openDialog('edit');
  }

  addNew(): void {
    this.selectedRow = {} as MvAcademicYear;
    this.openDialog('add');
  }

  openDialog(action: 'add' | 'edit'): void {
    const data: AcademicYearFormData = {
      action,
      selectedModel: action === 'edit' ? { ...this.selectedRow } : null,
    };

    const dialogRef = this.dialog.open(AcademicYearFormComponent, {
      width: '560px',
      data,
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((result) => {
        if (result) {
          this.getAcademicYear();
        }
      });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
