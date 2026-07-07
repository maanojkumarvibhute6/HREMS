import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { API_ENDPOINT } from '../../../core/constants/api-endpoint.constant';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  private readonly http = inject(HttpClient);

  // get all role list
  getAllRolesService(): Observable<any> {
    return this.http.get<any>(API_ENDPOINT.ROLE.GET_ALL);
  }

  // get role details
  getRoleDetailsService(roleId: string): Observable<any> {
    return this.http.get<any>(API_ENDPOINT.ROLE.GET_DETAILS + '/' + roleId);
  }

  // create new role
  createNewRoleService(payload: any): Observable<any> {
    return this.http.post<any>(API_ENDPOINT.ROLE.CREATE, payload);
  }

  // update existing role
  updateRoleService(roleId: string, payload: any): Observable<any> {
    return this.http.put<any>(
      API_ENDPOINT.ROLE.UPDATE + '/' + roleId,
      payload,
    );
  }

  // inactivate existing role
  inactivateRoleService(roleId: string, payload: any): Observable<any> {
    return this.http.put<any>(
      API_ENDPOINT.ROLE.INACTIVATE + '/' + roleId,
      payload,
    );
  }
}
