import { Component, computed, input, output } from '@angular/core';
import { Icon } from '../icon/icon';
import { buildPageList } from './page-list';

@Component({
  selector: 'ui-pagination',
  imports: [Icon],
  templateUrl: './pagination.html',
  styleUrl: './pagination.less',
})
export class Pagination {
  page = input.required<number>();
  pageCount = input.required<number>();

  pageChange = output<number>();

  pageOptions = computed(() => Array.from({ length: this.pageCount() }, (_, i) => i + 1));
  pages = computed(() => buildPageList(this.page(), this.pageCount()));

  goTo(page: number): void {
    if (page < 1 || page > this.pageCount() || page === this.page()) return;
    this.pageChange.emit(page);
  }

  onSelectChange(event: Event): void {
    this.goTo(Number((event.target as HTMLSelectElement).value));
  }
}
