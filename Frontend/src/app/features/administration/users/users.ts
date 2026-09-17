import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Subject, takeUntil } from 'rxjs';
import { SharedControls } from '../../../shared/common-shared';
import { MvGridConfig, MvGridPaging, MvGridSorting } from '../../../shared/controls/mat-grid/mat-grid.model';
import { AdministrationService } from '../administration.service';
import { MvUser } from '../models/user.model';
import { gridColumns } from './users.column';

@Component({
  selector: 'app-users',
  imports: [...SharedControls, MatFormFieldModule, MatInputModule],
  templateUrl: './users.html',
  styleUrl: './users.less',
})
export class Users implements OnInit, OnDestroy {
  private _unsubscribeAll = new Subject<void>();

  gridConfig: MvGridConfig<MvUser> = {
    columns: gridColumns,
    dataSource: { data: [], totalRows: 0 },
    loading: true,
    option: {
      searchText: '',
      offset: 0,
      pageSize: 10,
      sortBy: 'username',
      sortOrder: 'ASC',
    },
  };

  constructor(private administrationService: AdministrationService) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.gridConfig.loading = true;
    this.gridConfig = { ...this.gridConfig };

    const param = { ...this.gridConfig.option, filter: {} };

    this.administrationService
      .getUsers(param)
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
    this.getUsers();
  }

  onPageChange(event: MvGridPaging): void {
    this.gridConfig.option.offset = event.offset;
    this.gridConfig.option.pageSize = event.pageSize;
    this.getUsers();
  }

  onSortChange(event: MvGridSorting): void {
    this.gridConfig.option.sortBy = event.sortBy;
    this.gridConfig.option.sortOrder = event.sortOrder;
    this.getUsers();
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
