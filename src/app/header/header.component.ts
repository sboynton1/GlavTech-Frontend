import { Component, Input, OnInit } from '@angular/core';

import { Router, RouterModule } from '@angular/router';
import { TokenService } from '../TokenAuth/token.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';


enum Options {
  Home = 0,
  Profile = 1,
  About = 2,
  Logout = 3,
  Login = 3
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']

})
export class HeaderComponent implements OnInit {
  control: FormControl = new FormControl('');
  user: any;
  accessToken: any;



  userHeaderIconOptions: string[] = ["Home", "Profile", "About", "Logout"]

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
      this.userHeaderIconOptions[Options.Login] = "Login";
      this.userHeaderIconOptions[Options.Profile] = "";
    } else {
      this.userHeaderIconOptions[Options.Logout] = "Logout";
      this.userHeaderIconOptions[Options.Profile] = "Profile";
    }
  }


  handleSelect(option: string) {
    switch (option) {
      case "Home":
        this.toHome();
        break;
      case "About":
        this.toAbout();
        break;
      case "Profile":
        this.toProfile();
        break;
      case "Logout":
      case "Login":
        console.log("sign in page");
        this.logout();
        break;
    }
  }

  toHome() {
    if (this.tokenService.userInSession()) {
      this.router.navigate(['userHomeBase'])
    } else {
      this.router.navigate(['home']);
    }

  }


  toAbout() {
    this.router.navigate(['about'])
  }

  logout() {
    this.tokenService.signOut();
    this.router.navigate(["login"]);
  }

  toProfile() {
    this.router.navigate(['/userProfile/' + this.user.username])
  }

  //Insert functionality for user not exist
  searchUser(username: string) {

    if (username == "") {
      return;
    } else {
      this.router.navigate(['/userProfile/' + username]);
      alert("Trying to navigate to " + username + "'s page!");
    }
  }

}
