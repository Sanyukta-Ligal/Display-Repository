import { Routes } from '@angular/router';
import { RoutePublic } from '../app/routes/index';


export const ROUTING: Routes = [
  { path: '', children: RoutePublic },
//   { path: '**', redirectTo: '/' },
];
