import { Component, Input, OnInit } from '@angular/core';

import { Router, RouterModule } from '@angular/router';
import { TokenService } from '../TokenAuth/token.service';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userHeaderIconOptions: string[] = ["Home", "About", "Logout"]

  user: any;

  constructor(private router: Router, private tokenService: TokenService) { 
  }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event.constructor.name === "NavigationEnd") {
        this.user = this.tokenService.getUser();
      }
    })
  }

  updateOptions() {
    if (!this.tokenService.userInSession()) {
      this.userHeaderIconOptions[this.userHeaderIconOptions.length - 1] = "Login";
    } else {
      this.userHeaderIconOptions[this.userHeaderIconOptions.length - 1] = "Logout";

    }
  }


  handleSelect(option: string) {
    switch(option) {
      case "Home":
        this.toHome();
        break;
      case "About":
        this.toAbout();
        break;
      case "Logout":
      case"Login":
        console.log("sign in page");
        this.logout();
        break;
    }
  }

  toHome() {
    this.router.navigate(['home'])
  }

  toAbout() {
    this.router.navigate(['about'])
  }

  logout() {
    this.tokenService.signOut();
    this.router.navigate(["login"]);
  }

  //Insert functionality for user not exist
  searchUser(username: string) {
    if (username == "") {
      alert("Enter Valid Username!");
    } else {
      this.router.navigate(['/profile/' + username]);
      alert("Trying to navigate to " + username + "'s page!");
    }
  }

}
