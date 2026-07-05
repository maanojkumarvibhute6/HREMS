import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_ENDPOINT } from '../../../core/constants/api-endpoint.constant';



@Injectable({
  providedIn: 'root',
})
export class DesignationService {
  private readonly http = inject(HttpClient);

  // get all designation list
  getAllDesignationsService(): Observable<any> {
    return this.http.get<any>(API_ENDPOINT.DEPARTMENT.GET_ALL);
  }

  // get designation details
  getDesignationDetailsService(designationId: string): Observable<any> {
    return this.http.get<any>(API_ENDPOINT.DEPARTMENT.GET_DETAILS + '/' + designationId);
  }

  // create new designation
  createNewDesignationService(payload: any): Observable<any> {
    return this.http.post<any>(API_ENDPOINT.DEPARTMENT.CREATE, payload);
  }

  // update existing designation
  updateDesignationService(designationId: string, payload: any): Observable<any> {
    return this.http.put<any>(
      API_ENDPOINT.DEPARTMENT.UPDATE + '/' + designationId,
      payload,
    );
  }

  // inactivate existing designation
  inactivateDesignationService(designationId: string, payload: any): Observable<any> {
    return this.http.put<any>(
      API_ENDPOINT.DEPARTMENT.INACTIVATE + '/' + designationId,
      payload,
    );
  }
}
