import { Component, OnInit } from '@angular/core';
import { AuthenticationService, Credentials } from '../TokenAuth/authentication.service';
import { TokenService } from '../TokenAuth/token.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public credentials: Credentials = new Credentials("", "");
  failedLoginAttempts = 0;
  isLoggedIn = false;
  loginFailure = false;


  constructor(private router: Router, private auth: AuthenticationService, private tokenService: TokenService) { }

  ngOnInit(): void {
  }

  hideError(): void {    
   const e = document.getElementById("errorInline");
   if(e != null) {
     e.style.display = 'none';
   }
  }

  login(): void {
    //(data) not token/string

    this.auth.login(this.credentials).subscribe({
      next: (data: {accessToken: string, user: any}) => {
        this.tokenService.saveToken(data.accessToken);
        this.tokenService.saveUser(JSON.parse(data.user));
        console.log(data);
        console.log(typeof(data.user));
        this.loginFailure = false;
        this.isLoggedIn = true;
        console.log("Saved: ", this.tokenService.getUser());
        this.router.navigate(['userHomeBase'])
      },
      error: async (err: { status: any; error: any; }) => {
        console.log(err.status);
        console.log(err);
        // alert(err.error)
        // this.errorMessage = err.error;
        this.loginFailure = true;
        this.failedLoginAttempts += 1;
        if (this.failedLoginAttempts > 5) {
          // alert("You have failed login too many times!");

          // // this.showLoginBtn = false;
          // this.errorMessage = "Timed out!!"
          // await new Promise(resolve => setTimeout(resolve, 60000)); // 60 sec
          // // this.failedAttempts = 0;
          // this.showLoginBtn = true;
          // this.reloadPage();
        }
      }
    })

  };



}


