import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { MvParamReqOption } from '../../shared/models/request-option.model';
import { MvGridConfig, MvResponse } from '../../shared/models/response.model';
import { toHttpParams } from '../../shared/utils/http-params.util';
import { MvStaff, MvStaffList, MvParamStaffFilter } from './models/staff.model';

/**
 * Data access for the Staff Management module's API controllers
 * (HamroSchool.API.Controllers.Application.Staff_Management.V1.*).
 */
@Injectable({ providedIn: 'root' })
export class StaffManagementService {
  private readonly http = inject(HttpClient);
  private readonly staffUrl = `${environment.apiBaseUrl}/Staff`;

  /** GET Staff/Staff — paged grid list. */
  getStaff(
    params: MvParamReqOption<MvParamStaffFilter>,
  ): Observable<MvResponse<MvGridConfig<MvStaff>>> {
    return this.http.get<MvResponse<MvGridConfig<MvStaff>>>(`${this.staffUrl}/Staff`, {
      params: toHttpParams(params),
    });
  }

  /** GET Staff/StaffList — flat list for dropdowns. */
  getStaffList(
    params: MvParamReqOption<MvParamStaffFilter>,
  ): Observable<MvResponse<MvStaffList[]>> {
    return this.http.get<MvResponse<MvStaffList[]>>(`${this.staffUrl}/StaffList`, {
      params: toHttpParams(params),
    });
  }

  /** POST Staff/StaffTsk — insert/update task. */
  saveStaff(payload: MvStaff[]): Observable<MvResponse<MvStaff[]>> {
    return this.http.post<MvResponse<MvStaff[]>>(`${this.staffUrl}/StaffTsk`, payload);
  }
}
