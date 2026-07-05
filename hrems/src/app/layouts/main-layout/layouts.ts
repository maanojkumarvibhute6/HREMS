import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopbarComponent } from './topbar/topbar';
import { SidebarComponent } from './sidebar/sidebar';
import { FooterComponent } from './footer/footer';

@Component({
  selector: 'app-layout',
  imports: [
    RouterOutlet,
    TopbarComponent,
    SidebarComponent,
    FooterComponent
  ],
  templateUrl: './layouts.html',
  styles: ``,
})
export class LayoutComponent {}
