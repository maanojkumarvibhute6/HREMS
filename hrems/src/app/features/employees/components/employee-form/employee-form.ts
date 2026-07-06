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
import { EmployeeService } from '../../services/employee-service';
import { InputFieldComponent } from '../../../../shared/components/input-field/input-field';
import { CardModule } from 'primeng/card';


@Component({
  selector: 'app-employee-form',
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
    // InputFieldComponent,
  ],
  templateUrl: './employee-form.html',
  styles: ``,
})
export class EmployeeFormComponent implements OnInit {
  @Input() formType: string = '';
  @Input() employeeId: string = '';
  @Output() callEmployeeDetailsFailed = new EventEmitter();

  private readonly messageService = inject(MessageService);
  private readonly employeeService = inject(EmployeeService);
  private readonly commonService = inject(CommonService);
  private readonly formBuilder = inject(FormBuilder);

  pageFormFroup = this.formBuilder.nonNullable.group({
    // joiningDate: [''],
    email: ['', Validators.required],
    department: ['', Validators.required],
    designation: ['', Validators.required],
    employmentType: ['', Validators.required],
    role: ['', Validators.required],
    status: ['', Validators.required],
    salary: ['', Validators.required],
  });

  isFormSubmitted = signal(false);
  isLoading = signal(false);

  rolesList: RoleResponse[] = [];
  departmentsList: DepartmentResponse[] = [];
  designationsList: DesignationResponse[] = [];
  employeeDetails!: Employee;

  readonly fieldlabels: Record<string, string> = {
    joiningDate: 'Joining Date',
    email: 'Email',
    department: 'Department',
    designation: 'Designation',
    reportingManager: 'Reporting Manager',
    employmentType: 'Employment Type',
    workLocation: 'Work Location',
    role: 'Role',
    status: 'Status',
    salary: 'Salary',
  };

  employmentTypeList = [
    { label: 'Full Time', value: 'fullTime' },
    { label: 'Part Time', value: 'partTime' },
    { label: 'Contract', value: 'contract' },
  ];

  statusList = [
    { label: 'Active', value: 'Active' },
    { label: 'Inactive', value: 'Inactive' },
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
        this.rolesList = res.data;
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
        this.departmentsList = res.data;
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
        this.designationsList = res.data;
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
    const payloads = this.pageFormFroup.getRawValue();

    console.log(payloads);
    
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
