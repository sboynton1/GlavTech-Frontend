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

@Injectable({
    providedIn: 'root'
})
export class userProfileService {
    
    constructor(private httpClient:HttpClient) {}

    public getLoggedProfile() {
        return this.httpClient.get<userProfile>(environment.apiBaseUrl+"/profile").pipe(delay(500));
    }

    public getUserProfile(username: String) {
        return this.httpClient.get<userProfile>(environment.apiBaseUrl+"/profile"+username).pipe(delay(500));
    }

    public followUser(username: String) {
        alert("got to service~");
        return this.httpClient.post(environment.apiBaseUrl+"/api/followhandler/followUser", username);
    }

    public unfollowUser(username: String) {
        return this.httpClient.post(environment.apiBaseUrl+"/api/followhandler/unfollowUser", username);
    }
}

