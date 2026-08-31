/**
 * Mirrors HamroSchool.Model.Shared.Parameter.MvParamReqOption<T> (backend).
 * Wraps a feature-specific filter with the paging/sorting/search options every
 * grid endpoint accepts. Property names are camelCase to match the API's
 * Newtonsoft camelCase serialization (see response.model.ts); ASP.NET Core's
 * [FromQuery] model binding is case-insensitive, so this camelCase shape
 * binds fine against the PascalCase C# properties.
 */
export interface MvParamReqOption<TFilter> {
  searchText?: string | null;
  operator?: string | null;
  offset: number;
  pageSize: number;
  sortBy?: string | null;
  sortOrder?: string | null;
  filter: TFilter;
}

export interface MvParamListItemListFilter {
  categoryId?: number | null;
  category?: string | null;
}
