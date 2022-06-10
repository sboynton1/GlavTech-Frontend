import { Component, OnInit } from '@angular/core';
import { CreateUserService, NewUser } from './create-user-service.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {

  user: NewUser = new NewUser("","","","","","","","","","");

  constructor(private httpClientService: CreateUserService) { }

  ngOnInit(): void {
  }

  createUser(): void {
    this.httpClientService.createUser(this.user).subscribe({next: (data: any) => alert("Registration Successful!"), error: (err: { error: any; }) => alert(err.error)});
  }
}
