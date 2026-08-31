import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { Subscription } from 'rxjs';

/**
 * "Select all" checkbox for a multi-select `mat-select`/`mat-dropdown` bound
 * to a FormControl holding the array of selected values, e.g. dropped inside
 * a `mat-select multiple [formControl]="gradeFilter">` as the first option.
 */
@Component({
  selector: 'select-check-all',
  standalone: false,
  templateUrl: './select-check-all.component.html',
  styleUrl: './select-check-all.component.less',
})
export class SelectCheckAllComponent implements OnInit, OnChanges, OnDestroy {
  @Input({ required: true }) control!: FormControl<unknown[] | null>;
  @Input() values: (string | number)[] = [];
  @Input() text = 'Select all';

  checked = false;
  indeterminate = false;

  private subscription?: Subscription;

  ngOnInit(): void {
    this.subscription = this.control.valueChanges.subscribe(() => this.syncState());
    this.syncState();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['values']) {
      this.syncState();
    }
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  toggle(event: MatCheckboxChange): void {
    this.control.setValue(event.checked ? [...this.values] : []);
    this.control.markAsDirty();
  }

  private syncState(): void {
    const selected = (this.control.value ?? []) as unknown[];
    const selectedCount = this.values.filter((v) => selected.includes(v)).length;
    this.checked = this.values.length > 0 && selectedCount === this.values.length;
    this.indeterminate = selectedCount > 0 && selectedCount < this.values.length;
  }
}
