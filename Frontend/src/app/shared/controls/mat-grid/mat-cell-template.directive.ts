import { Directive, Input, TemplateRef } from '@angular/core';

export interface MatGridCellContext<T> {
  $implicit: T;
  row: T;
}

/**
 * Marks an `<ng-template>` as the custom cell renderer for the column whose
 * name matches: `<ng-template matCellFor="actions" let-row>...</ng-template>`.
 * Pairs with a column of `type: 'template'` in the grid config.
 */
@Directive({
  selector: 'ng-template[matCellFor]',
  standalone: false,
})
export class MatGridCellTemplateDirective<T = unknown> {
  @Input('matCellFor') name!: string;

  constructor(public templateRef: TemplateRef<MatGridCellContext<T>>) {}
}
