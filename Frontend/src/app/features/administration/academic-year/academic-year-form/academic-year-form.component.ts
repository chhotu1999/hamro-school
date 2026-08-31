import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AdministrationService } from '../../administration.service';
import { MvAcademicYear } from '../../models/academic-year.model';

export interface AcademicYearFormData {
  action: 'add' | 'edit';
  selectedModel: MvAcademicYear | null;
}

@Component({
  selector: 'academic-year-form',
  standalone: false,
  templateUrl: './academic-year-form.component.html',
  styleUrl: './academic-year-form.component.less',
})
export class AcademicYearFormComponent {
  formGroup: FormGroup;
  saving = false;
  errorMessage: string | null = null;

  get isEdit(): boolean {
    return this.data.action === 'edit';
  }

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AcademicYearFormComponent, MvAcademicYear | undefined>,
    @Inject(MAT_DIALOG_DATA) public data: AcademicYearFormData,
    private administrationService: AdministrationService,
  ) {
    const model = data.selectedModel;
    this.formGroup = this.fb.group({
      name: [model?.name ?? '', Validators.required],
      startDate: [model ? new Date(model.startDate) : null, Validators.required],
      endDate: [model ? new Date(model.endDate) : null, Validators.required],
      mitiStartDate: [model?.mitiStartDate ?? '', Validators.required],
      mitiEndDate: [model?.mitiEndDate ?? '', Validators.required],
    });
  }

  submitForm(): void {
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      return;
    }

    const value = this.formGroup.value;
    const payload: MvAcademicYear = {
      id: this.data.selectedModel?.id ?? 0,
      name: value.name,
      startDate: (value.startDate as Date).toISOString(),
      endDate: (value.endDate as Date).toISOString(),
      mitiStartDate: value.mitiStartDate,
      mitiEndDate: value.mitiEndDate,
    };

    this.saving = true;
    this.errorMessage = null;

    this.administrationService.saveAcademicYear([payload]).subscribe({
      next: (response) => {
        this.saving = false;
        this.dialogRef.close(response.data?.[0] ?? payload);
      },
      error: () => {
        this.saving = false;
        this.errorMessage = "Couldn't save academic year. Please try again.";
      },
    });
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
