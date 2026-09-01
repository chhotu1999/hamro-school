import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AcademicManagementService } from '../../academic-management.service';
import { MvGradeSection } from '../../models/grade.model';

export interface GradeSectionFormData {
  action: 'add' | 'edit';
  selectedModel: MvGradeSection | null;
}

@Component({
  selector: 'grade-section-form',
  standalone: false,
  templateUrl: './grade-section-form.component.html',
  styleUrl: './grade-section-form.component.less',
})
export class GradeSectionFormComponent {
  formGroup: FormGroup;
  saving = false;
  errorMessage: string | null = null;

  get isEdit(): boolean {
    return this.data.action === 'edit';
  }

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<GradeSectionFormComponent, MvGradeSection | undefined>,
    @Inject(MAT_DIALOG_DATA) public data: GradeSectionFormData,
    private academicManagementService: AcademicManagementService,
  ) {
    const model = data.selectedModel;
    this.formGroup = this.fb.group({
      gradeId: [model?.gradeId ?? null, Validators.required],
      name: [model?.name ?? '', Validators.required],
      roomNo: [model?.roomNo ?? ''],
      totalCapacity: [model?.totalCapacity ?? null],
      shiftStartTime: [model?.shiftStartTime ?? ''],
      shiftEndTime: [model?.shiftEndTime ?? ''],
    });
  }

  submitForm(): void {
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      return;
    }

    const value = this.formGroup.value;
    const payload: MvGradeSection = {
      id: this.data.selectedModel?.id ?? 0,
      gradeId: value.gradeId,
      name: value.name,
      roomNo: value.roomNo,
      totalCapacity: value.totalCapacity,
      totalStudent: this.data.selectedModel?.totalStudent ?? 0,
      shiftStartTime: value.shiftStartTime,
      shiftEndTime: value.shiftEndTime,
    };

    this.saving = true;
    this.errorMessage = null;

    this.academicManagementService.saveGradeSection([payload]).subscribe({
      next: (response) => {
        this.saving = false;
        this.dialogRef.close(response.data?.[0] ?? payload);
      },
      error: () => {
        this.saving = false;
        this.errorMessage = "Couldn't save section. Please try again.";
      },
    });
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
