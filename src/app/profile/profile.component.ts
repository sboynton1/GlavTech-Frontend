import { Component, OnInit } from '@angular/core';
import { CreateUserService, NewUser } from '../create-account/create-user-service.service';
import { TokenService } from '../TokenAuth/token.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  private loggedUser: NewUser;
  private viewedUser: string;

  constructor(private token: TokenService) {
    this.viewedUser = "";
    this.loggedUser = new NewUser("","","","","","","","","","");
    this.loggedUser.username = token.getUser();
  }

  ngOnInit(): void {
  }

}
