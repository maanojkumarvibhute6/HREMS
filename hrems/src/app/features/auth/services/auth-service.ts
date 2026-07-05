import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_ENDPOINT } from '../../../core/constants/api-endpoint.constant';
import {
  ForgotPasswordRequest,
  LoginRequest,
  LoginResponse,
  TokenData,
} from '../../../core/models/login.model';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../../../core/services/token-storage-service';
import { TOKEN_KEY } from '../../../core/constants/token-key.constant';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly tokenStorageService = inject(TokenStorageService);

  // login Service
  loginService(payload: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(API_ENDPOINT.LOGIN, payload);
  }

  // logout
  logout() {}

  // save Token in local storage
  saveTokenData(tokenData: TokenData) {
    this.tokenStorageService.setItem(TOKEN_KEY.EMPLOYEE_ID, tokenData.employeeId);
    this.tokenStorageService.setItem(TOKEN_KEY.ROLE, tokenData.role);
    this.tokenStorageService.setItem(TOKEN_KEY.TOKEN, tokenData.token);
    this.tokenStorageService.setItem(TOKEN_KEY.NAME, tokenData.name);
  }

  // forgot-password Service
  forgotPasswordService(payload: ForgotPasswordRequest) {
    return this.http.put(API_ENDPOINT.FORGOT_PASSWORD, payload);
  }
}
