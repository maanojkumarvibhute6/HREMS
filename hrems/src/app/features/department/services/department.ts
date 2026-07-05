import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { API_ENDPOINT } from '../../../core/constants/api-endpoint.constant';

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  private readonly http = inject(HttpClient);

  // get all department list
  getAllDepartmentsService(): Observable<any> {
    return this.http.get<any>(API_ENDPOINT.DEPARTMENT.GET_ALL);
  }

  // get department details
  getDepartmentDetailsService(departmentId: string): Observable<any> {
    return this.http.get<any>(API_ENDPOINT.DEPARTMENT.GET_DETAILS + '/' + departmentId);
  }

  // create new department
  createNewDepartmentService(payload: any): Observable<any> {
    return this.http.post<any>(API_ENDPOINT.DEPARTMENT.CREATE, payload);
  }

  // update existing department
  updateDepartmentService(departmentId: string, payload: any): Observable<any> {
    return this.http.put<any>(
      API_ENDPOINT.DEPARTMENT.UPDATE + '/' + departmentId,
      payload,
    );
  }

  // inactivate existing department
  inactivateDepartmentService(departmentId: string, payload: any): Observable<any> {
    return this.http.put<any>(
      API_ENDPOINT.DEPARTMENT.INACTIVATE + '/' + departmentId,
      payload,
    );
  }
}
