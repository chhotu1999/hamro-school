import { Component, ContentChildren, EventEmitter, Input, Output, QueryList, TemplateRef } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatGridCellContext, MatGridCellTemplateDirective } from './mat-cell-template.directive';
import { MvGridColumn, MvGridConfig } from './mat-grid.model';

/**
 * Thin, server-driven table: the grid only renders whatever page of rows it's
 * handed via `[config]` and emits `onPageChange`/`onSortChange`/etc. so the
 * owning page can refetch — it doesn't own filtering, sorting, or paging
 * itself. Mirrors DanfeERP's `shared/controls/mat-grid` `[config]` contract.
 */
@Component({
  selector: 'mat-grid',
  standalone: false,
  templateUrl: './mat-grid.component.html',
  styleUrl: './mat-grid.component.less',
})
export class MatGridComponent<T = unknown> {
  @Output() onRowActionClick = new EventEmitter<{ action: string; row: T }>();
  @Output() onRowDblClick = new EventEmitter<T>();
  @Output() onRowClick = new EventEmitter<T>();
  @Output() onPageChange = new EventEmitter<{ offset: number; pageSize: number }>();
  @Output() onSortChange = new EventEmitter<{ sortBy: string; sortOrder: string }>();

  @Input('config') set config(conf: MvGridConfig<T>) {
    if (!conf) return;
    this.gridConfig = conf;
    this.gridColumns = conf.columns || [];
    this.displayedColumns = this.gridColumns.map((c) => c.name);
    this.loading = conf.loading;
    this.dataSource.data = conf.dataSource?.data || [];
  }

  @ContentChildren(MatGridCellTemplateDirective)
  cellTemplates!: QueryList<MatGridCellTemplateDirective<T>>;

  gridConfig: MvGridConfig<T> = {
    columns: [],
    dataSource: { data: [], totalRows: 0 },
    loading: false,
    option: { offset: 0, pageSize: 10 },
  };
  gridColumns: MvGridColumn[] = [];
  displayedColumns: string[] = [];
  dataSource = new MatTableDataSource<T>([]);
  loading = false;
  selectedRow: T | null = null;

  templateFor(name: string): TemplateRef<MatGridCellContext<T>> | null {
    return this.cellTemplates?.find((t) => t.name === name)?.templateRef ?? null;
  }

  cellValue(row: T, column: MvGridColumn): unknown {
    return (row as Record<string, unknown>)[column.name];
  }

  rowClick(row: T): void {
    this.selectedRow = row;
    this.onRowClick.emit(row);
  }

  rowDblClick(row: T): void {
    this.selectedRow = row;
    this.onRowDblClick.emit(row);
  }

  rowActionClick(action: string, row: T): void {
    this.selectedRow = row;
    this.onRowActionClick.emit({ action, row });
  }

  pageChange(event: PageEvent): void {
    this.onPageChange.emit({ offset: event.pageIndex * event.pageSize, pageSize: event.pageSize });
  }

  sortChange(event: Sort): void {
    if (!event.active || !event.direction) return;
    this.onSortChange.emit({ sortBy: event.active, sortOrder: event.direction.toUpperCase() });
  }
}
