import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDropdownComponent } from './mat-dropdown.component';

@NgModule({
  declarations: [MatDropdownComponent],
  imports: [CommonModule, MatFormFieldModule, MatSelectModule],
  exports: [MatDropdownComponent],
})
export class MatDropdownModule {}
