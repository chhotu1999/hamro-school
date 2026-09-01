/**
 * Mirrors HamroSchool.Model.Application.Student_Management.V1 (backend), using
 * the API's camelCase wire format (see shared/models/response.model.ts).
 */
export interface MvStudent {
  id: number;
  rollNo?: number | null;
  firstName: string;
  lastName: string;
  fullName?: string | null;
  genderListItemId?: number | null;
  gender?: string | null;
  dob?: string | null;
  permanentAddress?: string | null;
  currentAddress?: string | null;
  bloodGroupListItemId?: number | null;
  bloodGroup?: string | null;
  imageUrl?: string | null;
  enrollmentId?: number | null;
  academicYearId: number;
  academicYear?: string | null;
  gradeId: number;
  grade?: string | null;
  gradeSectionId?: number | null;
  gradeSection?: string | null;
  roleId: number;
  studentStatusListItemId: number;
  studentStatus?: string | null;
  userId?: number | null;
  createdBy?: string | null;
}

export interface MvStudentList {
  id: number;
  name: string;
}

export interface MvParamStudentFilter {
  studentIdList?: number[] | null;
  academicYearIdList?: number[] | null;
  gradeIdList?: number[] | null;
  gradeSectionIdList?: number[] | null;
  genderListItemIdList?: number[] | null;
  studentStatusListItemIdList?: number[] | null;
}

export interface MvStudentContact {
  id: number;
  studentId: number;
  student?: string | null;
  firstName: string;
  lastName: string;
  fullName?: string | null;
  genderListItemId?: number | null;
  gender?: string | null;
  phone?: string | null;
  email?: string | null;
  occupation?: string | null;
  permanentAddress?: string | null;
  currentAddress?: string | null;
  relationship: string;
  userId?: number | null;
  createdBy?: string | null;
}

export interface MvStudentContactList {
  id: number;
  name: string;
}

export interface MvParamStudentContactFilter {
  studentContactIdList?: number[] | null;
  studentIdList?: number[] | null;
  genderListItemIdList?: number[] | null;
}

/** Insert-only admission/promotion trail — never updated. */
export interface MvStudentEnrollment {
  id: number;
  studentId: number;
  student?: string | null;
  fromAcademicYearId?: number | null;
  fromAcademicYear?: string | null;
  toAcademicYearId: number;
  toAcademicYear?: string | null;
  fromGradeId?: number | null;
  fromGrade?: string | null;
  toGradeId: number;
  toGrade?: string | null;
  toGradeSectionId?: number | null;
  toGradeSection?: string | null;
  transitionAt?: string | null;
  transitionDateMiti?: string | null;
  userId?: number | null;
  transitionByUser?: string | null;
}
