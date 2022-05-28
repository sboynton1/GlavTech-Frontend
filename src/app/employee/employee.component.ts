import { Component, OnInit } from '@angular/core';
import { EmployeeService } from './employee.service';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';

export interface Employee{
    id: number;
    name: string;
    email: string;
    jobTitle: string;
    phone: string;
    imageUrl: string;
    employeeCode: string;
}
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  employees: Employee [];

  constructor(private employeeService: EmployeeService) { 
      
  }

  ngOnInit(): void {
      this.getEmployees();
  }

  public getEmployees(): void {
    this.employeeService.getEmployees().subscribe(
      (response: Employee[]) => {
        this.employees = response;
        console.log(this.employees);
      }, 
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

}