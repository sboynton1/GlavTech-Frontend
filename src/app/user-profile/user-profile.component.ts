import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { TokenService } from '../TokenAuth/token.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { userProfile, userProfileService, ThreadPost, Post } from './user-profile.service';
import { DOCUMENT } from '@angular/common';


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
  public followed: boolean;
  public posts: Post[];
  public followers: any[];
  public following: any[];

  threadPost: ThreadPost = new ThreadPost("", "", "", "");
  windowScrolled: boolean;
  myElement: Element;


  constructor(private token: TokenService, private router: Router, private activeRoute: ActivatedRoute,
    private userService: userProfileService) {
    this.userRequest = "";
    this.loggedUser = token.getUser();
    this.loggedUsername = this.loggedUser.username;


    //Params are set in the url with /:
    this.activeRoute.params.subscribe(params => {
      this.userRequest = params['username'];
      console.log(this.userGot);

      //If the user is trying to visit the page of another user
      if (params['username'] && (this.userRequest != this.loggedUsername)) {
        this.followed = this.isFollowing();
        userService.getUserProfile(params['username']).subscribe({
          next: data => {
            this.userGot = data;
            this.loadInfo(this.userGot.username);

          }, error: err => {
            alert("User Not Found!");
            router.navigate(['userProfile']);
          }
        });

      } else {
        console.log(this.followed);
        this.userRequest = this.loggedUsername;
        router.navigate(['userProfile']);
        this.loadInfo(this.loggedUsername);

      }
    })
  }

  ngOnInit() {

  }

  onScroll(event: Event) {
    this.myElement = event.target as Element;
    if (this.myElement.scrollTop > 0) {
      this.windowScrolled = true;
    } else {
      this.windowScrolled = false;
    }
  }

  scrollToTop(){
    this.myElement.scrollTop = 0;
  }

  public async loadProfile(): Promise<any> {
    this.userService.getLoggedProfile().subscribe((data: userProfile) => {
      this.loggedUser = data
    });
  }

  public followUser(): void {
    this.userService.followUser(this.loggedUsername, this.userRequest).subscribe({
      next: response => {
        this.followed = true;
        this.followers.push(this.loggedUser);
        alert("Followed " + this.userRequest)
      }, error: err => "Something went wrong!"
    });
  }

  public unfollowUser(): void {
    this.userService.unfollowUser(this.loggedUsername, this.userRequest).subscribe({
      next: response => {
        this.followed = false;
        alert("Unfollowed " + this.userRequest);
        this.followers.pop();
      },
      error: err => "Something went wrong!"
    });
  }

  public requestingSelf() {
    return this.loggedUsername == this.userRequest;
  }

  public isFollowing(): boolean {
    this.userService.getFollowStatus(this.loggedUsername, this.userRequest).subscribe({
      next: response => {
        this.followed = response;
      }, error: err => "Something went wrong!"
    });
    return this.followed;
  }

  public postThreadPost(): void {
    this.userService.postThreadPost(this.loggedUsername, this.threadPost.postTitle,
      this.threadPost.postText, this.threadPost.imageUrl).subscribe({
        next: data => {
          this.posts.push(data);
        }, error: err => {
          alert(err.error);
        }
      });

  }

  public loadInfo(username: string) {
    this.getPosts(username);
    this.getFollowersAndFollowing(username);
  }

  public getPosts(username: string) {
    this.userService.getUsersPosts(username).subscribe((data: Post[]) => { this.posts = data; },);
  }

  public getFollowersAndFollowing(username: string) {
    this.userService.getFollowers(username).subscribe({
      next: (data: any) => {
        this.followers = data;
      }, error: err => {
        alert("Error getting follower list");
      }
    });
    this.userService.getFollowing(username).subscribe({
      next: (data: any) => {
        this.following = data;
      }, error: err => {
        alert("Error getting following list");
      }
    });
  }

  openRecipe() : void {
   const r = document.getElementById("recipeContainer");
   if(r != null && r.style.display == "none") {
     r.style.display = 'block';
   } else if (r != null) {
    r.style.display = "none";
   }
  }


}
