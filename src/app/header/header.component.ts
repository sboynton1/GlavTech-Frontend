import { TokenService } from '../TokenAuth/token.service';
import { Component, OnInit } from '@angular/core';

import { Router, RouterModule } from '@angular/router';
import { TokenService } from '../TokenAuth/token.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  user: any;
  accessToken: any;

  constructor(private router: Router, private tokenService: TokenService) { }

  ngOnInit(): void {
    this.user = this.tokenService.getUser();
    this.accessToken = this.tokenService.getToken();
    console.log(this.user.username);
  }

  toHome() {
    this.router.navigate(['homepage'])
  }

  logout() {
    this.tokenService.signOut();
  }

  //Insert functionality for user not exist
  searchUser(username:string) {
    alert(username);
    if(username == ""){
      alert("Enter Valid Username!");
    } else {
      this.router.navigate(['userProfile/' +username]);
      alert("Trying to navigate to " + username + "'s page!");
    }
  }

}
