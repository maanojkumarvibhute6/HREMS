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
    SelectModule 
  ],
  templateUrl: './input-field.html',
  styles: ``,
})
export class InputFieldComponent {
  @Input() enableIcon: boolean = false;
  @Input() inputTextField: boolean = false;
  @Input() radioInputField: boolean = false;
  @Input() calendarInputField: boolean = false;
  @Input() selectInputField: boolean = false;
  @Input() enableSelectFilter: boolean = false;

  @Input() inputIcon: string = '';
  @Input() inputType: string = '';
  @Input() labelName: string = '';
  @Input() controlName!: FormControl;
  @Input() formcontrolName: string = '';
  @Input() radioButtonList!: any[];
  @Input() selectOptionList!: any[];

  @Input() fieldlabels: Record<string, string> = {};


  // Error Validation and shows dynamic error messages
  isInvalid(): boolean {
    return !!(this.controlName?.invalid && this.controlName.touched);
  }

  private getFieldLabel(formControlName: string): string {
    return this.fieldlabels[formControlName] ?? formControlName;
  }

  getErrorMessage(formControlName: string): string {

    // to display the cross-field error validation 
    if (formControlName === 'confirmPassword' && this.controlName.hasError('fieldsMismatch')) {
      return 'Password and Confirm Password do not match';
    }

    if (!this.controlName?.errors) {
      return '';
    }

    const fieldName = this.getFieldLabel(formControlName);

    if (this.controlName.errors['required']) {
      return `${fieldName} is required`;
    }

    if (this.controlName.errors['email']) {
      return 'Please enter a valid email';
    }

    if (this.controlName.errors['minlength']) {
      return 'Password must be minimun length of 5 characters';
    }

    return '';
  }

}
