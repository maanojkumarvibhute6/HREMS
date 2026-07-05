import { Routes } from '@angular/router';

import { URL_ROUTES } from '../../core/constants/url.constant';
import { DesignationListComponent } from './pages/designation-list/designation-list';
import { AddDesignationComponent } from './pages/add-designation/add-designation';
import { EditDesignationComponent } from './pages/edit-designation/edit-designation';

export const DESIGNATION_ROUTE: Routes = [
  {
    path: URL_ROUTES.DESIGNATION.ALL,
    component: DesignationListComponent,
  },
  {
    path: URL_ROUTES.DESIGNATION.ADD,
    component: AddDesignationComponent,
  },
  {
    path: URL_ROUTES.DESIGNATION.EDIT + '/:id',
    component: EditDesignationComponent,
  },
];
