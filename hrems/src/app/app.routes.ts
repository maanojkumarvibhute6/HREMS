import { Routes } from '@angular/router';

import { URL_ROUTES } from './core/constants/url.constant';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout';
import { LayoutComponent } from './layouts/main-layout/layouts';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: URL_ROUTES.AUTH.LOGIN,
    pathMatch: 'full',
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./features/auth/auth.routes').then((m) => m.AUTH_ROUTES),
      },
    ],
  },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./features/dashboard/dashboard.routes').then((m) => m.DASHBOARD_ROUTES),
      },
      {
        path: '',
        loadChildren: () =>
          import('./features/employees/employee.routes').then((m) => m.EMPLOYEES_ROUTE),
      },
      {
        path: '',
        loadChildren: () =>
          import('./features/department/department.routes').then((m) => m.DEPARTMENT_ROUTE),
      },
      {
        path: '',
        loadChildren: () =>
          import('./features/designation/designation.routes').then((m) => m.DESIGNATION_ROUTE),
      },
    ],
  },

  {
    path: '**',
    redirectTo: URL_ROUTES.AUTH.LOGIN,
  },
];
