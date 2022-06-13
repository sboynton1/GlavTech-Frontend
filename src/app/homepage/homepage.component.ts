import { Component, OnInit } from '@angular/core';
import { TokenService } from '../TokenAuth/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

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
