/**
 * Mirrors HamroSchool.Model.Shared.AppEnum.EnumResponse (backend). MvResponse.Type
 * is serialized as the enum member's name, so compare against these values
 * instead of hardcoding string literals at call sites.
 */
export enum EnumResponse {
  Success = 'Success',
  Exception = 'Exception',
  InvalidCredentials = 'InvalidCredentials',
  InvalidRequest = 'InvalidRequest',
  Unauthorized = 'Unauthorized',
  Failed = 'Failed',
  NoRecordFound = 'NoRecordFound',
  SomethingWentWrong = 'SomethingWentWrong',
}
