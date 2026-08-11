import { DecimalPipe } from '@angular/common';
import { Component, computed, input } from '@angular/core';

export interface DonutDatum {
  label: string;
  value: number;
  color: string;
}

@Component({
  selector: 'ui-donut-chart',
  imports: [DecimalPipe],
  templateUrl: './donut-chart.html',
  styleUrl: './donut-chart.less',
})
export class DonutChart {
  data = input.required<DonutDatum[]>();

  total = computed(() => this.data().reduce((sum, d) => sum + d.value, 0));

  segments = computed(() => {
    const total = this.total();
    let acc = 0;
    return this.data().map((d) => {
      const pct = total ? (d.value / total) * 100 : 0;
      const start = acc;
      acc += pct;
      return { ...d, pct, start, end: acc };
    });
  });

  gradient = computed(() => {
    const stops = this.segments().map((s) => `${s.color} ${s.start}% ${s.end}%`);
    return `conic-gradient(${stops.join(', ')})`;
  });
}
