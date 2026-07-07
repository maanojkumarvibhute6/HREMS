import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlContainer, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { FloatLabelModule } from 'primeng/floatlabel';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DatePickerModule } from 'primeng/datepicker';
import { FluidModule } from 'primeng/fluid';
import { SelectModule } from 'primeng/select';
import { InputNumberModule } from 'primeng/inputnumber';

export interface Option {
    label: string;
    value: string;
}

@Component({
  selector: 'app-input-field',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    MessageModule,
    ButtonModule,
    FloatLabelModule,
    IconFieldModule,
    InputIconModule,
    RadioButtonModule,
    DatePickerModule,
    FluidModule,
    SelectModule,
    InputNumberModule
  ],
  templateUrl: './input-field.html',
  styles: ``,
})
export class InputFieldComponent {
  private controlContainer = inject(ControlContainer);

  @Input() type!: 'text' | 'password' | 'email' | 'textarea' | 'select' | 'radio' | 'date' | 'number';
  @Input() showIcon: boolean = false;
  @Input() showSelectFilter: boolean = false;

  @Input() iconName: string = '';
  @Input() labelName: string = '';
  @Input() controlName: string = '';

  @Input() radioButtonList: Option[] = [];
  @Input() selectOptionList: Option[] = [];

  @Input() fieldlabels: Record<string, string> = {};

  // variables
  passwordHidden: boolean = true;


  
  get formGroup(): FormGroup {
    return this.controlContainer.control as FormGroup;
  }
  get control(): FormControl {
    return this.formGroup.get(this.controlName) as FormControl;
  }
  

  // Error Validation and shows dynamic error messages
  private getFieldLabel(formcontrolName: string): string {
    return this.fieldlabels[formcontrolName] ?? formcontrolName;
  }

  isInvalid(formcontrolName: string): boolean {
    if (!this.formGroup) {
      return false;
    }
    const control = this.formGroup.get(formcontrolName);

    return !!(
      (control?.invalid && control.touched) ||
      (formcontrolName === 'confirmPassword' && this.formGroup.hasError('fieldsMismatch'))
    );
  }

  getErrorMessage(formcontrolName: string): string {
    if (!this.formGroup) {
      return '';
    }
    const control = this.formGroup.get(formcontrolName);

    // to display the cross-field error validation
    if (formcontrolName === 'confirmPassword' && this.formGroup.hasError('fieldsMismatch')) {
      return 'Password and Confirm Password do not match';
    }

    if (!control?.errors) {
      return '';
    }

    const fieldName = this.getFieldLabel(formcontrolName);

    if (control.errors['required']) {
      return `${fieldName} is required`;
    }

    if (control.errors['email']) {
      return 'Please enter a valid email';
    }

    if (control.errors['minlength']) {
      return 'Password must be minimun length of 5 characters';
    }

    // if (control.errors['maxLength']) {
    //   return 'Password must be minimun length of 5 characters';
    // }

    return '';
  }

  // methods
  togglePassword() {
    this.passwordHidden = !this.passwordHidden;
  }
}
