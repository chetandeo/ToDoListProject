import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddTodoComponent } from './add-todo/add-todo.component';
import { AuthGuard } from './auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { LoginGuard } from './login.guard';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProfileComponent } from './profile/profile.component';
import { UnsaveGuard } from './unsave.guard';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  {path: '', redirectTo: 'welcome', pathMatch: 'full'},
  {path: 'login', component: LoginComponent, canActivate:[LoginGuard]},
  {path: 'forgetpassword', component: ForgetPasswordComponent, canActivate:[LoginGuard]},  
  {path: 'welcome', component: WelcomeComponent, canActivate: [AuthGuard]},  //canActivate: [AuthGuard]
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard], children: [ //canActivate: [AuthGuard]
    {path: 'new', component: AddTodoComponent, canDeactivate:[UnsaveGuard]},
    {path: ':id/edit', component: AddTodoComponent, canDeactivate:[UnsaveGuard]}
  ]},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
