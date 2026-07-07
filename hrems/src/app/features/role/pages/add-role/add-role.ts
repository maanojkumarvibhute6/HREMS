import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { RolesFormComponent } from '../../components/roles-form/roles-form';

@Component({
  selector: 'app-add-role',
  imports: [
    CardModule,
    ToastModule,
    RolesFormComponent
  ],
  templateUrl: './add-role.html',
  styles: ``,
})
export class AddRoleComponent {}
