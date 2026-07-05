import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';

import { URL_ROUTES } from '../../../../core/constants/url.constant';
import { DepartmentFormComponent } from '../../component/department-form/department-form';

@Component({
  selector: 'app-edit-department',
  imports: [
    CardModule,
    ToastModule,
    DepartmentFormComponent
  ],
  templateUrl: './edit-department.html',
  styles: ``,
})
export class EditDepartmentComponent {
  urlRoutes = URL_ROUTES;
}
