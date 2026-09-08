/**
 * Mirrors HamroSchool.Model.Shared.Base / Parameter (backend). Camel-cased
 * per the API's Newtonsoft camelCase serialization (see response.model.ts).
 */
export interface MvRoleList {
  id: number;
  name: string;
}

export interface MvParamRoleListFilter {
  searchText?: string | null;
}
