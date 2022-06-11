import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  //Insert functionality for user not exist
  searchUser(username:string) {
    if(username == ""){
      alert("Enter Valid Username!");
    } else {
      this.router.navigate(['/profile/' +username]);
      alert("Navigating to userpage");
    }
  }

}
