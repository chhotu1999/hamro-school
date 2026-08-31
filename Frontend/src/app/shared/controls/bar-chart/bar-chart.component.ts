import { Component, Input } from '@angular/core';

export interface BarSeries {
  name: string;
  color: string;
  data: number[];
}

@Component({
  selector: 'ui-bar-chart',
  standalone: false,
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.less',
})
export class BarChartComponent {
  @Input({ required: true }) categories!: string[];
  @Input({ required: true }) series!: BarSeries[];
  @Input() valueFormatter: (value: number) => string = (value) => value.toLocaleString();

  hovered: number | null = null;

  get maxValue(): number {
    return Math.max(...this.series.flatMap((s) => s.data), 0);
  }

  private get magnitude(): number {
    const max = this.maxValue;
    return max === 0 ? 1 : Math.pow(10, Math.floor(Math.log10(max)));
  }

  get niceMax(): number {
    const max = this.maxValue;
    const mag = this.magnitude;
    return max === 0 ? 10 : Math.ceil(max / mag) * mag;
  }

  get gridLines(): number[] {
    const top = this.niceMax;
    const step = this.magnitude;
    const count = Math.round(top / step);
    return Array.from({ length: count + 1 }, (_, i) => top - step * i);
  }

  get hoveredSeriesData(): { name: string; color: string; value: number }[] | null {
    const i = this.hovered;
    if (i === null) return null;
    return this.series.map((s) => ({ name: s.name, color: s.color, value: s.data[i] }));
  }

  barHeight(value: number): number {
    const max = this.niceMax;
    return max ? (value / max) * 100 : 0;
  }

  formatAxis(value: number): string {
    return value >= 1000 ? `${Math.round(value / 1000)}K` : `${Math.round(value)}`;
  }

  onEnter(i: number): void {
    this.hovered = i;
  }

  onLeave(): void {
    this.hovered = null;
  }
}
