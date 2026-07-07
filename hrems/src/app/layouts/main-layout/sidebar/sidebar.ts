import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';

import { URL_ROUTES } from '../../../core/constants/url.constant';
import { TokenStorageService } from '../../../core/services/token-storage-service';

@Component({
  selector: 'app-sidebar',
  imports: [
    CommonModule,
    MenuModule,
],
  templateUrl: './sidebar.html',
  styles: ``,
})
export class SidebarComponent {
  private readonly tokenStorageService = inject(TokenStorageService);

  items: MenuItem[] = [
    {
      label: 'Home',
      items: [
        {
          label: 'Dashboard',
          icon: 'pi pi-home',
          routerLink: URL_ROUTES.HOME.DASHBOARD
        },
      ],
    },
    {
      label: 'Employee Management',
      items: [
        {
          label: 'Employees list',
          icon: 'pi pi-list',
          routerLink: URL_ROUTES.EMPLOYEE.ALL,
        },
        {
          label: 'Add Employee',
          icon: 'pi pi-user-plus',
          routerLink: URL_ROUTES.EMPLOYEE.ADD,
        }
      ],
    },
    {
      label: 'Departments',
      items: [
        {
          label: 'Department list',
          icon: 'pi pi-list',
          routerLink: URL_ROUTES.DEPARTMENT.ALL,
        },
        {
          label: 'Add Department',
          icon: 'pi pi-user-plus',
          routerLink: URL_ROUTES.DEPARTMENT.ADD,
        }
      ],
    },
    {
      label: 'Designations',
      items: [
        {
          label: 'Designation list',
          icon: 'pi pi-list',
          routerLink: URL_ROUTES.DESIGNATION.ALL,
        },
        {
          label: 'Add Designation',
          icon: 'pi pi-user-plus',
          routerLink: URL_ROUTES.DESIGNATION.ADD,
        }
      ],
    },
    {
      label: 'Roles',
      items: [
        {
          label: 'Role list',
          icon: 'pi pi-list',
          routerLink: URL_ROUTES.ROLE.ALL,
        },
        {
          label: 'Add Role',
          icon: 'pi pi-user-plus',
          routerLink: URL_ROUTES.ROLE.ADD,
        }
      ],
    },
    {
      label: 'Attendance',
      items: [
        {
          label: 'Attendance',
          icon: 'pi pi-home',
        },
      ],
    },
    {
      label: 'Leaves',
      items: [
        {
          label: 'Apply Leave',
          icon: 'pi pi-box',
        },
        {
          label: 'leaves List',
          icon: 'pi pi-user-plus',
        },
        {
          label: 'Approve/Reject Leaves',
          icon: 'pi pi-user-edit',
        },
      ],
    },
    {
      label: 'Payroll',
      items: [
        {
          label: 'Payroll',
          icon: 'pi pi-home',
        },
      ],
    },
    {
      label: 'Settings',
      items: [
        {
          label: 'View Profile',
          icon: 'pi pi-user',
        },
        {
          label: 'Update Profile',
          icon: 'pi pi-user-edit',
        },
        {
          label: 'Settings',
          icon: 'pi pi-cog',
        },
      ],
    },
    {
      label: 'Logout',
      items: [
        {
          label: 'Logout',
          icon: 'pi pi-sign-out',
          routerLink: URL_ROUTES.AUTH.LOGIN
        },
      ],
    },
  ];

  ngOnDestroy() {
    this.tokenStorageService.clear();
  }
}
