import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessageService } from 'primeng/api';
import { CardModule } from 'primeng/card';

import { StatisticsCardComponent } from '../../compoenets/statistics-card/statistics-card';
import { TokenStorageService } from '../../../../core/services/token-storage-service';
import { TOKEN_KEY } from '../../../../core/constants/token-key.constant';
import { CommonConstants } from '../../../../core/constants/common.constant';

@Component({
  selector: 'app-dashboard',
  imports: [
    CommonModule,
    CardModule,
    StatisticsCardComponent
],
  templateUrl: './dashboard.html',
  styles: ``,
})
export class DashboardComponent implements OnInit {
  private readonly messageService = inject(MessageService);
  private readonly tokenStorageService = inject(TokenStorageService);
  changeDetect = inject(ChangeDetectorRef);

  currentUserName: string = '';
  commonConstants = CommonConstants;
  currentDate: Date = new Date();

  // employeesList: Employee[] = [];
  // activeEmployeesList: Employee[] = [];
  // inactiveEmployeesList: Employee[] = [];
  // adminRoleEmployeesList: Employee[] = [];
  // managerRoleEmployeesList: Employee[] = [];
  // onlyEmployeeRoleList: Employee[] = [];
  

  totalEmployeesCount: number = 0; 
  totalActiveEmployeesCount: number = 0; 
  totalInactiveEmployeesCount: number = 0;

  totalAdminRoleCount: number = 0;
  totalManagerRoleCount: number = 0;
  totalEmployeeRoleCount: number = 0;

  ngOnInit(): void {
    this.getCurrentUserDetails();
    this.getAllEmployees();
    this.getActiveEmployees();
    this.getInactiveEmployees();
  }

  getCurrentUserDetails() {
    this.currentUserName = this.tokenStorageService.getItem(TOKEN_KEY.NAME) || 'User';
  }

  getAllEmployees() {
    // this.employeeService.getAllService().subscribe({
    //   next: (res: EmployeeListResponse) => {
    //     this.employeesList = res.data;
    //     this.totalEmployeesCount = res.length;
    //     this.getEmployeeCounts();

    //     this.changeDetect.detectChanges();
        
    //     this.messageService.add({
    //       severity: 'success',
    //       summary: 'Success',
    //       detail: res.status.message,
    //       life: 5000,
    //     });
    //   },
    //   error: (err) => {
    //     this.messageService.add({
    //       severity: 'error',
    //       summary: err?.error?.status.message,
    //       detail: err?.error?.errorMessage,
    //       life: 5000,
    //     });
    //   },
    // });
  }

  getActiveEmployees() {
    // this.employeeService.getActiveService().subscribe({
    //   next: (res: EmployeeListResponse) => {
    //     this.activeEmployeesList = res.data;
    //     this.totalActiveEmployeesCount = res.length;
    //     this.changeDetect.detectChanges();
        
    //     this.messageService.add({
    //       severity: 'success',
    //       summary: 'Success',
    //       detail: res.status.message,
    //       life: 5000,
    //     });
    //   },
    //   error: (err) => {
    //     this.messageService.add({
    //       severity: 'error',
    //       summary: err?.error?.status.message,
    //       detail: err?.error?.errorMessage,
    //       life: 5000,
    //     });
    //   },
    // });
  }

  getInactiveEmployees() {
    // this.employeeService.getInactiveService().subscribe({
    //   next: (res: EmployeeListResponse) => {
    //     this.inactiveEmployeesList = res.data;
    //     this.totalInactiveEmployeesCount = res.length;
    //     this.changeDetect.detectChanges();

    //     this.messageService.add({
    //       severity: 'success',
    //       summary: 'Success',
    //       detail: res.status.message,
    //       life: 5000,
    //     });
    //   },
    //   error: (err) => {
    //     this.messageService.add({
    //       severity: 'error',
    //       summary: err?.error?.status.message,
    //       detail: err?.error?.errorMessage,
    //       life: 5000,
    //     });
    //   },
    // });
  }

  getEmployeeCounts() {
    // this.adminRoleEmployeesList = this.employeesList.filter(emp => emp.role === ROLES.ADMIN);
    // this.managerRoleEmployeesList = this.employeesList.filter(emp => emp.role === ROLES.MANAGER);
    // this.onlyEmployeeRoleList = this.employeesList.filter(emp => emp.role === ROLES.EMPLOYEE);

    // this.totalAdminRoleCount = this.adminRoleEmployeesList.length;
    // this.totalManagerRoleCount = this.managerRoleEmployeesList.length;
    // this.totalEmployeeRoleCount = this.onlyEmployeeRoleList.length;
  }
}
