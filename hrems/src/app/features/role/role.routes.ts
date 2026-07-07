import { Routes } from '@angular/router';

import { URL_ROUTES } from '../../core/constants/url.constant';
import { RolesListComponent } from './pages/roles-list/roles-list';
import { AddRoleComponent } from './pages/add-role/add-role';
import { EditRoleComponent } from './pages/edit-role/edit-role';


export const ROLE_ROUTE: Routes = [
  {
    path: URL_ROUTES.ROLE.ALL,
    component: RolesListComponent,
  },
  {
    path: URL_ROUTES.ROLE.ADD,
    component: AddRoleComponent,
  },
  {
    path: URL_ROUTES.ROLE.EDIT + '/:id',
    component: EditRoleComponent,
  },
];
