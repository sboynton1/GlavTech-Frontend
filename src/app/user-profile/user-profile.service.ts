import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

export class userProfile {
    constructor(
        public firstName: string,
        public lastName: string,
        public address: string,
        public city: string,
        public zip: string,
        public state: string,
        public phone: string,
        public username: string,
        public password: string,
        public email: string
    ) { }
}

export class ThreadPost {
    constructor(
        public senderUsername: string,
        public postText: string,
        public postTitle: string,
        public imageUrl: string
    ) { }
}

export class RecipePost {
    constructor(
        public senderUsername: string,
        public postTitle: string,
        public postText: string,
        public imageUrl: string,
        public instructions: string[]
    ) {}
}

export class Post {
    constructor(
        //Super Class Post Attrs
        public postID: string,
        public userID: string,
        public username: string,
        public postText: string,
        public postTitle: string,
        public sentAtTime: Date,
        public postType: string,

        //Thread Attrs
        public imageUrl: string,

        //Recipe
    ) { }
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
    recipeData: RecipePost


    constructor(private httpClient: HttpClient) { }


    //User
    public getLoggedProfile() {
        return this.httpClient.get<userProfile>(environment.apiBaseUrl + "/profile").pipe(delay(500));
    }

    public getUserProfile(username: String) {
        console.log("Getting", username, "from", environment.apiBaseUrl + "/user/profile/" + username);
        return this.httpClient.get<userProfile>(environment.apiBaseUrl + "/user/profile/" + username).pipe(delay(500));
    }

    //Follower
    public getFollowStatus(sourceUser: string, targetUser: string) {
        this.data = {
            currentUsername: sourceUser,
            targetUsername: targetUser
        }
        return this.httpClient.post<boolean>(environment.apiBaseUrl + "/api/followhandler/isFollowing", this.data).pipe(delay(500));

    }
    public followUser(currentUsername1: string, targetUsername1: string) {
        this.data = {
            currentUsername: currentUsername1,
            targetUsername: targetUsername1
        }
        return this.httpClient.post(environment.apiBaseUrl + "/api/followhandler/followUser", this.data);
    }

    public unfollowUser(currentUsername1: string, targetUsername1: string) {
        this.data = {
            currentUsername: currentUsername1,
            targetUsername: targetUsername1
        }
        return this.httpClient.post(environment.apiBaseUrl + "/api/followhandler/unfollowUser", this.data);
    }

    public getFollowers(username: string) {
        return this.httpClient.get<userProfile[]>(environment.apiBaseUrl + "/api/followhandler/followers/" + username).pipe(delay(500));
    }

    public getFollowing(username: string) {
        return this.httpClient.get<userProfile[]>(environment.apiBaseUrl + "/api/followhandler/following/" + username).pipe(delay(500));
    }

    //Post
    public postThreadPost(userName: string, title: string, content: string, url: string) {
        this.threadData = {
            senderUsername: userName,
            postTitle: title,
            postText: content,
            imageUrl: url
        }
        //Defining response type as text since api returns string as body on OK
        // const headers = new HttpHeaders();
        // const requestOptions: Object = {
        //     headers: headers,
        //     responseType: 'text'
        // }
        return this.httpClient.post<Post>(environment.apiBaseUrl + "/api/post/thread", this.threadData);
    }

    public postRecipePost(userName: string, title: string, content: string, url: string, instructions1: string[]) {
        this.recipeData = {
            senderUsername: userName,
            postTitle: title,
            postText: content,
            imageUrl: url,
            instructions: instructions1
        }
        return this.httpClient.post<Post>(environment.apiBaseUrl + "/api/post/recipe", this.recipeData);
    }

    public getUsersPosts(username: string) {
        return this.httpClient.get<Post[]>(environment.apiBaseUrl + "/api/post/user/" + username).pipe(delay(500)).pipe(map((data: Post[]) => {
            return data.map((post) => {
                post.sentAtTime = new Date(post.sentAtTime);
                return post;
            }
            )
        })
        ).pipe(map((data:Post[]) => data.sort((a, b) => new Date(b.sentAtTime).getTime() - new Date(a.sentAtTime).getTime())));
    }

    public getFeed(username: string) {
        return this.httpClient.get<Post[]>(environment.apiBaseUrl + "/api/post/feed/" + username).pipe(delay(500)).pipe(map((data: Post[]) => {
            return data.map((post) => {
                post.sentAtTime = new Date(post.sentAtTime);
                return post;
            }
            )
        })
        ).pipe(map((data: Post[]) => data.sort((a, b) => new Date(b.sentAtTime).getTime() - new Date(a.sentAtTime).getTime())));
    }


}

