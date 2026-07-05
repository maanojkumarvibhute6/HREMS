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

import {
  CreateEmployeeResponse,
  Employee,
  EmployeeResponse,
} from '../../../../core/models/employee.model';
import { CommonService } from '../../../../core/services/common-service';
import { RoleListResponse, RoleResponse } from '../../../../core/models/roles.model';
import {
  DepartmentListResponse,
  DepartmentResponse,
} from '../../../../core/models/department.model';
import {
  DesignationListResponse,
  DesignationResponse,
} from '../../../../core/models/designation.model';
import { InputFieldComponent } from '../../../../shared/components/input-field/input-field';
import { CardModule } from 'primeng/card';
import { EmployeeService } from '../../../employees/services/employee-service';

@Component({
  selector: 'app-update-profile',
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
    CardModule,
    InputFieldComponent,
  ],
  templateUrl: './update-profile.html',
  styles: ``,
})
export class UpdateProfileComponent {
  @Input() formType: string = '';
  @Input() employeeId: string = '';
  @Output() callEmployeeDetailsFailed = new EventEmitter();

  private readonly messageService = inject(MessageService);
  private readonly employeeService = inject(EmployeeService);
  private readonly commonService = inject(CommonService);
  private readonly formBuilder = inject(FormBuilder);

  pageFormFroup = this.formBuilder.nonNullable.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    gender: ['', Validators.required],
    dob: ['', Validators.required],
    bloodGroup: ['', Validators.required],
    materialStatus: ['', Validators.required],
    nationality: ['Indian', Validators.required],
    email: ['', Validators.required],
    mobile: ['', Validators.required],
    alternateMobile: ['', Validators.required],
    addressLine1: ['', Validators.required],
    addressLine2: ['', Validators.required],
    city: ['', Validators.required],
    state: ['', Validators.required],
    country: ['', Validators.required],
    pincode: ['', Validators.required],
    department: ['', Validators.required],
    designation: ['', Validators.required],
    reportingManager: ['', Validators.required],
    employmentType: ['', Validators.required],
    joiningDate: ['', Validators.required],
    workLocation: ['', Validators.required],
    role: ['', Validators.required],
    status: ['', Validators.required],
  });

  isFormSubmitted = signal(false);
  isLoading = signal(false);

  employeeRoles: RoleResponse[] = [];
  employeeDepartments: DepartmentResponse[] = [];
  employeeDesignations: DesignationResponse[] = [];
  employeeDetails!: Employee;

  readonly fieldlabels: Record<string, string> = {
    firstName: 'First Name',
    lastName: 'Last Name',
    gender: 'Gender',
    dob: 'Date of Birth',
    bloodGroup: 'Blood Group',
    materialStatus: 'Material Status',
    nationality: 'Nationality',
    email: 'Email',
    mobile: 'Mobile',
    alternateMobile: 'Alternate Mobile',
    addressLine1: 'Address Line 1',
    addressLine2: 'Address Line 2',
    city: 'City',
    state: 'State',
    country: 'Country',
    pincode: 'Pincode',
    department: 'Department',
    designation: 'Designation',
    reportingManager: 'Reporting Manager',
    employmentType: 'Employment Type',
    joiningDate: 'Joining Date',
    workLocation: 'Work Location',
    role: 'Role',
    status: 'Status',
  };

  genderList = [
    { name: 'Male', key: 'M' },
    { name: 'Female', key: 'F' },
    { name: 'Others', key: 'O' },
  ];

  bloodGroupList = [
    { name: 'A+ (A positive) ', key: 'A+' },
    { name: 'A- (A negative) ', key: 'A-' },
    { name: 'B+ (B positive) ', key: 'B+' },
    { name: 'B- (B negative) ', key: 'B-' },
    { name: 'AB+ (AB positive) ', key: 'AB+' },
    { name: 'AB- (AB negative) ', key: 'AB-' },
    { name: 'O+ (O positive) ', key: 'O+' },
    { name: 'O- (O negative) ', key: 'O-' },
  ];

  materialStatusList = [
    { name: 'Single / Never Married', key: 'single' },
    { name: 'Married', key: 'married' },
    { name: 'Separated', key: 'separated' },
    { name: 'Divorced', key: 'divorced' },
    { name: 'Widowed', key: 'widowed' },
    { name: 'Common-Law / Cohabiting', key: 'cohabiting' },
  ];

  departmentList = [
    { name: 'Software', key: 'M' },
    { name: 'Finance', key: 'F' },
    { name: 'HR', key: 'O' },
  ];

  designationList = [
    { name: 'Software Developer', key: 'M' },
    { name: 'Finance Analyst', key: 'F' },
    { name: 'Recruiter', key: 'O' },
  ];

  employmentTypeList = [
    { name: 'Full Time', key: 'fullTime' },
    { name: 'Part Time', key: 'partTime' },
    { name: 'Contract', key: 'contract' },
  ];

  roleList = [
    { name: 'Admin', key: 'admin' },
    { name: 'Manager', key: 'manager' },
    { name: 'Employee', key: 'employee' },
  ];

  statusList = [
    { name: 'Active', key: 'active' },
    { name: 'Inactive', key: 'inactive' },
  ];

  ngOnInit(): void {
    this.getAllRoles();
    this.getAllDepartments();
    this.getAllDesignations();

    if (this.formType === 'edit') {
      this.getEmployeeDetails();
    }
  }

  getAllRoles() {
    this.commonService.getAllRolesService().subscribe({
      next: (res: RoleListResponse) => {
        this.employeeRoles = res.data;
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: res.status.message,
          life: 2000,
        });
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: err?.error?.status.message,
          detail: err?.error?.errorMessage,
          life: 2000,
        });
      },
    });
  }
  getAllDepartments() {
    this.commonService.getAllDepartmentService().subscribe({
      next: (res: DepartmentListResponse) => {
        this.employeeDepartments = res.data;
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: res.status.message,
          life: 2000,
        });
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: err?.error?.status.message,
          detail: err?.error?.errorMessage,
          life: 2000,
        });
      },
    });
  }
  getAllDesignations() {
    this.commonService.getAllDesignationService().subscribe({
      next: (res: DesignationListResponse) => {
        this.employeeDesignations = res.data;
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: res.status.message,
          life: 2000,
        });
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: err?.error?.status.message,
          detail: err?.error?.errorMessage,
          life: 2000,
        });
      },
    });
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

    if (control.errors['email']) {
      return 'Please enter a valid email';
    }

    return '';
  }

  getEmployeeDetails() {
    this.employeeService.getEmployeeDetailsService(this.employeeId.toUpperCase()).subscribe({
      next: (res: EmployeeResponse) => {
        this.employeeDetails = res.data;
        this.employeeId = res.data.employeeId;
        this.patchEmployeeDetails();

        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: res.status.message,
          life: 2000,
        });
      },
      error: (err) => {
        this.callEmployeeDetailsFailed.emit(false);
        this.messageService.add({
          severity: 'error',
          summary: err?.error?.status.message,
          detail: err?.error?.errorMessage,
          life: 2000,
        });
      },
    });
  }

  patchEmployeeDetails() {
    // this.pageFormFroup.patchValue({
    //   name: this.employeeDetails.name,
    //   email: this.employeeDetails.email,
    //   phone: this.employeeDetails.phone,
    //   role: this.employeeDetails.role,
    //   department: this.employeeDetails.department,
    //   designation: this.employeeDetails.designation,
    //   salary: this.employeeDetails.salary.toString(),
    // });
  }

  onFormSubmit() {
    this.isFormSubmitted.set(true);
    if (this.pageFormFroup.invalid) {
      return;
    }
    this.isLoading.set(true);

    const payload = this.pageFormFroup.getRawValue();

    console.log(payload);

    if (this.formType === 'add') {
      this.employeeService.createNewEmployeeService(payload).subscribe({
        next: (res: CreateEmployeeResponse) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: res.status.message,
            life: 5000,
          });
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

    if (this.formType === 'edit') {
      this.employeeService.updateEmployeeService(this.employeeId, payload).subscribe({
        next: (res: CreateEmployeeResponse) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: res.status.message,
            life: 5000,
          });
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
}
