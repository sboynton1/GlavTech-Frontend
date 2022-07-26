//Angular Packages
import { NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

//Components
import { AppComponent } from './app.component';
import { EmployeeComponent } from './employee/employee.component';
import { EmployeeService } from './employee/employee.service';
import { CreateAccountComponent } from './create-account/create-account.component';
import { HeaderComponent } from './header/header.component';
import { AuthenticationService } from './TokenAuth/authentication.service';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { HomepageComponent } from './homepage/homepage.component';
import { AboutComponent } from './about/about.component';
import { ProfileComponent } from './about/profile/profile.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

//Style Packages
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import {MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { NgMatSearchBarModule } from 'ng-mat-search-bar';
import { UserHomeBaseComponent } from './user-home-base/user-home-base.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent,
    LoginComponent,
    CreateAccountComponent,
    HeaderComponent,
    HomepageComponent,
    AboutComponent,
    ProfileComponent,
    UserProfileComponent,
    UserHomeBaseComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    MatIconModule,
    MatButtonModule,
    MDBBootstrapModule.forRoot(),
    MatMenuModule,
    NgMatSearchBarModule,
  ],
  providers: [EmployeeService, AuthenticationService, ProfileComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
