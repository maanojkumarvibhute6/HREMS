import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';

import { URL_ROUTES } from '../../../../core/constants/url.constant';
import { DepartmentFormComponent } from '../../component/department-form/department-form';

@Component
({
  selector: 'app-add-department',
  imports: [
    CardModule,
    ToastModule,
    DepartmentFormComponent
  ],
  templateUrl: './add-department.html',
  styles: ``,
})
export class AddDepartmentComponent {
    urlRoutes = URL_ROUTES;
}
