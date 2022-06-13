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
  public userRequest: string;
  public userGot: userProfile;

  constructor(private token: TokenService, private router: Router, private activeRoute: ActivatedRoute,
    private userService: userProfileService) {
    this.userRequest = "";
    this.loggedUser = token.getUser();
    this.loggedUsername = this.loggedUser.username;

    //Params are set in the url with /:
    this.activeRoute.params.subscribe(params => {
      this.userRequest = params['username'];
      //If the user is trying to visit the page of another user
      if (params['username'] && (this.userRequest != this.loggedUsername)) {
    
        userService.getUserProfile(params['username']).subscribe({
          next: data => {
            this.userGot = data;
            console.log(this.userGot);
          }, error: err => {
            alert("User Not Found!");
            router.navigate(['userProfile']);
          }
        });

      } else {
        this.userRequest = this.loggedUsername;
        this.userGot = this.loggedUser;
        router.navigate(['userProfile']);
      }
    })
  }

  ngOnInit(): void {
  }

  public async loadProfile(): Promise<any> {
    this.userService.getLoggedProfile().subscribe((data: userProfile) => {
      this.loggedUser = data
    });
  }

  public followUser(): void {
    alert("gothere");
    this.userService.followUser(this.userRequest).subscribe({
      next: response => alert("Followed " + this.userRequest),
      error: err => "Something went wrong!"
    });
    alert("finished");
  }

  public requestingSelf() {
    return this.loggedUsername == this.userRequest;
  }


}
