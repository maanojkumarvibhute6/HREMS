import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { EmployeeService } from '../../services/employee-service';
import { Employee, EmployeeResponse } from '../../../../core/models/employee.model';
import { TagModule } from 'primeng/tag';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-view-employee',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CardModule,
    InputTextModule,
    ToastModule,
    ButtonModule,
    InputGroupModule,
    InputGroupAddonModule,
    TagModule,
  ],
  templateUrl: './view-employee.html',
  styles: ``,
})
export class ViewEmployeeComponent implements OnInit {
  private readonly messageService = inject(MessageService);
  private readonly employeeService = inject(EmployeeService);
  private readonly activatedRoute = inject(ActivatedRoute);

  employeeId: string = '';
  employeeDetails!: Employee;
  isEmployeeDetailsRetrived = signal(false);

  ngOnInit(): void {
    this.employeeId = this.activatedRoute.snapshot.params['id'];
    this.getEmployeeDetails();
  }

  getEmployeeDetails() {
    this.employeeService
      .getEmployeeDetailsService(this.employeeId)
      .pipe(
        finalize(() => {
          this.isEmployeeDetailsRetrived.set(true);
        })
      )
      .subscribe({
        next: (res: EmployeeResponse) => {
          this.employeeDetails = res.data;
          this.employeeId = res.data.employeeId;

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

  getSeverity(status: boolean) {
    switch (status) {
      case false:
        return 'danger';

      case true:
        return 'success';
    }
  }
}
