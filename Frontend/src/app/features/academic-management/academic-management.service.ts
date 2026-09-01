import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { MvParamReqOption } from '../../shared/models/request-option.model';
import { MvGridConfig, MvResponse } from '../../shared/models/response.model';
import { toHttpParams } from '../../shared/utils/http-params.util';
import {
  MvGrade,
  MvGradeList,
  MvGradeTsk,
  MvParamGradeFilter,
  MvGradeSection,
  MvGradeSectionList,
  MvParamGradeSectionFilter,
} from './models/grade.model';

/**
 * Data access for the Academic Management module's API controllers
 * (HamroSchool.API.Controllers.Application.Academic_Management.V1.*).
 */
@Injectable({ providedIn: 'root' })
export class AcademicManagementService {
  private readonly http = inject(HttpClient);
  private readonly gradeUrl = `${environment.apiBaseUrl}/Grade`;

  /** GET Grade/Grade — paged grid list. */
  getGrade(params: MvParamReqOption<MvParamGradeFilter>): Observable<MvResponse<MvGridConfig<MvGrade>>> {
    return this.http.get<MvResponse<MvGridConfig<MvGrade>>>(`${this.gradeUrl}/Grade`, {
      params: toHttpParams(params),
    });
  }

  /** GET Grade/GradeList — flat list for dropdowns. */
  getGradeList(params: MvParamReqOption<MvParamGradeFilter>): Observable<MvResponse<MvGradeList[]>> {
    return this.http.get<MvResponse<MvGradeList[]>>(`${this.gradeUrl}/GradeList`, {
      params: toHttpParams(params),
    });
  }

  /** POST Grade/GradeTsk — insert/update task. */
  saveGrade(payload: MvGradeTsk[]): Observable<MvResponse<MvGradeTsk[]>> {
    return this.http.post<MvResponse<MvGradeTsk[]>>(`${this.gradeUrl}/GradeTsk`, payload);
  }

  /** GET Grade/GradeSection — paged grid list. */
  getGradeSection(
    params: MvParamReqOption<MvParamGradeSectionFilter>,
  ): Observable<MvResponse<MvGridConfig<MvGradeSection>>> {
    return this.http.get<MvResponse<MvGridConfig<MvGradeSection>>>(`${this.gradeUrl}/GradeSection`, {
      params: toHttpParams(params),
    });
  }

  /** GET Grade/GradeSectionList — flat list for dropdowns. */
  getGradeSectionList(
    params: MvParamReqOption<MvParamGradeSectionFilter>,
  ): Observable<MvResponse<MvGradeSectionList[]>> {
    return this.http.get<MvResponse<MvGradeSectionList[]>>(`${this.gradeUrl}/GradeSectionList`, {
      params: toHttpParams(params),
    });
  }

  /** POST Grade/GradeSectionTsk — insert/update task. */
  saveGradeSection(payload: MvGradeSection[]): Observable<MvResponse<MvGradeSection[]>> {
    return this.http.post<MvResponse<MvGradeSection[]>>(`${this.gradeUrl}/GradeSectionTsk`, payload);
  }
}
