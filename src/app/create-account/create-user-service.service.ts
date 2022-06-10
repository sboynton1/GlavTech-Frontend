import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
// import { throws } from 'assert';

export class NewUser{
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
    public email:string,
  ) {}
}

@Injectable({
  providedIn: 'root'
})
export class CreateUserService {

  constructor( private httpClient:HttpClient) { }

  public createUser(user: NewUser) {
    return this.httpClient.post(environment.apiBaseUrl+"/api/v1/registration", user, {responseType: 'text'});
  }
}