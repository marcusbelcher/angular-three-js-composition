import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: '/hsl' },
    { path: 'hsl', loadChildren: './hsl/hsl.module#HSLModule' },
];