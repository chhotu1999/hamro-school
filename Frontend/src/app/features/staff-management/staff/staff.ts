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
import { StaffManagementService } from '../staff-management.service';
import { MvStaff } from '../models/staff.model';
import { StaffFormComponent, StaffFormData } from './staff-form/staff-form.component';
import { StaffFormModule } from './staff-form/staff-form.module';
import { gridColumns } from './staff.column';

@Component({
  selector: 'app-staff',
  imports: [...SharedControls, StaffFormModule, MatFormFieldModule, MatInputModule],
  templateUrl: './staff.html',
  styleUrl: './staff.less',
})
export class Staff implements OnInit, OnDestroy {
  private _unsubscribeAll = new Subject<void>();

  gridConfig: MvGridConfig<MvStaff> = {
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

  selectedRow: MvStaff = {} as MvStaff;

  constructor(
    private staffManagementService: StaffManagementService,
    public dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.getStaff();
  }

  getStaff(): void {
    this.gridConfig.loading = true;
    this.gridConfig = { ...this.gridConfig };

    const param = { ...this.gridConfig.option, filter: {} };

    this.staffManagementService
      .getStaff(param)
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
    this.getStaff();
  }

  onPageChange(event: MvGridPaging): void {
    this.gridConfig.option.offset = event.offset;
    this.gridConfig.option.pageSize = event.pageSize;
    this.getStaff();
  }

  onSortChange(event: MvGridSorting): void {
    this.gridConfig.option.sortBy = event.sortBy;
    this.gridConfig.option.sortOrder = event.sortOrder;
    this.getStaff();
  }

  onRowDblClick(row: MvStaff): void {
    this.viewStaff(row);
  }

  onRowActionClick(event: { action: string; row: MvStaff }): void {
    if (event.action === 'edit') {
      this.viewStaff(event.row);
    }
  }

  viewStaff(row: MvStaff): void {
    this.selectedRow = { ...row };
    this.openDialog('edit');
  }

  addNew(): void {
    this.selectedRow = {} as MvStaff;
    this.openDialog('add');
  }

  openDialog(action: 'add' | 'edit'): void {
    const data: StaffFormData = {
      action,
      selectedModel: action === 'edit' ? { ...this.selectedRow } : null,
    };

    const dialogRef = this.dialog.open(StaffFormComponent, {
      width: '640px',
      data,
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((result) => {
        if (result) {
          this.getStaff();
        }
      });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
