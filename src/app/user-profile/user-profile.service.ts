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

export interface followRequest {
    currentUsername: string;
    admiredUsername: string;
}

@Injectable({
    providedIn: 'root'
})
export class userProfileService {

    data: followRequest;

    
    constructor(private httpClient:HttpClient) {}

    public getLoggedProfile() {
        return this.httpClient.get<userProfile>(environment.apiBaseUrl+"/profile").pipe(delay(500));
    }

    // public getFollowStatus(currentUsername1: string, username: string) {
    //     this.data1 = {
    //         currentUsername: currentUsername1,
    //         admiredUsername: username
    //     }
    //     return this.httpClient.get<boolean>(environment.apiBaseUrl+"/api/followhandler/isFollowed");
    // }

    public getUserProfile(username: String) {
        console.log("Getting", username, "from", environment.apiBaseUrl + "/user/profile/" + username);
        return this.httpClient.get<userProfile>(environment.apiBaseUrl+"/user/profile/"+username).pipe(delay(500));
    }

    public followUser(currentUsername1: string, username: string) {
        this.data = {
            currentUsername: currentUsername1,
            admiredUsername: username
        }
        return this.httpClient.post(environment.apiBaseUrl+"/api/followhandler/followUser", this.data);
    }

    public unfollowUser(currentUsername1: string, username: string) {
        this.data = {
            currentUsername: currentUsername1,
            admiredUsername: username
        }
        return this.httpClient.post(environment.apiBaseUrl+"/api/followhandler/unfollowUser", this.data);
    }


}

