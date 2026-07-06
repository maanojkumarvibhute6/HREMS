import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { TopbarComponent } from './topbar/topbar';
import { SidebarComponent } from './sidebar/sidebar';
import { FooterComponent } from './footer/footer';

import { DataService } from '../../shared/services/data-service';

@Component({
  selector: 'app-layout',
  imports: [
    CommonModule,
    RouterOutlet,
    TopbarComponent,
    SidebarComponent,
    FooterComponent
  ],
  templateUrl: './layouts.html',
  styles: ``,
})
export class LayoutComponent {
  private readonly dataService = inject(DataService);

  toggleSideMenu: boolean = false;


  ngOnInit() {
    this.togglingSidebar();
  }

  togglingSidebar() {
    this.dataService.currentSideBarStatus.subscribe((res) => {
      console.log(res);
      this.toggleSideMenu = res;
    });      
  }

}
