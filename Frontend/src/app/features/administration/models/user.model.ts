/**
 * Mirrors HamroSchool.Model.Application.Administration.V1.MvUser (backend),
 * using the API's camelCase wire format (see shared/models/response.model.ts).
 */
export interface MvUser {
  id: number;
  username: string;
  role?: string | null;
  isActive: boolean;
  isLocked: boolean;
}

export interface MvParamUserFilter {
  userIdList?: number[] | null;
  roleIdList?: number[] | null;
}
