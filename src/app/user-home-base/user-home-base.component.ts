import { Component, OnInit } from '@angular/core';
import { TokenService } from '../TokenAuth/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-home-base',
  templateUrl: './user-home-base.component.html',
  styleUrls: ['./user-home-base.component.css']
})
export class UserHomeBaseComponent implements OnInit {

  user: any;

  constructor(private tokenService: TokenService, private router: Router) { 
    this.user = tokenService.getUser();
  }

  ngOnInit(): void {
    if(this.user == null) {
      this.router.navigate(['login']);
    }
  }
}
