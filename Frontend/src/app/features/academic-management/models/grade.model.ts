/**
 * Mirrors HamroSchool.Model.Application.Academic_Management.V1 (backend), using
 * the API's camelCase wire format (see shared/models/response.model.ts).
 * TimeSpan fields (shiftStartTime/shiftEndTime) come over the wire as "HH:mm:ss" strings.
 */
export interface MvGrade {
  id: number;
  name: string;
  gradeTeacherId?: number | null;
  gradeTeacher?: string | null;
  shiftStartTime: string;
  shiftEndTime: string;
  totalSection: number;
  totalStudent: number;
  sections?: MvGradeSection[] | null;
  userId?: number | null;
  createdBy?: string | null;
}

export interface MvGradeList {
  id: number;
  name: string;
}

/** Insert/update payload for the Grade endpoint. */
export interface MvGradeTsk {
  id: number;
  name: string;
  gradeTeacherId?: number | null;
  gradeTeacher?: string | null;
  shiftStartTime: string;
  shiftEndTime: string;
  sectionList?: MvGradeSection[] | null;
  userId?: number | null;
  createdBy?: string | null;
}

export interface MvParamGradeFilter {
  gradeIdList?: number[] | null;
  gradeTeacherIdList?: number[] | null;
}

/** Grid/detail AND insert/update record for GradeSection. */
export interface MvGradeSection {
  id: number;
  gradeId: number;
  grade?: string | null;
  name: string;
  roomNo?: string | null;
  totalCapacity?: number | null;
  totalStudent: number;
  shiftStartTime?: string | null;
  shiftEndTime?: string | null;
  userId?: number | null;
  createdBy?: string | null;
}

export interface MvGradeSectionList {
  id: number;
  name: string;
}

export interface MvParamGradeSectionFilter {
  gradeSectionIdList?: number[] | null;
  gradeIdList?: number[] | null;
}
