import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { TokenService } from '../TokenAuth/token.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { userProfile, userProfileService, ThreadPost, Post, RecipePost } from './user-profile.service';
import { ReturnStatement } from '@angular/compiler';


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
  instructionCount = 1;

  threadPost: ThreadPost = new ThreadPost("", "", "", "");
  recipePost: RecipePost = new RecipePost("","","","",[])
  windowScrolled: boolean;
  myElement: Element;
  prefixes: string[] = ['First', 'Second', 'Third', 'Fourth','Fifth', 'Sixth', 'Seventh', 'Eigth', 'Ninth', 'Tenth',
    'Elleventh', 'Twelth', 'Thirteenth', 'Fourteenth', 'Fifthteenth', 'Sixteenth', 'Seventeenth', 'Eighteenth', 'Nineteenth', 'Twentieth'];


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
    if(this.threadPost.postTitle == "" ||
       this.threadPost.postText == "") {
        alert("Fields Empty!");
        return;
       }
      
    this.userService.postThreadPost(this.loggedUsername, this.threadPost.postTitle,
      this.threadPost.postText, this.threadPost.imageUrl).subscribe({
        next: data => {
          this.posts.unshift(data);
        }, error: err => {
          alert(err.error);
        }
      });
  }

  public submitRecipe(): void {
    if(this.recipePost.postText == "" ||
      this.recipePost.postTitle == "") {
        alert("Fields Empty!");
        return;
    }
    
    //Collecting Recipe Instructions
    for(let i = 0; i < this.instructionCount; i++) {
      var field = document.getElementById(this.prefixes[i]);
      if(field != null) {
        const input = field.textContent;
        if(i == 0 && input == null) {
          alert('Insert Instructions!');
          return;
        }
        if(input != null) {
          this.recipePost.instructions[i] = input;
        }
      } 
    }

    // if(this.recipePost.instructions[0] == "") {
    //   alert("Insert the first instruction!");
    //   return;
    // }

    this.userService.postRecipePost(this.loggedUsername, this.recipePost.postTitle, this.recipePost.postText,
      this.recipePost.imageUrl, this.recipePost.instructions).subscribe({
        next: data => {
          this.posts.unshift(data);
        }, error: err => {
          alert(err.error)
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
   if(r != null && r.style.display == 'block') {
     r.style.display = 'none';
   } else if (r != null) {
    r.style.display = 'block';
   }
  }

  insertInstruction(count: number): void {
    
    let insert: string = this.prefixes[count - 1] + " Instruction";

    var folder = document.getElementById("folder");
    if(folder != null) {
      var lab = document.createElement('label');
      lab.style.cssText = "font-size: 20px; padding-right: 2vh; padding-left: 3%; font-family: 'Ubuntu', sans-serif;";
      lab.textContent = "Instruction";
      folder.appendChild(lab);

      var text = document.createElement('input');
      text.style.cssText = "width: 76%; color: black; font-weight: 700; font-size: 14px; letter-spacing: 1px; background: white; padding: 10px 20px; border: none; border-radius: 20px; outline: none; box-sizing: border-box; border: 2px solid rgba(0, 0, 0, 0.02); text-align: center; margin-bottom: 27px;"
      text.placeholder = insert;
      text.id = this.prefixes[count-1];
      folder.appendChild(text);
    }
  }

  addInstruction(): void {
    this.instructionCount = this.instructionCount + 1;
    
    if(this.instructionCount < 21) {
      this.insertInstruction(this.instructionCount);
    } else {
      alert('Too many instructions!');
    }
  }



}
