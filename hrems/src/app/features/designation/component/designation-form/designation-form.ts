import { Component, EventEmitter, inject, Input, OnInit, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

import { MessageModule } from 'primeng/message';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { InputNumberModule } from 'primeng/inputnumber';
import { DesignationService } from '../../services/designation';
import { CommonService } from '../../../../core/services/common-service';

@Component({
  selector: 'app-designation-form',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    InputNumberModule,
    MessageModule,
    ToastModule,
    ButtonModule,
    SelectModule,
  ],
  templateUrl: './designation-form.html',
  styles: ``,
})
export class DesignationFormComponent implements OnInit {
  @Input() formType: string = '';
  @Input() departmentId: string = '';
  @Output() callEmployeeDetailsFailed = new EventEmitter();

  private readonly messageService = inject(MessageService);
  private readonly designationService = inject(DesignationService);
  private readonly commonService = inject(CommonService);
  private readonly formBuilder = inject(FormBuilder);
  pageFormFroup!: FormGroup;

  isFormSubmitted = signal(false);
  isLoading = signal(false);

  readonly fieldlabels: Record<string, string> = {
    designationCode: 'Designation Code',
    designationName: 'Designation Name',
    description: 'Description',
    designationHead: 'Designation Head',
    status: 'Status',
  };

  ngOnInit(): void {
    this.pageFormFroup = this.formBuilder.nonNullable.group({
      designationCode: ['', Validators.required],
      designationName: ['', Validators.required],
      description: ['', [Validators.required]],
      designationHead: ['', Validators.required],
      status: ['', Validators.required],
    });

    if (this.formType === 'edit') {
      // this.getEmployeeDetails();
    }
  }

  getAllDesignation() {
    // this.commonService.getAllDepartmentService().subscribe({
    //   next: (res: DepartmentListResponse) => {
    //     this.employeeDepartments = res.data;
    //     this.messageService.add({
    //       severity: 'success',
    //       summary: 'Success',
    //       detail: res.status.message,
    //       life: 2000,
    //     });
    //   },
    //   error: (err) => {
    //     this.messageService.add({
    //       severity: 'error',
    //       summary: err?.error?.status.message,
    //       detail: err?.error?.errorMessage,
    //       life: 2000,
    //     });
    //   },
    // });
  }

  isInvalid(fornControlName: string): boolean {
    const control = this.pageFormFroup.get(fornControlName);

    return !!(control?.invalid && (control.touched || this.isFormSubmitted()));
  }

  private getFieldLabel(formControlName: string): string {
    return this.fieldlabels[formControlName] ?? formControlName;
  }

  getErrorMessage(formControlName: string): string {
    const control = this.pageFormFroup.get(formControlName);

    if (!control?.errors) {
      return '';
    }

    const fieldName = this.getFieldLabel(formControlName);

    if (control.errors['required']) {
      return `${fieldName} is required`;
    }

    return '';
  }

  patchDesignationDetails() {
    this.pageFormFroup.patchValue({
      // name: this.employeeDetails.name,
      // email: this.employeeDetails.email,
      // phone: this.employeeDetails.phone,
      // role: this.employeeDetails.role,
      // department: this.employeeDetails.department,
      // designation: this.employeeDetails.designation,
      // salary: this.employeeDetails.salary.toString(),
    });
  }

  onFormSubmit() {
    this.isFormSubmitted.set(true);
    if (this.pageFormFroup.invalid) {
      return;
    }
    this.isLoading.set(true);

    const payload = this.pageFormFroup.getRawValue();

    console.log(payload);

    // if (this.formType === 'add') {
    //   this.employeeService.createNewEmployeeService(payload).subscribe({
    //     next: (res: CreateEmployeeResponse) => {
    //       this.messageService.add({
    //         severity: 'success',
    //         summary: 'Success',
    //         detail: res.status.message,
    //         life: 5000,
    //       });
    //     },
    //     error: (err) => {
    //       this.messageService.add({
    //         severity: 'error',
    //         summary: err?.error?.status.message,
    //         detail: err?.error?.errorMessage,
    //         life: 5000,
    //       });
    //     },
    //   });
    // }

    // if (this.formType === 'edit') {
    //   this.employeeService.updateEmployeeService(this.employeeId, payload).subscribe({
    //     next: (res: CreateEmployeeResponse) => {
    //       this.messageService.add({
    //         severity: 'success',
    //         summary: 'Success',
    //         detail: res.status.message,
    //         life: 5000,
    //       });
    //     },
    //     error: (err) => {
    //       this.messageService.add({
    //         severity: 'error',
    //         summary: err?.error?.status.message,
    //         detail: err?.error?.errorMessage,
    //         life: 5000,
    //       });
    //     },
    //   });
    // }
  }
}
