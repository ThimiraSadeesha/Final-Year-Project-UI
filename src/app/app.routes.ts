import {Routes} from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'plan-card-tracker',
        pathMatch: 'full'
    },
    {
        path: 'dashboard',
        loadComponent: () => import('./components/feature/index').then(com => com.AdminDashboardComponent),
    },
    {
        path: 'user',
        loadComponent: () => import('./components/feature/index').then(com => com.UserComponent),
    },
    {
        path: 'hospital',
        loadComponent: () => import('./components/feature/index').then(com => com.HospitalComponent),
    },
    {
        path: 'police',
        loadComponent: () => import('./components/feature/index').then(com => com.HospitalComponent),
    },
    {
        path: 'fire',
        loadComponent: () => import('./components/feature/index').then(com => com.HospitalComponent),
    },
    {
        path: 'vehicle',
        loadComponent: () => import('./components/feature/index').then(com => com.HospitalComponent),
    },
];
