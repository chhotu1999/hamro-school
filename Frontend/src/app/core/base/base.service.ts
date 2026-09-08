import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';

import { environment } from '../../../environments/environment';
import { MvParamRoleListFilter, MvRoleList } from '../../shared/models/base.model';
import { MvResponse } from '../../shared/models/response.model';
import { toHttpParams } from '../../shared/utils/http-params.util';

/**
 * Data access for the Shared Base API
 * (HamroSchool.API.Controllers.Shared.Base.V1.BaseController) — lookup
 * endpoints shared across features (roles, list items, etc.).
 */
@Injectable({ providedIn: 'root' })
export class BaseService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiBaseUrl}/Base`;

  /** GET Base/RoleList — flat list of roles for dropdowns. */
  getRoleList(filter: MvParamRoleListFilter = {}): Observable<MvRoleList[]> {
    return this.http
      .get<MvResponse<MvRoleList[]>>(`${this.baseUrl}/RoleList`, { params: toHttpParams(filter) })
      .pipe(map((response) => response.data ?? []));
  }
}
