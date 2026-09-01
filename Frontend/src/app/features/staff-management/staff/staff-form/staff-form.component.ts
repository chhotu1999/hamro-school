import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { StaffManagementService } from '../../staff-management.service';
import { MvStaff } from '../../models/staff.model';

export interface StaffFormData {
  action: 'add' | 'edit';
  selectedModel: MvStaff | null;
}

@Component({
  selector: 'staff-form',
  standalone: false,
  templateUrl: './staff-form.component.html',
  styleUrl: './staff-form.component.less',
})
export class StaffFormComponent {
  formGroup: FormGroup;
  saving = false;
  errorMessage: string | null = null;

  get isEdit(): boolean {
    return this.data.action === 'edit';
  }

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<StaffFormComponent, MvStaff | undefined>,
    @Inject(MAT_DIALOG_DATA) public data: StaffFormData,
    private staffManagementService: StaffManagementService,
  ) {
    const model = data.selectedModel;
    this.formGroup = this.fb.group({
      staffNo: [model?.staffNo ?? '', Validators.required],
      firstName: [model?.firstName ?? '', Validators.required],
      lastName: [model?.lastName ?? '', Validators.required],
      roleId: [model?.roleId ?? null, Validators.required],
      genderListItemId: [model?.genderListItemId ?? null],
      dob: [model?.dob ? new Date(model.dob) : null],
      email: [model?.email ?? ''],
      phone: [model?.phone ?? ''],
      qualification: [model?.qualification ?? ''],
      salary: [model?.salary ?? null],
      permanentAddress: [model?.permanentAddress ?? ''],
      currentAddress: [model?.currentAddress ?? ''],
      bloodGroupListItemId: [model?.bloodGroupListItemId ?? null],
      maritalStatusListItemId: [model?.maritalStatusListItemId ?? null],
      staffStatusListItemId: [model?.staffStatusListItemId ?? null],
    });
  }

  submitForm(): void {
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      return;
    }

    const value = this.formGroup.value;
    const payload: MvStaff = {
      id: this.data.selectedModel?.id ?? 0,
      staffNo: value.staffNo,
      firstName: value.firstName,
      lastName: value.lastName,
      roleId: value.roleId,
      genderListItemId: value.genderListItemId,
      dob: value.dob ? (value.dob as Date).toISOString() : null,
      email: value.email,
      phone: value.phone,
      qualification: value.qualification,
      salary: value.salary,
      permanentAddress: value.permanentAddress,
      currentAddress: value.currentAddress,
      bloodGroupListItemId: value.bloodGroupListItemId,
      maritalStatusListItemId: value.maritalStatusListItemId,
      staffStatusListItemId: value.staffStatusListItemId,
    };

    this.saving = true;
    this.errorMessage = null;

    this.staffManagementService.saveStaff([payload]).subscribe({
      next: (response) => {
        this.saving = false;
        this.dialogRef.close(response.data?.[0] ?? payload);
      },
      error: () => {
        this.saving = false;
        this.errorMessage = "Couldn't save staff. Please try again.";
      },
    });
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
