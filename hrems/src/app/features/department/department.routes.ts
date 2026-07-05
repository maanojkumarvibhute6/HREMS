import { Routes } from '@angular/router';

import { URL_ROUTES } from '../../core/constants/url.constant';
import { DepartmentListComponent } from './pages/department-list/department-list';
import { AddDepartmentComponent } from './pages/add-department/add-department';
import { EditDepartmentComponent } from './pages/edit-department/edit-department';

export const DEPARTMENT_ROUTE: Routes = [
  {
    path: URL_ROUTES.DEPARTMENT.ALL,
    component: DepartmentListComponent,
  },
  {
    path: URL_ROUTES.DEPARTMENT.ADD,
    component: AddDepartmentComponent,
  },
  {
    path: URL_ROUTES.DEPARTMENT.EDIT + '/:id',
    component: EditDepartmentComponent
  },
];
