import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';

import { MenuItem, MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { MenuModule } from 'primeng/menu';
import { MultiSelectModule } from 'primeng/multiselect';
import { ProgressBarModule } from 'primeng/progressbar';
import { SelectModule } from 'primeng/select';
import { SliderModule } from 'primeng/slider';
import { Table, TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';

import { EmployeeService } from '../../services/employee-service';
import { Employee, EmployeeListResponse } from '../../../../core/models/employee.model';
import { URL_ROUTES } from '../../../../core/constants/url.constant';

@Component({
  selector: 'app-employee-list',
  imports: [
    CommonModule,
    CardModule,
    ToastModule,
    ButtonModule,
    SelectModule,
    IconFieldModule,
    InputIconModule,
    MultiSelectModule,
    ProgressBarModule,
    SliderModule,
    TableModule,
    TagModule,
    InputTextModule,
    MenuModule,
    ConfirmDialogModule,
  ],
  templateUrl: './employee-list.html',
  styles: ``,
})
export class EmployeeListComponent implements OnInit {
  private readonly messageService = inject(MessageService);
  private readonly employeeService = inject(EmployeeService);
  private readonly router = inject(Router);

  searchValue = signal('');
  employeesList: Employee[] = [];
  globalFilterFields = ['name', 'email', 'department', 'designation'];
  items: MenuItem[] = [
    {
      label: 'View',
      icon: 'pi pi-eye',
    },
    {
      label: 'Edit',
      icon: 'pi pi-user-edit',
    },
    {
      label: 'Delete',
      icon: 'pi pi-trash',
    },
  ];

  ngOnInit(): void {
    this.getAllEmployees();
  }

  getAllEmployees() {
    this.employeeService.getAllService().subscribe({
      next: (res: EmployeeListResponse) => {
        this.employeesList = res.data;

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

  onRefresh() {
    this.getAllEmployees();
  }

  clear(table: Table) {
    table.clear();
    this.searchValue.set('');
  }

  getSeverity(status: boolean) {
    switch (status) {
      case false:
        return 'danger';

      case true:
        return 'success';
    }
  }

  openMenu(actionType: string, employeeDetails: Employee) {
    if (actionType === 'View') {
      this.router.navigate([URL_ROUTES.EMPLOYEE.VIEW + '/' + employeeDetails.employeeId]);
    }
    if (actionType === 'Edit') {
      this.router.navigate([URL_ROUTES.EMPLOYEE.EDIT + '/' + employeeDetails.employeeId]);
    } else {
    }
    console.log(actionType);
    console.log(employeeDetails);
  }

  redirectTo() {
    this.router.navigate([URL_ROUTES.EMPLOYEE.ADD]);
  }
}
