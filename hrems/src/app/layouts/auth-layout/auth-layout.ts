import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-auth-layout',
  imports: [
    RouterOutlet,
    ToastModule,
    CardModule
  ],
  templateUrl: './auth-layout.html',
  styles: ``,
})
export class AuthLayoutComponent {}
