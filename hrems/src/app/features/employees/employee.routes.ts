import { Routes } from '@angular/router';

import { URL_ROUTES } from '../../core/constants/url.constant';
import { EmployeeListComponent } from './pages/employee-list/employee-list';
import { AddEmployeeComponent } from './pages/add-employee/add-employee';
import { ViewEmployeeComponent } from './pages/view-employee/view-employee';
import { EditEmployeeComponent } from './pages/edit-employee/edit-employee';

export const EMPLOYEES_ROUTE: Routes = [
  {
    path: URL_ROUTES.EMPLOYEE.ALL,
    component: EmployeeListComponent,
  },
  {
    path: URL_ROUTES.EMPLOYEE.ADD,
    component: AddEmployeeComponent,
  },
  {
    path: URL_ROUTES.EMPLOYEE.VIEW + '/:id',
    component: ViewEmployeeComponent,
  },
  {
    path: URL_ROUTES.EMPLOYEE.EDIT + '/:id',
    component: EditEmployeeComponent,
  }
];
