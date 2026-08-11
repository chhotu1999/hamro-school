import { Directive, TemplateRef, inject, input } from '@angular/core';

export interface DataGridCellContext<T> {
  $implicit: T;
  row: T;
}

/**
 * Marks an `<ng-template>` as the custom cell renderer for the column whose
 * key matches: `<ng-template uiCellFor="feeStatus" let-row>...</ng-template>`.
 */
@Directive({
  selector: 'ng-template[uiCellFor]',
})
export class DataGridCellTemplate<T = unknown> {
  uiCellFor = input.required<string>();
  templateRef = inject<TemplateRef<DataGridCellContext<T>>>(TemplateRef);
}
