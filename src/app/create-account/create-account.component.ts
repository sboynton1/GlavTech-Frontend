import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { iif } from 'rxjs';
import { CreateUserService, NewUser } from './create-user-service.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {

  user: NewUser = new NewUser("","","","","","","","","","");

  constructor(private httpClientService: CreateUserService, private router: Router) { }

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

    for(let i = 0; i < this.user.phone.length; i++) {
      let char = this.user.phone.charAt(i);
      let parsed = parseInt(char);
      if( isNaN(parsed) && !(char == "(") && !(char == ")") && !(char == "-")) {
        alert("Phone Number is Invalid!");
        return;
      }
    }

    var a = this.user.phone;
    a = a.replace(/\D/g,'');
    if(a.length != 10) {
      alert("Phone Number is invalid!");
      return;
    }
    this.user.phone = a;

    for(let i = 0; i < this.user.zip.length; i++) {
      let char = this.user.zip.charAt(i);
      let parsed = parseInt(char);
      if( isNaN(parsed) &&  !(char == "-")) {
        alert("Zip Number is Invalid!");
        return;
      }
    }

    var zip = this.user.zip;
    zip = zip.replace(/\D/g,'');
    if(zip.length != 5 && zip.length != 9) {
      alert("Zip code is invalid!");
      return;
    }
    this.user.zip = zip;




    
    
    this.httpClientService.createUser(this.user).subscribe({next: (data: any) => alert("Registration Successful!"), error: (err: { error: any; }) => alert(err.error)});
    this.router.navigate(['login']);
  }
}
