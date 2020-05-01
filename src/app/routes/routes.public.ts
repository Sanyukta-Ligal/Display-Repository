import { Routes } from '@angular/router';
import {
    RepositoriesComponent
} from '../components/repositories/repositories.component';

import {
    UserRepositoriesComponent
} from '../components/repositories/user-repositories/user-repositories.component';
export const RoutePublic: Routes = 
[
    { path: '',   redirectTo: '/repos', pathMatch: 'full' },
    { path: 'repos', component: RepositoriesComponent },
    { path: 'repositories/:name', component: UserRepositoriesComponent },
];


