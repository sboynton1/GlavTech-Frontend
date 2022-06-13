import { Component, OnInit } from '@angular/core';

import { Router, RouterModule } from '@angular/router';
import { TokenService } from '../TokenAuth/token.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router, private tokenService: TokenService) { }

  ngOnInit(): void {
  }

  toHome() {
    this.router.navigate(['homepage'])
  }

  logout() {
    this.tokenService.signOut();
  }

  //Insert functionality for user not exist
  searchUser(username:string) {
    if(username == ""){
      alert("Enter Valid Username!");
    } else {
      this.router.navigate(['/profile/' +username]);
      alert("Trying to navigate to " + username + "'s page!");
    }
  }

}
