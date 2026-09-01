import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { StudentManagementService } from '../../student-management.service';
import { MvStudent } from '../../models/student.model';

export interface StudentFormData {
  action: 'add' | 'edit';
  selectedModel: MvStudent | null;
}

@Component({
  selector: 'student-form',
  standalone: false,
  templateUrl: './student-form.component.html',
  styleUrl: './student-form.component.less',
})
export class StudentFormComponent {
  formGroup: FormGroup;
  saving = false;
  errorMessage: string | null = null;

  get isEdit(): boolean {
    return this.data.action === 'edit';
  }

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<StudentFormComponent, MvStudent | undefined>,
    @Inject(MAT_DIALOG_DATA) public data: StudentFormData,
    private studentManagementService: StudentManagementService,
  ) {
    const model = data.selectedModel;
    this.formGroup = this.fb.group({
      rollNo: [model?.rollNo ?? null],
      firstName: [model?.firstName ?? '', Validators.required],
      lastName: [model?.lastName ?? '', Validators.required],
      academicYearId: [model?.academicYearId ?? null, Validators.required],
      gradeId: [model?.gradeId ?? null, Validators.required],
      gradeSectionId: [model?.gradeSectionId ?? null],
      roleId: [model?.roleId ?? null, Validators.required],
      studentStatusListItemId: [model?.studentStatusListItemId ?? null, Validators.required],
      genderListItemId: [model?.genderListItemId ?? null],
      dob: [model?.dob ? new Date(model.dob) : null],
      permanentAddress: [model?.permanentAddress ?? ''],
      currentAddress: [model?.currentAddress ?? ''],
      bloodGroupListItemId: [model?.bloodGroupListItemId ?? null],
    });
  }

  submitForm(): void {
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      return;
    }

    const value = this.formGroup.value;
    const payload: MvStudent = {
      id: this.data.selectedModel?.id ?? 0,
      rollNo: value.rollNo,
      firstName: value.firstName,
      lastName: value.lastName,
      academicYearId: value.academicYearId,
      gradeId: value.gradeId,
      gradeSectionId: value.gradeSectionId,
      roleId: value.roleId,
      studentStatusListItemId: value.studentStatusListItemId,
      genderListItemId: value.genderListItemId,
      dob: value.dob ? (value.dob as Date).toISOString() : null,
      permanentAddress: value.permanentAddress,
      currentAddress: value.currentAddress,
      bloodGroupListItemId: value.bloodGroupListItemId,
    };

    this.saving = true;
    this.errorMessage = null;

    this.studentManagementService.saveStudent([payload]).subscribe({
      next: (response) => {
        this.saving = false;
        this.dialogRef.close(response.data?.[0] ?? payload);
      },
      error: () => {
        this.saving = false;
        this.errorMessage = "Couldn't save student. Please try again.";
      },
    });
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
