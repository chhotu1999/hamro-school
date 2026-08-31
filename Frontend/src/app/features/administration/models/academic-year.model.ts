/**
 * Mirrors HamroSchool.Model.Application.Administration.V1 (backend), using
 * the API's camelCase wire format (see shared/models/response.model.ts).
 */
export interface MvAcademicYear {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  mitiStartDate: string;
  mitiEndDate: string;
  createdBy?: string | null;
  userId?: number | null;
}

export interface MvAcademicYearList {
  id: number;
  name: string;
}

export interface MvParamAcademicYearFilter {
  academicYearId?: number[] | null;
}
