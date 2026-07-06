import { Component, inject } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { URL_ROUTES } from '../../../core/constants/url.constant';
import { SelectModule } from 'primeng/select';
import { CommonModule } from '@angular/common';
import { MenuModule } from 'primeng/menu';
import { TokenStorageService } from '../../../core/services/token-storage-service';
import { DataService } from '../../../shared/services/data-service';

@Component({
  selector: 'app-topbar',
  imports: [
    CommonModule, 
    SelectModule, 
    MenuModule
  ],
  templateUrl: './topbar.html',
  styles: ``,
})
export class TopbarComponent {
  private readonly tokenStorageService = inject(TokenStorageService);
  private readonly dataService = inject(DataService);

  items: MenuItem[] = [
    {
      label: 'Profile',
      icon: 'pi pi-user',
    },
    {
      label: 'Settings',
      icon: 'pi pi-cog',
    },
    {
      label: 'Logout',
      icon: 'pi pi-power-off',
      routerLink: URL_ROUTES.AUTH.LOGIN
    },
  ];
  sidebarHidden: boolean = false;

  toggleSidebar() {
    this.sidebarHidden = !this.sidebarHidden;
    if (this.sidebarHidden) {
      this.dataService.updateSidebar(true);
    } else {
      this.dataService.updateSidebar(false);      
    }
  }
  
  ngOnDestroy() {
    this.tokenStorageService.clear();
  }
}
