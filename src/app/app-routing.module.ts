import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateAccountComponent } from './create-account/create-account.component';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';

import { HomepageComponent } from './homepage/homepage.component';
import { AboutComponent } from './about/about.component';

import { ProfileComponent } from './about/profile/profile.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserHomeBaseComponent } from './user-home-base/user-home-base.component';



const routes: Routes = [
  {path: 'createAccount', component:CreateAccountComponent , data: {animation: 'CreateAccountPage'}},
  {path: 'login', component:LoginComponent, data: {animation: 'LoginPage'}},
  {path: 'employee', component:EmployeeComponent},

  {path: '', component:HomepageComponent},
  {path: 'about', component:AboutComponent},

  {path: 'userProfile', component:UserProfileComponent},
  {path: 'userProfile/:username', component: UserProfileComponent},
  {path: 'home', component: HomepageComponent},
  {path: 'userHomeBase', component: UserHomeBaseComponent}

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
