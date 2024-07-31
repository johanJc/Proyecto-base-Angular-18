import { Routes } from '@angular/router';
import { InsideComponent } from './core/inside.component';
import { authGuard } from './guard/auth.guard';
import { OutsideComponent } from './core/outside.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: '',
        component: OutsideComponent,
        children: [
            {
                path: 'login',
                loadComponent: () => import('./pages/auth/login/login.component').then(c => c.LoginComponent)
            },
            {
                path: 'recover-password',
                loadComponent: () => import('./pages/auth/login/login.component').then(c => c.LoginComponent)
            }
        ]
    },
    {
        path: '',
        component: InsideComponent,
        canActivate: [authGuard],
        children: [
            {
                path: 'dashboard',
                loadComponent: () => import('./pages/dashboard/dashboard.component').then(c => c.DashboardComponent)
            },
            {
                path: 'warehouses',
                loadComponent: () => import('./pages/warehouses/warehouses.component').then(c => c.WarehousesComponent)
            }
        ]
    },
    {
        path: '**',
        redirectTo: 'login'
    }
];
