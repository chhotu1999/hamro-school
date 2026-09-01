import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AcademicManagementService } from '../../academic-management.service';
import { MvGrade, MvGradeTsk } from '../../models/grade.model';

export interface GradeFormData {
  action: 'add' | 'edit';
  selectedModel: MvGrade | null;
}

@Component({
  selector: 'grade-form',
  standalone: false,
  templateUrl: './grade-form.component.html',
  styleUrl: './grade-form.component.less',
})
export class GradeFormComponent {
  formGroup: FormGroup;
  saving = false;
  errorMessage: string | null = null;

  get isEdit(): boolean {
    return this.data.action === 'edit';
  }

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<GradeFormComponent, MvGradeTsk | undefined>,
    @Inject(MAT_DIALOG_DATA) public data: GradeFormData,
    private academicManagementService: AcademicManagementService,
  ) {
    const model = data.selectedModel;
    this.formGroup = this.fb.group({
      name: [model?.name ?? '', Validators.required],
      gradeTeacherId: [model?.gradeTeacherId ?? null],
      shiftStartTime: [model?.shiftStartTime ?? '', Validators.required],
      shiftEndTime: [model?.shiftEndTime ?? '', Validators.required],
    });
  }

  submitForm(): void {
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      return;
    }

    const value = this.formGroup.value;
    const payload: MvGradeTsk = {
      id: this.data.selectedModel?.id ?? 0,
      name: value.name,
      gradeTeacherId: value.gradeTeacherId,
      shiftStartTime: value.shiftStartTime,
      shiftEndTime: value.shiftEndTime,
    };

    this.saving = true;
    this.errorMessage = null;

    this.academicManagementService.saveGrade([payload]).subscribe({
      next: (response) => {
        this.saving = false;
        this.dialogRef.close(response.data?.[0] ?? payload);
      },
      error: () => {
        this.saving = false;
        this.errorMessage = "Couldn't save class. Please try again.";
      },
    });
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
