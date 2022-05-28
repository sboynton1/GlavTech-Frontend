import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Employee, EmployeeComponent } from './employee/employee.component';
import { EmployeeService } from './employee/employee.service';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
  public employees: Employee[];

  constructor(private employeeService: EmployeeService){}

  ngOnInit(): void {
      
  }

  
  
  
}
