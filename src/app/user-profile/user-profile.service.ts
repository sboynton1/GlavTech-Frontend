import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

export class userProfile {
    constructor(
     public firstName:string,
     public lastName:string,
     public address:string,
     public city:string,
     public zip:string,
     public state:string,
     public phone:string,
     public username:string,
     public password:string,
     public email:string
    ) {}
}

export class ThreadPost {
    constructor(
        public senderUsername:string,
        public postText:string,
        public postTitle:string,
        public imageUrl:string 
    ) {}
  }

export class Post{
    constructor(
        //Super Class Post Attrs
        public postID: string,
        public userID: string,
        public postText: string,
        public postTitle: string,
        public sentAtTime: string,
        public postType: string,

        //Thread Attrs
        public imageUrl: string,
        
    ) {}
}
  
export interface followRequest {
    currentUsername: string;
    targetUsername: string;
}

@Injectable({
    providedIn: 'root'
})
export class userProfileService {

    data: followRequest;
    threadData: ThreadPost

    
    constructor(private httpClient:HttpClient) {}

    public getFollowStatus(sourceUser: string, targetUser: string) {
        this.data = {
            currentUsername: sourceUser,
            targetUsername: targetUser
        }
        return this.httpClient.post<boolean>(environment.apiBaseUrl+"/api/followhandler/isFollowing", this.data).pipe(delay(500));
    
    }

    public getLoggedProfile() {
        return this.httpClient.get<userProfile>(environment.apiBaseUrl+"/profile").pipe(delay(500));
    }

    public getUserProfile(username: String) {
        console.log("Getting", username, "from", environment.apiBaseUrl + "/user/profile/" + username);
        return this.httpClient.get<userProfile>(environment.apiBaseUrl+"/user/profile/"+username).pipe(delay(500));
    }

    public followUser(currentUsername1: string, targetUsername1: string) {
        this.data = {
            currentUsername: currentUsername1,
            targetUsername: targetUsername1
        }
        return this.httpClient.post(environment.apiBaseUrl+"/api/followhandler/followUser", this.data);
    }

    public unfollowUser(currentUsername1: string, targetUsername1: string) {
        this.data = {
            currentUsername: currentUsername1,
            targetUsername: targetUsername1
        }
        return this.httpClient.post(environment.apiBaseUrl+"/api/followhandler/unfollowUser", this.data);
    }

    public postThreadPost(userName:string, title:string, content:string, url:string) {
        this.threadData = {
            senderUsername: userName,
            postTitle: title,
            postText: content,
            imageUrl: url
        }
        return this.httpClient.post<ThreadPost>(environment.apiBaseUrl+"/api/post/thread",this.threadData);
    }

    public getUsersPosts(username: string) {
        return this.httpClient.get<Post[]>(environment.apiBaseUrl+"/api/post/user/" + username).pipe(delay(500));
    }


}

