import { Component, OnInit } from '@angular/core';
import { EmployeeService } from './employee.service';
import { TokenService } from '../TokenAuth/token.service';
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
  user: any;
  accessToken: any;

  constructor(private employeeService: EmployeeService, private tokenService: TokenService) { 
      
  }

  ngOnInit(): void {
      this.getEmployees();
      this.user = this.tokenService.getUser();
      this.accessToken = this.tokenService.getToken();
      console.log(this.user.username);
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