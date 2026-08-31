/**
 * Mirrors HamroSchool.Model.Shared.Response (backend). The API serializes
 * with Newtonsoft's CamelCasePropertyNamesContractResolver, so property
 * names here are camelCase even though the C# records are PascalCase.
 */
export interface MvResponse<T> {
  type: string;
  message: string;
  data?: T | null;
  exception?: MvExceptionResponse[] | null;
}

export interface MvGridConfig<T> {
  data: T[];
  totalRows: number;
}

export interface MvExceptionResponse {
  title: string;
  description: string;
  exceptionType: string;
}

export interface MvFlagResponse {
  isSuccess: boolean;
}

export interface MvExistingRecordFlagResponse {
  isExist: boolean;
}
