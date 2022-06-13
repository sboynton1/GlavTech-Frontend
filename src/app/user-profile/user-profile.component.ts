import { Component, OnInit } from '@angular/core';
import { TokenService } from '../TokenAuth/token.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { userProfile, userProfileService } from './user-profile.service';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  public loggedUser: userProfile;
  public loggedUsername: string;
  public viewedUser: string;

  constructor(private token: TokenService, private router: Router, private activeRoute: ActivatedRoute,
    private userService: userProfileService) {
    this.viewedUser = "";
    this.loggedUser = new userProfile("","","","","","","","","","");
    this.loggedUser.username = token.getUser();
    this.loggedUsername = this.token.getUser().username;

    //Params are set in the url with /:
    this.activeRoute.params.subscribe(params => {
      //If the user is trying to visit the page of another user
      if(params['username']) {
        this.viewedUser = params['username'];
        userService.getUserProfile(params['username']).subscribe({next: data=>this.loggedUser=data, error: err=>"User Not Found!"});
      } else {
        //If the user is just trying to view their own page
        this.viewedUser=this.loggedUsername;
        this.userService.getLoggedProfile().subscribe({next: data=>this.loggedUser=data, error: err=>"Page not found!"});
      }
    })
  }

  ngOnInit(): void {
  }

  public async loadProfile(): Promise<any> {
    this.userService.getLoggedProfile().subscribe((data: userProfile) => {
      console.log(data);
      this.loggedUser = data
    });
  }

  public followUser(): void {
    alert("gothere");
    this.userService.followUser(this.viewedUser).subscribe({next: response => alert("Followed " + this.viewedUser),
      error: err => "Something went wrong!"});
    alert("finished");
  }
 

}
