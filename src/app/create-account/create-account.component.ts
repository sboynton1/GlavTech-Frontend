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
    this.user.zip = this.user.zip.replace("-","");

    if(this.user.firstName == ""){
      alert("First name can't be empty!")
      return;
    }
    
    if(this.user.lastName == ""){
      alert("Last name can't be empty!")
      return;
    }

    if(this.user.address == ""){
      alert("Address can't be empty!")
      return;
    } 

    if(this.user.city == ""){
      alert("City can't be empty!")
      return;
    }

    if(this.user.state == ""){
      alert("State can't be empty!")
      return;
    }

    if(this.user.phone == ""){
      alert("Phone can't be empty!")
      return;
    }

    if(this.user.username == ""){
      alert("Username can't be empty!")
      return;
    }

    if(this.user.password == ""){
      alert("Password can't be empty!")
      return;
    }

    if(this.user.email == "") {
      alert("Email can't be empty!")
      return;
    }



    
    
    this.httpClientService.createUser(this.user).subscribe({next: (data: any) => alert("Registration Successful!"), error: (err: { error: any; }) => alert(err.error)});
  }
}
