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



const routes: Routes = [
  {path: 'createAccount', component:CreateAccountComponent},
  {path: 'login', component:LoginComponent},
  {path: 'employee', component:EmployeeComponent},

  {path: '', component:HomepageComponent},
  {path: 'about', component:AboutComponent},

  {path: 'userProfile', component:UserProfileComponent},
  {path: 'userProfile/:username', component: UserProfileComponent},
  {path: 'home', component: HomepageComponent}

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
