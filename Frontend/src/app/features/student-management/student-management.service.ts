import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { MvParamReqOption } from '../../shared/models/request-option.model';
import { MvGridConfig, MvResponse } from '../../shared/models/response.model';
import { toHttpParams } from '../../shared/utils/http-params.util';
import {
  MvStudent,
  MvStudentList,
  MvParamStudentFilter,
  MvStudentContact,
  MvStudentContactList,
  MvParamStudentContactFilter,
  MvStudentEnrollment,
} from './models/student.model';

/**
 * Data access for the Student Management module's API controllers
 * (HamroSchool.API.Controllers.Application.Student_Management.V1.*).
 */
@Injectable({ providedIn: 'root' })
export class StudentManagementService {
  private readonly http = inject(HttpClient);
  private readonly studentUrl = `${environment.apiBaseUrl}/Student`;

  /** GET Student/Student — paged grid list. */
  getStudent(
    params: MvParamReqOption<MvParamStudentFilter>,
  ): Observable<MvResponse<MvGridConfig<MvStudent>>> {
    return this.http.get<MvResponse<MvGridConfig<MvStudent>>>(`${this.studentUrl}/Student`, {
      params: toHttpParams(params),
    });
  }

  /** GET Student/StudentList — flat list for dropdowns. */
  getStudentList(
    params: MvParamReqOption<MvParamStudentFilter>,
  ): Observable<MvResponse<MvStudentList[]>> {
    return this.http.get<MvResponse<MvStudentList[]>>(`${this.studentUrl}/StudentList`, {
      params: toHttpParams(params),
    });
  }

  /** POST Student/StudentTsk — insert/update task. */
  saveStudent(payload: MvStudent[]): Observable<MvResponse<MvStudent[]>> {
    return this.http.post<MvResponse<MvStudent[]>>(`${this.studentUrl}/StudentTsk`, payload);
  }

  /** GET Student/StudentContact — paged grid list. */
  getStudentContact(
    params: MvParamReqOption<MvParamStudentContactFilter>,
  ): Observable<MvResponse<MvGridConfig<MvStudentContact>>> {
    return this.http.get<MvResponse<MvGridConfig<MvStudentContact>>>(
      `${this.studentUrl}/StudentContact`,
      { params: toHttpParams(params) },
    );
  }

  /** GET Student/StudentContactList — flat list for dropdowns. */
  getStudentContactList(
    params: MvParamReqOption<MvParamStudentContactFilter>,
  ): Observable<MvResponse<MvStudentContactList[]>> {
    return this.http.get<MvResponse<MvStudentContactList[]>>(
      `${this.studentUrl}/StudentContactList`,
      { params: toHttpParams(params) },
    );
  }

  /** POST Student/StudentContactTsk — insert/update task. */
  saveStudentContact(payload: MvStudentContact[]): Observable<MvResponse<MvStudentContact[]>> {
    return this.http.post<MvResponse<MvStudentContact[]>>(
      `${this.studentUrl}/StudentContactTsk`,
      payload,
    );
  }

  /** POST Student/StudentEnrollmentIns — insert-only admission/promotion trail. */
  insertStudentEnrollment(
    payload: MvStudentEnrollment[],
  ): Observable<MvResponse<MvStudentEnrollment[]>> {
    return this.http.post<MvResponse<MvStudentEnrollment[]>>(
      `${this.studentUrl}/StudentEnrollmentIns`,
      payload,
    );
  }
}
