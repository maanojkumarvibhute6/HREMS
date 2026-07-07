import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { MenuItem, MessageService } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { MenuModule } from 'primeng/menu';
import { MultiSelectModule } from 'primeng/multiselect';
import { ProgressBarModule } from 'primeng/progressbar';
import { SelectModule } from 'primeng/select';
import { SliderModule } from 'primeng/slider';
import { Table, TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';

import { URL_ROUTES } from '../../../../core/constants/url.constant';
import { DesignationService } from '../../services/designation-service';

@Component({
  selector: 'app-designation-list',
  imports: [
    CommonModule,
    CardModule,
    ToastModule,
    ButtonModule,
    SelectModule,
    IconFieldModule,
    InputIconModule,
    MultiSelectModule,
    ProgressBarModule,
    SliderModule,
    TableModule,
    TagModule,
    InputTextModule,
    MenuModule,
    ConfirmDialogModule,
  ],
  templateUrl: './designation-list.html',
  styles: ``,
})
export class DesignationListComponent {
  private readonly messageService = inject(MessageService);
  private readonly designationService = inject(DesignationService);
  private readonly router = inject(Router);

  searchValue = signal('');
  designationsList: any[] = [];
  globalFilterFields = ['name'];
  items: MenuItem[] = [
    {
      label: 'Edit',
      icon: 'pi pi-user-edit',
    },
    {
      label: 'Delete',
      icon: 'pi pi-trash',
    },
  ];

  ngOnInit(): void {
    this.getAllDesignation();
  }

  getAllDesignation() {
    this.designationService.getAllDesignationsService().subscribe({
      next: (res: any) => {
        this.designationsList = res.data;
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: res.status.message,
          life: 5000,
        });
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: err?.error?.status.message,
          detail: err?.error?.errorMessage,
          life: 5000,
        });
      },
    });
  }

  onRefresh() {
    this.getAllDesignation();
  }

  clear(table: Table) {
    table.clear();
    this.searchValue.set('');
  }

  getSeverity(status: boolean) {
    switch (status) {
      case false:
        return 'danger';

      case true:
        return 'success';
    }
  }

  openMenu(actionType: string, designation: any) {
    if (actionType === 'Edit') {
      this.router.navigate([URL_ROUTES.DESIGNATION.EDIT + '/' + designation.employeeId]);
    } else {
    }
  }

  redirectTo() {
    this.router.navigate([URL_ROUTES.DESIGNATION.ADD]);
  }
}
