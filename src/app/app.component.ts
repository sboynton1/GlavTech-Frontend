import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, HostBinding } from '@angular/core';
import { Employee, EmployeeComponent } from './employee/employee.component';
import { EmployeeService } from './employee/employee.service';
import { Observable } from 'rxjs';
import { ChildrenOutletContexts, Router } from '@angular/router';
import { TokenService } from './TokenAuth/token.service';
import { slideInAnimation } from './animations';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations'




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    slideInAnimation
  ]
})
export class AppComponent implements OnInit{
  
  public employees: Employee[];

  constructor(private tokenService: TokenService, private router: Router, private contexts: ChildrenOutletContexts){}

  ngOnInit(): void {
  }


  //https://angular.io/guide/route-animations
  getRouteAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
  }

  
  
  
  
}
