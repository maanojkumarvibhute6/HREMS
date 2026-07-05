import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';

import { URL_ROUTES } from '../../../../core/constants/url.constant';
import { DesignationFormComponent } from "../../component/designation-form/designation-form";

@Component({
  selector: 'app-add-designation',
  imports: [
    CardModule,
    ToastModule,
    DesignationFormComponent
],
  templateUrl: './add-designation.html',
  styles: ``,
})
export class AddDesignationComponent {
    urlRoutes = URL_ROUTES;
}
