import { HttpParams } from '@angular/common/http';

type ParamPrimitive = string | number | boolean;
type ParamValue = ParamPrimitive | readonly ParamPrimitive[];

/**
 * Flattens a (possibly nested) object into ASP.NET Core's default [FromQuery]
 * model-binding shape: nested properties become dot-separated keys
 * (e.g. `Filter.AcademicYearId`) and arrays become repeated query params.
 */
export function toHttpParams(value: object): HttpParams {
  const flat: Record<string, ParamValue> = {};
  flatten(value, '', flat);
  return new HttpParams({ fromObject: flat });
}

function flatten(value: unknown, prefix: string, result: Record<string, ParamValue>): void {
  if (value === null || value === undefined) {
    return;
  }
  if (Array.isArray(value)) {
    if (value.length) {
      result[prefix] = value as ParamPrimitive[];
    }
    return;
  }
  if (typeof value === 'object') {
    for (const [key, val] of Object.entries(value)) {
      flatten(val, prefix ? `${prefix}.${key}` : key, result);
    }
    return;
  }
  result[prefix] = value as ParamPrimitive;
}
