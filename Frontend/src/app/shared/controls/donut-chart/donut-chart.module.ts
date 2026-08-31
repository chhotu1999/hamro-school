import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DonutChartComponent } from './donut-chart.component';

@NgModule({
  declarations: [DonutChartComponent],
  imports: [CommonModule],
  exports: [DonutChartComponent],
})
export class DonutChartModule {}
