import { Routes } from '@angular/router';
import { SelfRegistrationPageComponent } from './self-registration-page/self-registration-page.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { FileNotFoundComponent } from './file-not-found/file-not-found.component';
import { UserComponent } from './user/user.component';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';

export const routes: Routes = [
    {path: 'home', component:HomeComponent},
    {path: 'signup', component: SelfRegistrationPageComponent},
    {path: 'login', component:LoginFormComponent},
    {path: 'admin/:id', component:AdminComponent},
    {path: 'user/:id', component:UserComponent},
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    { path: 'unauthorized', component: UnauthorizedComponent }, 
    {path: '**', component:FileNotFoundComponent}
];
