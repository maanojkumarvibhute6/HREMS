import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

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

@Component({
  selector: 'app-input',
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
    SelectModule 
  ],
  templateUrl: './input.html',
  styles: ``,
})
export class InputComponent {
  @Input() enableIcon: boolean = false;
  @Input() passwordIcon: boolean = false;
  @Input() inputTextField: boolean = false;
  @Input() radioInputField: boolean = false;
  @Input() calendarInputField: boolean = false;
  @Input() selectInputField: boolean = false;
  @Input() enableSelectFilter: boolean = false;

  @Input() inputIcon: string = '';
  @Input() inputType: string = '';
  @Input() labelName: string = '';
  @Input() controlName!: FormControl;
  @Input() controlGroup!: FormGroup;
  @Input() formcontrolName: string = '';
  @Input() radioButtonList!: any[];
  @Input() selectOptionList!: any[];

  @Input() fieldlabels: Record<string, string> = {};


  // variables
  showHidePassword: boolean = true;


  // Error Validation and shows dynamic error messages
  private getFieldLabel(formcontrolName: string): string {
    return this.fieldlabels[formcontrolName] ?? formcontrolName;
  }

  isInvalid(formcontrolName: string): boolean {
    if (!this.controlGroup) {
      return false;
    }
    const control = this.controlGroup.get(formcontrolName);

    return !!(
      (control?.invalid && control.touched) ||
      (formcontrolName === 'confirmPassword' && this.controlGroup.hasError('fieldsMismatch'))
    );
  }

  getErrorMessage(formcontrolName: string): string {
    if (!this.controlGroup) {
      return '';
    }
    const control = this.controlGroup.get(formcontrolName);

    // to display the cross-field error validation 
    if (formcontrolName === 'confirmPassword' && this.controlGroup.hasError('fieldsMismatch')) {
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

    return '';
  }

  // methods
  togglePassword() {
    this.showHidePassword = !this.showHidePassword;
  }

}

