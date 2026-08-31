import { Component, EventEmitter, Input, Output, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'mat-dropdown',
  standalone: false,
  templateUrl: './mat-dropdown.component.html',
  styleUrl: './mat-dropdown.component.less',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MatDropdownComponent),
      multi: true,
    },
  ],
})
export class MatDropdownComponent<T = unknown> implements ControlValueAccessor {
  @Input() data: T[] = [];
  @Input() valueField = 'value';
  @Input() nameField = 'name';
  @Input() placeholder = '';
  @Input() multiSelect = false;
  @Input() disabled = false;

  /** Fires alongside the form's own valueChanges, for consumers not using a FormControl. */
  @Output() selectionChange = new EventEmitter<unknown>();

  value: unknown = null;

  private onChange: (value: unknown) => void = () => {};
  private onTouched: () => void = () => {};

  optionValue(item: T): unknown {
    return (item as Record<string, unknown>)[this.valueField];
  }

  optionLabel(item: T): string {
    return String((item as Record<string, unknown>)[this.nameField] ?? '');
  }

  onSelectionChange(value: unknown): void {
    this.value = value;
    this.onChange(value);
    this.selectionChange.emit(value);
  }

  onBlur(): void {
    this.onTouched();
  }

  writeValue(value: unknown): void {
    this.value = value;
  }

  registerOnChange(fn: (value: unknown) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
