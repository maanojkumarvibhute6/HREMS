import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';

import { URL_ROUTES } from '../../../../core/constants/url.constant';
import { DesignationFormComponent } from "../../component/designation-form/designation-form";

@Component({
  selector: 'app-edit-designation',
  imports: [
    CardModule,
    ToastModule,
    DesignationFormComponent
  ],
  templateUrl: './edit-designation.html',
  styles: ``,
})
export class EditDesignationComponent {
  urlRoutes = URL_ROUTES;
}
