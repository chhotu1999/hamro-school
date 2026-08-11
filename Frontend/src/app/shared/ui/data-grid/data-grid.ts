import { NgTemplateOutlet } from '@angular/common';
import { Component, OnInit, TemplateRef, computed, contentChildren, input, output, signal } from '@angular/core';
import { Icon } from '../icon/icon';
import { Pagination } from '../pagination/pagination';
import { DataGridCellContext, DataGridCellTemplate } from './cell-template.directive';
import { DataGridColumn, DataGridFilter, SortDirection } from './data-grid.types';

const DEFAULT_PAGE_SIZE = 8;

@Component({
  selector: 'data-grid',
  imports: [Icon, Pagination, NgTemplateOutlet],
  templateUrl: './data-grid.html',
  styleUrl: './data-grid.less',
})
export class DataGrid<T = unknown> implements OnInit {
  rows = input.required<T[]>();
  columns = input.required<DataGridColumn<T>[]>();
  filters = input<DataGridFilter<T>[]>([]);
  searchableKeys = input<string[]>([]);
  searchPlaceholder = input('Search…');
  emptyMessage = input('No results found.');
  pageSize = input(DEFAULT_PAGE_SIZE);
  /** Seeds the internal page once (e.g. from a URL query param); the grid owns page state after that. */
  initialPage = input(1);
  trackBy = input<(row: T, index: number) => unknown>((_row, index) => index);

  /** Fires whenever the page changes, so a consumer can mirror it (e.g. into the URL). Not required. */
  pageChange = output<number>();

  cellTemplates = contentChildren(DataGridCellTemplate);

  search = signal('');
  activeFilters = signal<Record<string, string>>({});
  sortKey = signal<string | null>(null);
  sortDir = signal<SortDirection>('asc');
  page = signal(1);

  ngOnInit(): void {
    this.page.set(this.initialPage());
  }

  filteredRows = computed(() => {
    const term = this.search().trim().toLowerCase();
    const active = this.activeFilters();
    const filterDefs = this.filters();
    const keys = this.searchableKeys();

    return this.rows().filter((row) => {
      for (const f of filterDefs) {
        const value = active[f.key];
        if (!value) continue;
        const matches = f.predicate
          ? f.predicate(row, value)
          : String((row as Record<string, unknown>)[f.key]) === value;
        if (!matches) return false;
      }

      if (!term) return true;
      return keys.some((key) =>
        String((row as Record<string, unknown>)[key] ?? '')
          .toLowerCase()
          .includes(term),
      );
    });
  });

  sortedRows = computed(() => {
    const key = this.sortKey();
    const rows = this.filteredRows();
    if (!key) return rows;

    const column = this.columns().find((c) => c.key === key);
    const dir = this.sortDir() === 'asc' ? 1 : -1;

    return [...rows].sort((a, b) => {
      const av = this.cellValue(a, key, column?.accessor);
      const bv = this.cellValue(b, key, column?.accessor);
      if (av == null && bv == null) return 0;
      if (av == null) return -dir;
      if (bv == null) return dir;
      if (typeof av === 'number' && typeof bv === 'number') return (av - bv) * dir;
      return String(av).localeCompare(String(bv)) * dir;
    });
  });

  pageCount = computed(() => Math.max(1, Math.ceil(this.sortedRows().length / this.pageSize())));

  pagedRows = computed(() => {
    const currentPage = Math.min(this.page(), this.pageCount());
    const start = (currentPage - 1) * this.pageSize();
    return this.sortedRows().slice(start, start + this.pageSize());
  });

  cellValue(row: T, key: string, accessor?: (row: T) => unknown): unknown {
    return accessor ? accessor(row) : (row as Record<string, unknown>)[key];
  }

  templateFor(key: string): TemplateRef<DataGridCellContext<T>> | null {
    return this.cellTemplates().find((t) => t.uiCellFor() === key)?.templateRef ?? null;
  }

  onSearchInput(event: Event): void {
    this.search.set((event.target as HTMLInputElement).value);
    this.goToPage(1);
  }

  onFilterChange(key: string, event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.activeFilters.update((current) => ({ ...current, [key]: value }));
    this.goToPage(1);
  }

  onSort(column: DataGridColumn<T>): void {
    if (!column.sortable) return;
    if (this.sortKey() === column.key) {
      this.sortDir.update((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      this.sortKey.set(column.key);
      this.sortDir.set('asc');
    }
  }

  goToPage(page: number): void {
    this.page.set(page);
    this.pageChange.emit(page);
  }

  trackRow(index: number, row: T): unknown {
    return this.trackBy()(row, index);
  }
}
