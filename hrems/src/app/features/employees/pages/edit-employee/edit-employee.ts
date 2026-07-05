import { Component, inject } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { InputGroupModule } from 'primeng/inputgroup';

import { EmployeeFormComponent } from '../../components/employee-form/employee-form';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-employee',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CardModule,
    InputTextModule,
    ToastModule,
    ButtonModule,
    InputGroupModule,
    InputGroupAddonModule,
    EmployeeFormComponent,
  ],
  templateUrl: './edit-employee.html',
  styles: ``,
})
export class EditEmployeeComponent {
  private readonly activatedRoute = inject(ActivatedRoute);

  employeeId: string = this.activatedRoute.snapshot.params['id'];

}
