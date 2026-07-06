import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';

import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';

import { URL_ROUTES } from '../../../../core/constants/url.constant';
import { InputFieldComponent } from '../../../../shared/components/input-field/input-field';
import { AuthService } from '../../services/auth-service';
import { LoginRequest, LoginResponse } from '../../../../core/models/login.model';

@Component({
  selector: 'app-login',
  imports: [
    CommonModule, 
    FormsModule, 
    ReactiveFormsModule, 
    ButtonModule, 
    InputFieldComponent
  ],
  templateUrl: './login.html',
  styles: ``,
})
export class LoginComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly messageService = inject(MessageService);
  private readonly authService = inject(AuthService);
  readonly fieldlabels: Record<string, string> = {
    email: 'Email',
    password: 'Password',
  };

  isLoading = signal(false);

  loginFormGroup = this.formBuilder.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(5)]],
  });

  redirect() {
    this.router.navigate([URL_ROUTES.AUTH.FORGOT_PASSWORD]);
  }

  onFormSubmit() {
    if (this.loginFormGroup.invalid) {
      this.loginFormGroup.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);
    const payload: LoginRequest = this.loginFormGroup.getRawValue();

    this.authService
      .loginService(payload)
      .pipe(
        finalize(() => {
          this.isLoading.set(false);
        }),
      )
      .subscribe({
        next: (res: LoginResponse) => {
          this.authService.saveTokenData(res.data);
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: res.status.message,
            life: 5000,
          });
          this.router.navigate([URL_ROUTES.HOME.DASHBOARD]);
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: err?.error?.status.message,
            detail: err?.error?.errorMessage,
            life: 5000,
          });
        },
      });
  }
}
