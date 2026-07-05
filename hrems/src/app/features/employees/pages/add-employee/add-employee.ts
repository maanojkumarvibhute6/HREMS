import { Component } from '@angular/core';

import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';

import { EmployeeFormComponent } from "../../components/employee-form/employee-form";
import { URL_ROUTES } from '../../../../core/constants/url.constant';

@Component({
  selector: 'app-add-employee',
  imports: [
    CardModule,
    ToastModule,
    EmployeeFormComponent
  ],
  templateUrl: './add-employee.html',
  styles: ``,
})
export class AddEmployeeComponent {
  urlRoutes = URL_ROUTES;
}
