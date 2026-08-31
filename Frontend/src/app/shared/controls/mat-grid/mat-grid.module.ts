import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatGridCellTemplateDirective } from './mat-cell-template.directive';
import { MatGridComponent } from './mat-grid.component';

@NgModule({
  declarations: [MatGridComponent, MatGridCellTemplateDirective],
  imports: [CommonModule, MatTableModule, MatSortModule, MatPaginatorModule, MatProgressBarModule],
  exports: [MatGridComponent, MatGridCellTemplateDirective],
})
export class MatGridModule {}
