import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { CreateEmployeeResponse, EmployeeListResponse, EmployeeResponse, UpdateEmployeeResponse } from '../../../core/models/employee.model';
import { API_ENDPOINT } from '../../../core/constants/api-endpoint.constant';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private readonly http = inject(HttpClient);

  // get all employee list
  getAllService(): Observable<EmployeeListResponse> {
    return this.http.get<EmployeeListResponse>(API_ENDPOINT.EMPLOYEE.GET_ALL);
  }

  // get active employee list
  getActiveService(): Observable<EmployeeListResponse> {
    return this.http.get<EmployeeListResponse>(API_ENDPOINT.EMPLOYEE.GET_ACTIVE);
  }

  // get inactive employee list
  getInactiveService(): Observable<EmployeeListResponse> {
    return this.http.get<EmployeeListResponse>(API_ENDPOINT.EMPLOYEE.GET_INACTIVE);
  }

  // get employee details
  getEmployeeDetailsService(employeeId: string): Observable<EmployeeResponse> {
    return this.http.get<EmployeeResponse>(API_ENDPOINT.EMPLOYEE.GET_DETAILS + '/' + employeeId);
  }

  // create new employee
  createNewEmployeeService(payload: any): Observable<CreateEmployeeResponse> {
    return this.http.post<CreateEmployeeResponse>(API_ENDPOINT.EMPLOYEE.CREATE, payload);
  }

  // update existing employee
  updateEmployeeService(employeeId: string, payload: any): Observable<UpdateEmployeeResponse> {
    return this.http.put<UpdateEmployeeResponse>(
      API_ENDPOINT.EMPLOYEE.UPDATE + '/' + employeeId,
      payload,
    );
  }

  // inactivate existing employee
  inactivateEmployeeService(employeeId: string, payload: any): Observable<UpdateEmployeeResponse> {
    return this.http.put<UpdateEmployeeResponse>(
      API_ENDPOINT.EMPLOYEE.INACTIVATE + '/' + employeeId,
      payload,
    );
  }

}
