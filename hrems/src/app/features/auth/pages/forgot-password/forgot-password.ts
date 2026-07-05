import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';

import { URL_ROUTES } from '../../../../core/constants/url.constant';
import { InputFieldComponent } from "../../../../shared/components/input-field/input-field";
import { matchFieldsValidator } from '../../../../shared/validators/matchFieldValidator';
import { AuthService } from '../../services/auth-service';
import { finalize } from 'rxjs';
    

@Component({
  selector: 'app-forgot-password',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    InputFieldComponent,
  ],
  templateUrl: './forgot-password.html',
  styles: ``,
})
export class ForgotPasswordComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly messageService = inject(MessageService);
  private readonly authService = inject(AuthService);

  readonly fieldlabels: Record<string, string> = {
    password: 'Password',
    confirmPassword: 'Confirm Password',
  };

  isLoading = signal(false);

  forgotPasswordFormGroup = this.formBuilder.nonNullable.group(
    {
      password: ['', [Validators.required, Validators.minLength(5)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(5)]],
    },
    {
      validators: matchFieldsValidator('password', 'confirmPassword'),
    }
  );

  redirectToLogin() {
    this.router.navigate([URL_ROUTES.AUTH.LOGIN]);
  }

  onFormSubmit() {
    if (this.forgotPasswordFormGroup.invalid) {
      this.forgotPasswordFormGroup.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);

    const payload = this.forgotPasswordFormGroup.getRawValue();
    console.log(payload);

    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Success',
      life: 5000,
    });
    this.router.navigate([URL_ROUTES.AUTH.LOGIN]);
    
    this.authService
      .forgotPasswordService(payload)
      .pipe(
        finalize(() => {
          this.isLoading.set(false);
        }),
      )
      .subscribe({
        next: (res: any) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: res.status.message,
            life: 5000,
          });
          this.router.navigate([URL_ROUTES.AUTH.LOGIN]);
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
