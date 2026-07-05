import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';

import { URL_ROUTES } from '../../../../core/constants/url.constant';
import { InputFieldComponent } from "../../../../shared/components/input-field/input-field";
    

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

  readonly fieldlabels: Record<string, string> = {
    password: 'Password',
    confirmPassword: 'Confirm Password',
  };

  isLoading = signal(false);

  forgotPasswordFormGroup = this.formBuilder.nonNullable.group(
    {
      password: ['', [Validators.required, Validators.minLength(5)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(5)]],
    }
  );
  // forgotPasswordFormGroup = this.formBuilder.nonNullable.group(
  //   {
  //     password: ['', [Validators.required, Validators.minLength(5)]],
  //     confirmPassword: ['', [Validators.required, Validators.minLength(5)]],
  //   },
  //   {
  //     validators: matchFieldsValidator('password', 'confirmPassword'),
  //   }
  // );

  redirectToLogin() {
    this.router.navigate([URL_ROUTES.AUTH.LOGIN]);
  }

  onFormSubmit() {
    
  }
}
