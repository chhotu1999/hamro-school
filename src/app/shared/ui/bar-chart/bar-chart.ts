import { Component, computed, input, signal } from '@angular/core';

export interface BarSeries {
  name: string;
  color: string;
  data: number[];
}

@Component({
  selector: 'ui-bar-chart',
  templateUrl: './bar-chart.html',
  styleUrl: './bar-chart.less',
})
export class BarChart {
  categories = input.required<string[]>();
  series = input.required<BarSeries[]>();
  valueFormatter = input<(value: number) => string>((value) => value.toLocaleString());

  hovered = signal<number | null>(null);

  maxValue = computed(() => Math.max(...this.series().flatMap((s) => s.data), 0));

  private magnitude = computed(() => {
    const max = this.maxValue();
    return max === 0 ? 1 : Math.pow(10, Math.floor(Math.log10(max)));
  });

  niceMax = computed(() => {
    const max = this.maxValue();
    const mag = this.magnitude();
    return max === 0 ? 10 : Math.ceil(max / mag) * mag;
  });

  gridLines = computed(() => {
    const top = this.niceMax();
    const step = this.magnitude();
    const count = Math.round(top / step);
    return Array.from({ length: count + 1 }, (_, i) => top - step * i);
  });

  hoveredSeriesData = computed(() => {
    const i = this.hovered();
    if (i === null) return null;
    return this.series().map((s) => ({ name: s.name, color: s.color, value: s.data[i] }));
  });

  barHeight(value: number): number {
    const max = this.niceMax();
    return max ? (value / max) * 100 : 0;
  }

  formatAxis(value: number): string {
    return value >= 1000 ? `${Math.round(value / 1000)}K` : `${Math.round(value)}`;
  }

  onEnter(i: number): void {
    this.hovered.set(i);
  }

  onLeave(): void {
    this.hovered.set(null);
  }
}
