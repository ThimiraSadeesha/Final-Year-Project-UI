import {Routes} from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'plan-card-tracker',
        pathMatch: 'full'
    },
    {
        path: 'plan-card-tracker',
        // loadComponent: () => import('./components/index').then(com => com.DashboardComponent),
    },
];
