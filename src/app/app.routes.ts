import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ParentComponent } from './parent/parent.component';
import { authGuard } from './guard/auth.guard';

export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'home',
        component: ParentComponent,
        canActivate: [authGuard]
    },
    {
        path: '**',
        redirectTo: 'login'
    }
];
