import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RoleListResponse } from '../models/roles.model';
import { DepartmentListResponse } from '../models/department.model';
import { DesignationListResponse } from '../models/designation.model';
import { API_ENDPOINT } from '../constants/api-endpoint.constant';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  private readonly http = inject(HttpClient);

  // Roles
  getAllRolesService(): Observable<RoleListResponse> {
    return this.http.get<RoleListResponse>(API_ENDPOINT.ROLE.GET_ALL);
  }

  // Department
  getAllDepartmentService(): Observable<DepartmentListResponse> {
    return this.http.get<DepartmentListResponse>(API_ENDPOINT.DEPARTMENT.GET_ALL);
  }

  // Designation
  getAllDesignationService(): Observable<DesignationListResponse> {
    return this.http.get<DesignationListResponse>(API_ENDPOINT.DESIGNATION.GET_ALL);
  }
}
