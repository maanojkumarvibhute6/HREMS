import { Routes } from '@angular/router';

import { URL_ROUTES } from './core/constants/ulrs.constant';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout';

export const routes: Routes = [
    {
        path: '',
        redirectTo: URL_ROUTES.AUTH.LOGIN,
        pathMatch: 'full'
    },
    {
        path: '',
        component: AuthLayoutComponent,
        children: [
            {
                path: '',
                loadChildren: () => import('./features/auth/auth.routes').then(m => m.AUTH_ROUTES)
            }
        ]
    }
];
