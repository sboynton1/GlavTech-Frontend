import { Component, OnInit } from '@angular/core';
import { TokenService } from '../TokenAuth/token.service';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { FoodService } from '../Food/food.service';
import { NONE_TYPE } from '@angular/compiler';
import { userProfileService } from '../user-profile/user-profile.service';

@Component({
  selector: 'app-user-home-base',
  templateUrl: './user-home-base.component.html',
  styleUrls: ['./user-home-base.component.css']
})
export class UserHomeBaseComponent implements OnInit {

  public user: any;
  public foodFound: any;
  public control: FormControl = new FormControl('');


  constructor(private tokenService: TokenService, private router: Router, private foodService: FoodService, private userService: userProfileService) { 
    this.user = tokenService.getUser();
  }

  ngOnInit(): void {
    if(this.user == null) {
      this.router.navigate(['login']);
    }

  }

  public searchFood(description: string): void {
    this.foodService.getFood(description).subscribe(data => {
      this.foodFound = data;
    }, error => {
      this.foodFound = false;
      alert(error.error);
    })
    return;
  }

  public reset(): void{
    this.foodFound = undefined;
    return;
  }
}
