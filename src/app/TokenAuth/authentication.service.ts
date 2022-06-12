import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BYPASS_UNAUTH } from 'src/app/Interceptors/unauth.interceptor';
import { environment } from 'src/environments/environment';

export class Credentials {
  constructor(
  public username: string,
  public password: string,
  ) {}
}

@Injectable({
  providedIn: 'root'
})


export class AuthenticationService {
  login(credentials: Credentials): Observable<any> {
    return this.http.post(environment.apiBaseUrl + `/auth/login`, credentials);
  }

  USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'

  constructor(private http: HttpClient) {

  }
}