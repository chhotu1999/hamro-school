import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { MvParamReqOption } from '../../shared/models/request-option.model';
import { MvGridConfig, MvResponse } from '../../shared/models/response.model';
import { toHttpParams } from '../../shared/utils/http-params.util';
import {
  MvAcademicYear,
  MvAcademicYearList,
  MvParamAcademicYearFilter,
} from './models/academic-year.model';

/**
 * Data access for the Administration module's API controllers
 * (HamroSchool.API.Controllers.Application.Administration.V1.*).
 */
@Injectable({ providedIn: 'root' })
export class AdministrationService {
  private readonly http = inject(HttpClient);
  private readonly academicYearUrl = `${environment.apiBaseUrl}/AcademicYear`;

  /** GET AcademicYear/AcademicYear — paged grid list. */
  getAcademicYear(
    params: MvParamReqOption<MvParamAcademicYearFilter>,
  ): Observable<MvResponse<MvGridConfig<MvAcademicYear>>> {
    return this.http.get<MvResponse<MvGridConfig<MvAcademicYear>>>(
      `${this.academicYearUrl}/AcademicYear`,
      {
        params: toHttpParams(params),
      },
    );
  }

  /** GET AcademicYear/AcademicYearList — flat list for dropdowns. */
  getAcademicYearList(
    params: MvParamReqOption<MvParamAcademicYearFilter>,
  ): Observable<MvResponse<MvAcademicYearList[]>> {
    return this.http.get<MvResponse<MvAcademicYearList[]>>(
      `${this.academicYearUrl}/AcademicYearList`,
      {
        params: toHttpParams(params),
      },
    );
  }

  /** POST AcademicYear/AcademicYearTsk — insert/update task. */
  saveAcademicYear(payload: MvAcademicYear[]): Observable<MvResponse<MvAcademicYear[]>> {
    return this.http.post<MvResponse<MvAcademicYear[]>>(
      `${this.academicYearUrl}/AcademicYearTsk`,
      payload,
    );
  }
}
