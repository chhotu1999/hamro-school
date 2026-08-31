import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SelectCheckAllComponent } from './select-check-all.component';

@NgModule({
  declarations: [SelectCheckAllComponent],
  imports: [CommonModule, ReactiveFormsModule, MatCheckboxModule],
  exports: [SelectCheckAllComponent],
})
export class SelectCheckAllModule {}
