import { Component, computed } from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { SharedControls } from '../../shared/common-shared';
import { BarSeries } from '../../shared/controls/bar-chart/bar-chart.component';
import { BarChartModule } from '../../shared/controls/bar-chart/bar-chart.module';
import { DonutDatum } from '../../shared/controls/donut-chart/donut-chart.component';
import { DonutChartModule } from '../../shared/controls/donut-chart/donut-chart.module';
import { IconName } from '../../shared/controls/icon/icon.component';
import { RankedItem } from '../../shared/controls/ranked-list/ranked-list.component';
import { RankedListModule } from '../../shared/controls/ranked-list/ranked-list.module';
import { StatCardModule } from '../../shared/controls/stat-card/stat-card.module';
import { injectQueryParamPage } from '../../shared/utils/query-param-page.util';

interface StatCardData {
  icon: IconName;
  label: string;
  value: string;
  delta: number;
}

const ATTENDANCE_PAGE_SIZE = 3;

@Component({
  selector: 'app-dashboard',
  imports: [
    ...SharedControls,
    StatCardModule,
    BarChartModule,
    DonutChartModule,
    RankedListModule,
    MatPaginatorModule,
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.less',
})
export class Dashboard {
  statCards: StatCardData[] = [
    { icon: 'users', label: 'Total Students', value: '1,247', delta: 2.5 },
    { icon: 'wallet', label: 'Fee Collected', value: 'Rs 34.6L', delta: -0.6 },
    { icon: 'book', label: 'Total Classes', value: '42', delta: 0.2 },
    { icon: 'chart-bar', label: 'Total Absences', value: '89', delta: 0.12 },
  ];

  barCategories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  barSeries: BarSeries[] = [
    {
      name: 'Collected',
      color: 'var(--chart-blue)',
      data: [32000, 41000, 28000, 52000, 60000, 38000, 45000, 50000, 33000, 58000, 62000, 47000],
    },
    {
      name: 'Target',
      color: 'var(--chart-orange)',
      data: [38000, 36000, 34000, 48000, 55000, 42000, 48000, 46000, 40000, 52000, 58000, 50000],
    },
  ];

  formatCurrency = (value: number) => `Rs ${value.toLocaleString()}`;

  donutData: DonutDatum[] = [
    { label: 'Grade 10', value: 25, color: 'var(--chart-1)' },
    { label: 'Grade 9', value: 17, color: 'var(--chart-9)' },
    { label: 'Grade 8', value: 13, color: 'var(--chart-2)' },
    { label: 'Grade 7', value: 12, color: 'var(--chart-8)' },
    { label: 'Grade 6', value: 9, color: 'var(--chart-4)' },
    { label: 'Grade 5', value: 8, color: 'var(--chart-3)' },
    { label: 'Grade 4', value: 6, color: 'var(--chart-6)' },
    { label: 'Grade 3', value: 5, color: 'var(--chart-5)' },
    { label: 'Grade 2', value: 3, color: 'var(--chart-7)' },
    { label: 'Grade 1', value: 2, color: 'var(--chart-10)' },
  ];

  attendanceItems: RankedItem[] = [
    { label: 'Section A', value: 19 },
    { label: 'Section B', value: 15 },
    { label: 'Section C', value: 13 },
    { label: 'Section D', value: 12 },
    { label: 'Section E', value: 11 },
    { label: 'Section F', value: 11 },
    { label: 'Section G', value: 11 },
    { label: 'Section H', value: 10 },
    { label: 'Section I', value: 9 },
  ];

  private attendancePaging = injectQueryParamPage('page');
  attendancePage = this.attendancePaging.page;
  attendancePageCount = computed(() => Math.ceil(this.attendanceItems.length / ATTENDANCE_PAGE_SIZE));

  pagedAttendanceItems = computed(() => {
    const start = (this.attendancePage() - 1) * ATTENDANCE_PAGE_SIZE;
    return this.attendanceItems.slice(start, start + ATTENDANCE_PAGE_SIZE);
  });

  onAttendancePageChange(event: PageEvent): void {
    this.attendancePaging.setPage(event.pageIndex + 1);
  }
}
