/**
 * Mirrors HamroSchool.Model.Application.Staff_Management.V1 (backend), using
 * the API's camelCase wire format (see shared/models/response.model.ts).
 */
export interface MvStaff {
  id: number;
  staffNo: string;
  firstName: string;
  lastName: string;
  fullName?: string | null;
  genderListItemId?: number | null;
  gender?: string | null;
  dob?: string | null;
  email?: string | null;
  phone?: string | null;
  qualification?: string | null;
  roleId: number;
  role?: string | null;
  salary?: number | null;
  permanentAddress?: string | null;
  currentAddress?: string | null;
  socialSecurityInfo?: string | null;
  bloodGroupListItemId?: number | null;
  bloodGroup?: string | null;
  maritalStatusListItemId?: number | null;
  maritalStatus?: string | null;
  imageUrl?: string | null;
  staffStatusListItemId?: number | null;
  staffStatus?: string | null;
  userId?: number | null;
  createdBy?: string | null;
}

export interface MvStaffList {
  id: number;
  name: string;
}

export interface MvParamStaffFilter {
  staffIdList?: number[] | null;
  roleIdList?: number[] | null;
  genderListItemIdList?: number[] | null;
  staffStatusListItemIdList?: number[] | null;
}
