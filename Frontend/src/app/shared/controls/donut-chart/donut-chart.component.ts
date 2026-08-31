import { Component, Input } from '@angular/core';

export interface DonutDatum {
  label: string;
  value: number;
  color: string;
}

interface DonutSegment extends DonutDatum {
  pct: number;
  start: number;
  end: number;
}

@Component({
  selector: 'ui-donut-chart',
  standalone: false,
  templateUrl: './donut-chart.component.html',
  styleUrl: './donut-chart.component.less',
})
export class DonutChartComponent {
  @Input({ required: true }) data!: DonutDatum[];

  get total(): number {
    return this.data.reduce((sum, d) => sum + d.value, 0);
  }

  get segments(): DonutSegment[] {
    const total = this.total;
    let acc = 0;
    return this.data.map((d) => {
      const pct = total ? (d.value / total) * 100 : 0;
      const start = acc;
      acc += pct;
      return { ...d, pct, start, end: acc };
    });
  }

  get gradient(): string {
    const stops = this.segments.map((s) => `${s.color} ${s.start}% ${s.end}%`);
    return `conic-gradient(${stops.join(', ')})`;
  }
}
