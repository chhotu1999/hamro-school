import { Routes } from '@angular/router';
import { Shell } from './layout/shell/shell';
import { Dashboard } from './features/dashboard/dashboard';
import { Students } from './features/students/students';

export const routes: Routes = [
  {
    path: '',
    component: Shell,
    children: [
      { path: '', component: Dashboard },
      { path: 'students', component: Students },
    ],
  },
];
